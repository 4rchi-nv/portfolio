import type { MetadataRoute } from "next";
import { personName } from "@/data/portfolio-meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personName} — Portfolio`,
    short_name: personName,
    description: "React / Next.js engineer portfolio",
    start_url: "/en",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/brand-logo-light.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
