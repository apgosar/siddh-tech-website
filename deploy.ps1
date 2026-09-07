<#
.SYNOPSIS
  Builds and deploys the Siddh Tech Solutions monorepo to Cloud Run.

.DESCRIPTION
  Every gcloud call below passes -project explicitly, so this script behaves
  the same no matter what `gcloud config` currently points at on this
  machine — it will never silently build into the wrong project again (see
  the neev-cms incident this was written after).

  Deploys neev and swasthyaconnect first, then corporate — corporate's build
  needs their live URLs baked in as Docker build args (NEEV_ORIGIN /
  SWASTHYACONNECT_ORIGIN), since Next.js resolves next.config.mjs's
  rewrites() destinations once at build time, not at container start.

.PARAMETER App
  Which app(s) to build and deploy. Default: all three, in the required
  order.

.PARAMETER SkipSetup
  Skip the idempotent one-time infra check (APIs, Artifact Registry repo,
  secret IAM binding). Safe to skip once you know it's already in place —
  saves a few seconds per run.

.EXAMPLE
  ./deploy.ps1
  Builds and deploys everything.

.EXAMPLE
  ./deploy.ps1 -App swasthyaconnect
  Rebuilds and redeploys just swasthyaconnect after a content change.

.EXAMPLE
  ./deploy.ps1 -App corporate
  Rebuilds and redeploys corporate, picking up neev/swasthyaconnect's
  current live URLs. Requires both to already be deployed.
#>
param(
    [ValidateSet("all", "corporate", "neev", "swasthyaconnect")]
    [string]$App = "all",

    [string]$Project = "siddh-tech-website",

    [switch]$SkipSetup
)

# Deliberately NOT "Stop": gcloud on Windows is a .ps1 wrapper, and any
# line it writes to stderr — even on a successful call — gets escalated by
# PowerShell into a terminating exception under "Stop", before Invoke-Gcloud
# below ever gets to check $LASTEXITCODE. Every gcloud call is checked
# explicitly instead; see Invoke-Gcloud.
$ErrorActionPreference = "Continue"

$Registry = "asia-south1-docker.pkg.dev/$Project/siddh-web"
$ArtifactRepo = "siddh-web"
$ArtifactRepoLocation = "asia-south1"

# neev and swasthyaconnect are never hit directly by a browser — only
# server-to-server, via corporate's proxy — so they stay in Mumbai.
$ProductRegion = "asia-south1"

# asia-south1 does not support Cloud Run domain mappings (confirmed via
# GCP docs); asia-southeast1 (Singapore) is the closest region that does,
# and it's the only reason corporate deploys somewhere different.
$CorporateRegion = "asia-southeast1"

$GmailUser = "buildsight.ai@gmail.com"
$ContactNotifyTo = "ankur.gosar@gmail.com"
$GmailSecret = "gmail-app-password"

function Invoke-Gcloud {
    param([string[]]$Arguments)
    Write-Host ">> gcloud $($Arguments -join ' ')" -ForegroundColor DarkGray
    # Piped to Out-Host deliberately: an unconsumed native command's stdout
    # becomes part of THIS function's own return value in PowerShell, which
    # silently corrupts whatever the caller does with Invoke-Gcloud's result
    # (e.g. Build-Image's return value getting the build log appended to it).
    # Out-Host still prints it live; it just stops it flowing back out.
    & gcloud @Arguments | Out-Host
    if ($LASTEXITCODE -ne 0) {
        throw "gcloud command failed (exit $LASTEXITCODE): gcloud $($Arguments -join ' ')"
    }
}

function Get-ServiceUrl {
    param([string]$Service, [string]$Region)
    $url = & gcloud run services describe $Service `
        --project=$Project --region=$Region `
        --format="value(status.url)" 2>$null
    if ([string]::IsNullOrWhiteSpace($url)) {
        throw "Could not find service '$Service' in region '$Region' under project '$Project'. Deploy it first (./deploy.ps1 -App $Service)."
    }
    return $url.Trim()
}

