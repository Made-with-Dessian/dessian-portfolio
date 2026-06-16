import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navigation } from "@/components/nav/Navigation";
import { GlassCursor } from "@/components/cursor/GlassCursor";
import { ThemeTransition } from "@/components/ui/ThemeTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minjae Kim — Automotive Designer",
  description: "Transportation design, mobility concepts, and automotive storytelling.",
  openGraph: {
    title: "Minjae Kim — Automotive Designer",
    description: "Transportation design, mobility concepts, and automotive storytelling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <GlassCursor />
            <ThemeTransition />
            <Navigation />
            <main>{children}</main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
