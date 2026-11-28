import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${config.author} — Full-Stack Python dasturchi`,
    short_name: config.author,
    description: config.description.short,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "uz",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