function Build-Image {
    param(
        [string]$AppName,
        [hashtable]$ExtraSubstitutions = @{}
    )
    $image = "$Registry/$AppName"
    $subs = [ordered]@{ _APP = $AppName; _IMAGE = $image }
    foreach ($key in $ExtraSubstitutions.Keys) { $subs[$key] = $ExtraSubstitutions[$key] }
    $subsString = ($subs.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join ","

    Write-Host "`n=== Building $AppName ===" -ForegroundColor Cyan
    Invoke-Gcloud @(
        "builds", "submit",
        "--project=$Project",
        "--config", "cloudbuild.yaml",
        "--substitutions=$subsString",
        "."
    )
    return $image
}

function Deploy-Service {
    param(
        [string]$ServiceName,
        [string]$Image,
        [string]$Region,
        [string[]]$ExtraArgs = @()
    )
    Write-Host "=== Deploying $ServiceName to $Region ===" -ForegroundColor Cyan
    Invoke-Gcloud (@(
        "run", "deploy", $ServiceName,
        "--project=$Project",
        "--image", $Image,
        "--region=$Region",
        "--allow-unauthenticated"
    ) + $ExtraArgs)
}

# Every product gets its own contact form (see apps/*/lib/mail.ts) — all of
# them send through the same Gmail relay, distinguished only by display name.
function Get-MailArgs {
    return @(
        "--set-env-vars", "GMAIL_USER=$GmailUser,CONTACT_NOTIFY_TO=$ContactNotifyTo",
        "--set-secrets", "GMAIL_APP_PASSWORD=$GmailSecret`:latest"
    )
}

function Deploy-Neev {
    $image = Build-Image -AppName "neev"
    Deploy-Service -ServiceName "siddh-neev" -Image $image -Region $ProductRegion -ExtraArgs (Get-MailArgs)
}

function Deploy-SwasthyaConnect {
    $image = Build-Image -AppName "swasthyaconnect"
    Deploy-Service -ServiceName "siddh-swasthyaconnect" -Image $image -Region $ProductRegion -ExtraArgs (Get-MailArgs)
}

function Deploy-Corporate {
    Write-Host "`nLooking up neev and swasthyaconnect URLs to wire into corporate's proxy..." -ForegroundColor DarkGray
    $neevUrl = Get-ServiceUrl -Service "siddh-neev" -Region $ProductRegion
    $swasthyaUrl = Get-ServiceUrl -Service "siddh-swasthyaconnect" -Region $ProductRegion
    Write-Host "  NEEV_ORIGIN=$neevUrl"
    Write-Host "  SWASTHYACONNECT_ORIGIN=$swasthyaUrl"

    $image = Build-Image -AppName "corporate" -ExtraSubstitutions @{
        _NEEV_ORIGIN            = $neevUrl
        _SWASTHYACONNECT_ORIGIN = $swasthyaUrl
    }
    Deploy-Service -ServiceName "siddh-corporate" -Image $image -Region $CorporateRegion -ExtraArgs (Get-MailArgs)
}

# Idempotent — safe to run on every invocation. Never creates or touches the
# Gmail app password's value; it only checks the secret exists and wires up
# IAM access to it. See DEPLOY.md for how to create the secret itself.
function Initialize-Infra {
    Write-Host "=== Checking infra (APIs, Artifact Registry, secret access) ===" -ForegroundColor Cyan

    Invoke-Gcloud @(
        "services", "enable",
        "run.googleapis.com", "artifactregistry.googleapis.com",
        "cloudbuild.googleapis.com", "secretmanager.googleapis.com",
        "--project=$Project"
    )

    $repoExists = & gcloud artifacts repositories describe $ArtifactRepo `
        --project=$Project --location=$ArtifactRepoLocation `
        --format="value(name)" 2>$null
    if ([string]::IsNullOrWhiteSpace($repoExists)) {
        Invoke-Gcloud @(
            "artifacts", "repositories", "create", $ArtifactRepo,
            "--project=$Project",
            "--repository-format=docker",
            "--location=$ArtifactRepoLocation"
        )
    }

    $secretExists = & gcloud secrets describe $GmailSecret --project=$Project --format="value(name)" 2>$null
    if ([string]::IsNullOrWhiteSpace($secretExists)) {
        throw "Secret '$GmailSecret' doesn't exist in project '$Project' yet. Create it first (see DEPLOY.md):`n  printf '<app-password>' | gcloud secrets create $GmailSecret --project=$Project --data-file=-"
    }

    $projectNumber = (& gcloud projects describe $Project --format="value(projectNumber)").Trim()
    $computeSa = "$projectNumber-compute@developer.gserviceaccount.com"
    Invoke-Gcloud @(
        "secrets", "add-iam-policy-binding", $GmailSecret,
        "--project=$Project",
        "--member=serviceAccount:$computeSa",
        "--role=roles/secretmanager.secretAccessor"
    ) | Out-Null
}

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

if (-not $SkipSetup) {
    Initialize-Infra
}

switch ($App) {
    "neev" { Deploy-Neev }
    "swasthyaconnect" { Deploy-SwasthyaConnect }
    "corporate" { Deploy-Corporate }
    "all" {
        # neev and swasthyaconnect first — corporate's build needs their URLs.
        Deploy-Neev
        Deploy-SwasthyaConnect
        Deploy-Corporate
    }
}

$stopwatch.Stop()
Write-Host "`nDone in $([int]$stopwatch.Elapsed.TotalSeconds)s." -ForegroundColor Green
