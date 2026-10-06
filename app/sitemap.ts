import type { MetadataRoute } from "next";
import { news } from "@/lib/news";
import { primaryNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...primaryNav.map((item) => item.href), "/contacto"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...news.map((item) => ({ url: `${site.url}/prensa/${item.slug}`, lastModified: item.date })),
  ];
}
