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
    "Workspace-aware Linux infrastructure control plane with guided self-hosted setup, live telemetry, browser terminals, root access profiles, official agent rollouts, and installer-managed control-plane self-update.",
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
    "control plane self-update",
    "guided setup",
    "node notifications",
  ],
  openGraph: {
    title: "Noderax — Infrastructure Control Plane",
    description:
      "Operate Linux fleets through a Next.js web surface, NestJS orchestration API, and Go agents with guided setup, realtime state, and installer-managed control-plane updates.",
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
