import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#04050F" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://clarion.com.br"),
  title: "Clarion — Soluções Digitais",
  description:
    "Estratégia, design e tecnologia para marcas que querem crescer. Transformamos ideias em experiências digitais memoráveis.",
  openGraph: {
    title: "Clarion — Soluções Digitais",
    description:
      "Estratégia, design e tecnologia para marcas que querem crescer.",
    type: "website",
    locale: "pt_BR",
    siteName: "Clarion",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clarion — Soluções Digitais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarion — Soluções Digitais",
    description:
      "Estratégia, design e tecnologia para marcas que querem crescer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-100 font-body antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
