import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajesh Koyi — Senior Software Engineer",
  description:
    "Portfolio of Rajesh Koyi, a Senior Software Engineer building resilient fintech systems and AI-augmented product experiences.",
  keywords: ["Rajesh Koyi", "Senior Software Engineer", "Fintech", "AI Engineering"],
  openGraph: {
    title: "Rajesh Koyi — Senior Software Engineer",
    description: "Engineering resilient systems. Accelerating what comes next.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}