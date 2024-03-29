// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"
import { colors } from "./src/TailwindColors"

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
    baseURL: "https://example.com", // Change this to your production URL.
    description:
        "Astro PWA Starter is an opionated Astro starter for building robust static websites.", // Change this to be your website's description.
    type: "website"
}

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
    name: "SaarClimb", // Change this to your website's name.
    short_name: "SaarClimb", // Change this to your website's short name.
    description:
        "Die App für Boulderer und Kletterer aus dem Saarland und Umgebung.", // Change this to your websites description.
    theme_color: "#0F0F10",
    background_color: "#ffffff", // Change this to your background color.
    display: "standalone",
    start_url: "/dashboard",
    icons: [
        {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png"
        },
        {
            src: "favicon-16x16.png",
            sizes: "32x32",
            type: "image/png"
        },
        {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
        }
    ]
}