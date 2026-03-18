import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"], display: "swap" });

export const metadata: Metadata = {
  title: "Student Career Assessment | Campus Compass",
  description: "Discover your path with AI-driven career insights tailored for students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
