import type { Metadata } from "next";
import "./globals.css";
import CriticalStyles from "@/components/CriticalStyles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://cjp-action-hub.example"),
  title: {
    default: "CJP Action Hub",
    template: "%s | CJP Action Hub"
  },
  description:
    "Independent community toolkit to follow, share, volunteer, and create for the Cockroach Janta Party movement.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "CJP Action Hub",
    description:
      "Independent community toolkit to follow, share, volunteer, and create for the Cockroach Janta Party movement.",
    url: "/",
    siteName: "CJP Action Hub",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "CJP Action Hub" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CJP Action Hub",
    description:
      "Independent community toolkit to follow, share, volunteer, and create for the Cockroach Janta Party movement.",
    images: ["/og.svg"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <CriticalStyles />
      </head>
      <body>
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
