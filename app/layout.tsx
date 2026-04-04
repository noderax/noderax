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
    "Agent-based infrastructure control plane with a Next.js operator surface, NestJS orchestration API, Go node agents, realtime telemetry, task execution, terminal sessions, audit logs, and rollout orchestration.",
  keywords: [
    "infrastructure",
    "control plane",
    "linux",
    "node management",
    "devops",
    "server management",
    "task orchestration",
    "realtime monitoring",
    "agent management",
    "workspace-aware operations",
  ],
  openGraph: {
    title: "Noderax — Infrastructure Control Plane",
    description:
      "Agent-based infrastructure management with web, API, and node runtimes coordinated through realtime operational state.",
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
