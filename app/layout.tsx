import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noderax — Infrastructure Control Plane",
  description:
    "Workspace-aware Linux infrastructure control plane with live telemetry, browser terminals, root access profiles, Email and Telegram alert routing, and official agent rollouts.",
  keywords: [
    "infrastructure",
    "control plane",
    "linux",
    "node management",
    "devops",
    "server management",
    "task orchestration",
    "realtime telemetry",
    "agent management",
    "workspace-aware operations",
    "root access profiles",
    "agent rollouts",
    "node notifications",
  ],
  openGraph: {
    title: "Noderax — Infrastructure Control Plane",
    description:
      "Operate Linux fleets through a Next.js web surface, NestJS orchestration API, and Go agents coordinated by realtime state.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          plusJakarta.variable,
          jetBrainsMono.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
