import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Deploy Soluções Digitais - Sites, Landing Pages e SaaS",
    template: "%s | Deploy Soluções Digitais",
  },
  description:
    "Criamos sites, landing pages e plataformas SaaS que impulsionam o crescimento do seu negócio. Soluções digitais de alta conversão.",
  keywords: ["sites", "landing page", "SaaS", "desenvolvimento web", "plataforma digital", "Deploy"],
  authors: [{ name: "Deploy Soluções Digitais" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Deploy Soluções Digitais",
    title: "Deploy Soluções Digitais - Sites, Landing Pages e SaaS",
    description:
      "Criamos sites, landing pages e plataformas SaaS que impulsionam o crescimento do seu negócio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
