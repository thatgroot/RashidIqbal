import { Metadata } from "next";
import { AssetsContent } from "@/components/assets-content";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Brand Guidelines & Assets - Rashid Iqbal",
  description: "Official brand assets for Rashid Iqbal. Logos, color palettes, and social media preview guidelines for consistent brand representation.",
  alternates: {
    canonical: `${SITE_URL}/assets`,
  },
};

export default function AssetsPage() {
  return <AssetsContent />;
}
