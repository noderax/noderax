"use client";

import {
  AppWindowMac,
  Database,
  Radio,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const stack = [
  {
    icon: AppWindowMac,
    title: "Next.js 16 Operator Surface",
    description:
      "Workspace-aware App Router UI with auth handlers, proxy routes, and dedicated terminal attachment flows.",
  },
  {
    icon: Workflow,
    title: "NestJS Orchestration API",
    description:
      "Installer-managed setup, scheduling, audit logging, notifications, and rollout orchestration live here.",
  },
  {
    icon: Server,
    title: "Go Fleet Agents",
    description:
      "Linux daemons handle bootstrap, telemetry, long-poll task claiming, realtime terminals, and self-update.",
  },
  {
    icon: Database,
    title: "PostgreSQL + Redis",
    description:
      "Durable control-plane history and reconnect-aware pub/sub fan-out back the operational state model.",
  },
  {
    icon: Radio,
    title: "Realtime + Terminal Channels",
    description:
      "Dedicated /realtime and /terminal namespaces keep installs, metrics, tasks, and shell sessions current.",
  },
  {
    icon: ShieldCheck,
    title: "Policy Gates",
    description:
      "Invite-first access, MFA, OIDC, workspace RBAC, and per-node root profile gating enforce operator boundaries.",
  },
];

export function RuntimeStrip() {
  return (
    <section className="relative py-14 lg:py-16 overflow-hidden border-t border-border/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute left-0 top-1/2 -z-10 h-1/2 w-full -translate-y-1/2 bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md mb-4">
                Architecture Blueprint
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Grounded in the runtime boundaries the product actually ships.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground/90">
                Noderax is not a generic dashboard skin. The web surface, API,
                agents, persistence layer, and policy gates are separated so
                onboarding, execution, notifications, and rollouts stay coherent
                as the product grows.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stack.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <Card className="group relative h-full overflow-hidden border border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative z-10 flex h-full gap-5 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground/80">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
