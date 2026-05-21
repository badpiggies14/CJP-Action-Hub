import type { MetadataRoute } from "next";

const routes = ["", "/follow", "/manifesto", "/creator-kit", "/tools", "/press"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://cjp-action-hub.example${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
