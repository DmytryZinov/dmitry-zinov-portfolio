import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const routes = [
  "/",
  "/cases/rutube",
  "/cases/transmatika",
  "/cases/liveart",
  "/cases/rutube/case",
  "/cases/transmatika/case",
  "/cases/liveart/case",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "monthly",
    priority: path === "/" ? 1 : path.endsWith("/case") ? 0.7 : 0.8,
  }));
}
