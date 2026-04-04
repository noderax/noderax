"use client";

import {
  AppWindowMac,
  Database,
  Radio,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const stack = [
  {
    icon: AppWindowMac,
    title: "Next.js 16 Web Engine",
    description: "Workspace-aware App Router interface utilizing route handlers and zero-trust proxy endpoints natively.",
  },
  {
    icon: Workflow,
    title: "NestJS Core API",
    description: "Drives all internal logic: team targets, node authentication, cron execution, and event processing.",
  },
  {
    icon: Server,
    title: "Go-lang Fleet Agents",
    description: "Ultra-lightweight binaries managing enrollment, socket streaming, and interactive task handling.",
  },
  {
    icon: Database,
    title: "Hybrid Data Persistence",
    description: "PostgreSQL ensures durable transactional history alongside Redis for instantaneous pub/sub event routing.",
  },
  {
    icon: Radio,
    title: "Bi-directional WebSockets",
    description: "Immediate namespace propagation across /realtime and /terminal streams with reattach grace windows.",
  },
  {
    icon: ShieldCheck,
    title: "Implicit Global Security",
    description: "Invite-first provisioning gated tightly via OIDC SSO, Multi-Factor schemas, and cryptographic audits.",
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
                Built upon an uncompromising foundation.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground/90">
                Noderax eschews superficial dashboards for a genuinely powerful multi-runtime core. The stack isolates responsibilities flawlessly, ensuring unparalleled performance across tens of thousands of fleet nodes instantly.
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
