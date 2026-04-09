import { SOCIAL_LINKS } from "./constants";

export interface CTATrigger {
  sectionId: string;
  message: string;
  cta: string;
  href: string;
}

export const CTA_TRIGGERS: CTATrigger[] = [
  {
    sectionId: "services",
    message: "Need a Framer site that converts?",
    cta: "Book a Call",
    href: SOCIAL_LINKS.calcom,
  },
  {
    sectionId: "pricing",
    message: "Got questions about pricing?",
    cta: "Let's Talk",
    href: SOCIAL_LINKS.whatsapp,
  },
  {
    sectionId: "testimonials",
    message: "Want results like these?",
    cta: "Start Your Project",
    href: SOCIAL_LINKS.calcom,
  },
];
