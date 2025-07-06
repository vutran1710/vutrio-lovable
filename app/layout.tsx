import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Mono, Pangolin } from "next/font/google";
import "./globals.css";

const ebgaramon = EB_Garamond({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

const pangolin = Pangolin({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

const ibmplexmono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fraclog",
  description:
    "Where ideas, photos, and signals collide. A running log of thought experiments and sensory fragments",
  metadataBase: new URL("https://vutr.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebgaramon.variable} ${ibmplexmono.variable} ${pangolin.variable} antialiased`}
      >
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
