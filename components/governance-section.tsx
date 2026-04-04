"use client";

import {
  BellElectric,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
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

const governanceCards = [
  {
    icon: LockKeyhole,
    title: "Global Identity & SSO",
    description:
      "Enterprise authentication baked in natively. Enforce Multi-Factor Authentication, integrate OIDC-based Single Sign-On, and manage password policies universally.",
    highlight: "Zero-Trust default posture",
  },
  {
    icon: UsersRound,
    title: "Granular Workspace RBAC",
    description:
      "Segregate fleets into unified workspaces with strict owner, admin, member, and viewer roles. Ensure operational bounds are never crossed by unauthorized agents.",
    highlight: "Isolated logical boundaries",
  },
  {
    icon: BellElectric,
    title: "Intelligent Notification Matrix",
    description:
      "Plug dynamic metric thresholds directly into Telegram and Email fan-outs. Automated alarms trigger on custom high CPU, offline cycles, or deployment failures instantly.",
    highlight: "Proactive alerting loops",
  },
  {
    icon: ShieldCheck,
    title: "Cryptographic Audit Trails",
    description:
      "Every terminal command, scheduled rollback, or agent update leaves a persistent, immutable footprint on the control plane. Total visibility into operational history.",
    highlight: "Immutable operational logs",
  },
];

export function GovernanceSection() {
  return (
    <section
      id="governance"
      className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20"
    >
      {/* Subtle glow instead of hard grid */}
      <div className="absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 h-[400px] w-[500px] translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Access & Policy Architecture
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
              Governance deeply wired into the {" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">control plane</GradientText>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We didn't bolt security on. Noderax enforces stateful access rules, cryptographically tracks command origins, and intelligently segregates multi-tenant environments.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {governanceCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.1}>
              <Card className="group relative h-full overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-110">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-5 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed text-muted-foreground/90">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="inline-flex items-center rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary/90 transition-colors group-hover:bg-primary/10">
                    {card.highlight}
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
