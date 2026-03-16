import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "SLSL Translator - Real-Time Sri Lankan Sign Language to Sinhala Translation",
    template: "%s | SLSL Translator",
  },
  description:
    "A multimodal deep learning system that translates Sri Lankan Sign Language (SLSL) gestures into Sinhala text in real-time. Breaking communication barriers for the Deaf community in healthcare settings.",
  keywords: [
    "Sri Lankan Sign Language",
    "SLSL",
    "Sign Language Translation",
    "Sinhala Translation",
    "Deaf Community Sri Lanka",
    "Healthcare Communication",
    "Multimodal Deep Learning",
    "Real-time Translation",
    "MediaPipe Holistic",
    "TFLite",
    "Accessibility Technology",
    "Assistive Technology",
  ],
  authors: [
    { name: "G.S.R. Silva", url: "https://github.com/silva" },
    { name: "D.L.B. Kasun (Buddika)", url: "https://github.com/buddikakasun" },
    { name: "M.L.M. Fernando", url: "https://github.com/fernando" },
  ],
  creator: "Group 33 - University of Sri Jayewardenepura",
  publisher:
    "Department of ICT, Faculty of Technology, University of Sri Jayewardenepura",
  openGraph: {
    title: "SLSL Translator - Real-Time SLSL to Sinhala Translation",
    description:
      "Breaking communication barriers for the Deaf community in Sri Lanka with AI-powered sign language translation",
    url: "https://slsl-translator.vercel.app",
    siteName: "SLSL Translator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SLSL Translator - Real-time Sign Language Translation",
      },
    ],
    locale: "si_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLSL Translator - Real-time Sign Language Translation",
    description:
      "AI-powered translation of Sri Lankan Sign Language to Sinhala text",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Assistive Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="si" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased overflow-x-hidden w-full max-w-[100vw]`}
      >
        <div className="w-full overflow-x-hidden">
          <Header />
          <main className="min-h-screen w-full overflow-x-hidden px-0">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
