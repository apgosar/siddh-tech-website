export const BRANDS = ["corporate", "neev", "swasthyaconnect"] as const;
export type Brand = (typeof BRANDS)[number];
