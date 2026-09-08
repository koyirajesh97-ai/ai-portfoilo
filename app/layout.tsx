import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajesh Koyi — Senior Software Engineer",
  description:
    "Portfolio of Rajesh Koyi, Senior Software Engineer at Goldman Sachs. Architecting Next.js 14 micro-frontends, Java 21/Spring Boot 3 event-driven services, and AI-augmented engineering platforms processing 500K+ daily transactions.",
  keywords: [
    "Rajesh Koyi",
    "Senior Software Engineer",
    "Fintech",
    "Distributed Systems",
    "Next.js 14",
    "Spring Boot 3",
    "AI-Augmented Engineering",
    "Goldman Sachs",
    "TIAA",
    "Wipro",
  ],
  openGraph: {
    title: "Rajesh Koyi — Senior Software Engineer",
    description:
      "Engineering resilient fintech platforms. 500K+ daily transactions, 93% test coverage via AI agents, zero critical CVEs for 30+ months.",
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