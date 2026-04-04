"use client";

import {
  BellRing,
  FolderKanban,
  KeyRound,
  MonitorCog,
  ScanSearch,
  TerminalSquare,
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const productSurface = [
  {
    icon: KeyRound,
    title: "Identity & Zero-Trust Base",
    description:
      "Global user identities wired for password login, MFA, and OIDC-based SSO. Strict access policies handled effortlessly.",
    bullets: [
      "Platform admin & workspace scopes",
      "Robust state enforcement for inactivity",
      "Seamless browser auth & routing",
    ],
  },
  {
    icon: FolderKanban,
    title: "Workspace Modeling",
    description:
      "Complete organizational mapping with teams, node ownership, deep search capabilities, and precise data isolation.",
    bullets: [
      "Granular team node segregation",
      "Unified operational search",
      "Secure data archiving workflows",
    ],
  },
  {
    icon: MonitorCog,
    title: "Fleet Node Inventory",
    description:
      "Observe every Linux node via self-reporting status metrics, version data, maintenance signals, and deep platform inspection.",
    bullets: [
      "Instant offline/online tracking",
      "One-click installs with live polling",
      "Dynamic node bootstrap rendering",
    ],
  },
  {
    icon: TerminalSquare,
    title: "Persistent Control Plane",
    description:
      "A shared execution layer handles instantaneous shell commands, long-running agent updates, and dynamic task scheduling.",
    bullets: [
      "Queued to deployed state transitions",
      "Seamless node-level API expansion",
      "Interactive session reattach windows",
    ],
  },
  {
    icon: BellRing,
    title: "Infallible Audit Trails",
    description:
      "Append-only operational logs mixed with dynamic workspace notification fan-out loops guaranteeing high visibility into system mutations.",
    bullets: [
      "Event-driven Telegram & Email alerts",
      "Automatic high CPU threshold alarms",
      "Read-only cryptographic compliance",
    ],
  },
  {
    icon: ScanSearch,
    title: "Intelligent Rollouts",
    description:
      "Sequential agent dispatch built over real-time WebSockets allows progressive software updates monitored across a live dashboard.",
    bullets: [
      "Redis + Socket.IO immediate fan-out",
      "Continuous verification deployments",
      "Full first-run installation management",
    ],
  },
];

export function ProductSurface() {
  return (
    <section id="surface" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Product Overview
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Built for <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">Day-0 through Day-2</GradientText> operations
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Everything required to orchestrate vast systems: real-time live polling, secure authentication tunnels, extensive fleet logs, and native rollout procedures fully abstracted.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productSurface.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <Card className="group h-full overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="pb-4">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-110">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6 text-base leading-relaxed text-muted-foreground/90">
                    {item.description}
                  </CardDescription>
                  <ul className="space-y-3">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/50 px-3 py-2.5 text-sm text-muted-foreground/80 transition-colors group-hover:border-border/80 group-hover:bg-background/80"
                      >
                        <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
