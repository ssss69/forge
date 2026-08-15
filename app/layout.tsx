import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://forge.app"),
  title: "Forge - Personal Growth OS",
  description:
    "A premium productivity platform combining deep focus, AI coaching, adaptive app blocking, RPG progression, and productivity intelligence.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Forge - Personal Growth OS",
    description:
      "Turn goals, focus, habits, and rewards into a daily system for disciplined growth.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge - Personal Growth OS",
    description:
      "Turn goals, focus, habits, and rewards into a daily system for disciplined growth.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
