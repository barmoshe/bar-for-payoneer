import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import PayoneerApp from "@/src/marketing/payoneer/PayoneerApp";

// Payoneer's real marketing face (read live off payoneer.com, 2026-07-06) is
// the proprietary "Avenir Next World" family. Mulish is the faithful free
// geometric-humanist substitute used here for both display and body text, at
// the weights the real site leans on.
const sans = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-pay-sans",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's generic application
// to Payoneer. No specific role or posting: the page addresses the company.
// Built as a faithful replica of Payoneer's own visual language, read live off
// payoneer.com (2026-07-06): a clean white, airy, colorful global-fintech
// surface whose whole identity is the rainbow ring. The hero centers a
// headline inside a large rainbow gradient arc (green to blue to purple to
// magenta) with small floating orbs riding on it; a 3-up feature card row; a
// deep-indigo "meet Bar" band with the rounded-square rainbow-ring logo tile;
// a work grid; and a rounded-tile close. Every shape is drawn fresh as
// original SVG/CSS; no Payoneer logo or asset is used. Noindex, a shareable
// link.
const ogTitle = "Bar Moshe × Payoneer";
const ogDescription =
  "I'm applying to Payoneer, in Payoneer's own visual language: ten shipped builds, no wire transfer required.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function PayoneerPage() {
  return (
    <div className={sans.variable}>
      <PayoneerApp />
    </div>
  );
}
