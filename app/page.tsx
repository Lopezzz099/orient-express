import type { Metadata } from "next";
import { AreasList } from "@/components/home/areas-list";
import { ContactDirectory } from "@/components/home/contact-directory";
import { Hero } from "@/components/home/hero";
import { NewsFeature } from "@/components/home/news-feature";
import { OperatingFigures } from "@/components/home/operating-figures";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.tagline,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AreasList />
      <OperatingFigures />
      <NewsFeature />
      <ContactDirectory />
    </>
  );
}
