"use client";

import {
  CheckCircle2,
  Cloud,
  ExternalLink,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Self Hosted",
    icon: ServerCog,
    description:
      "Run Noderax on your own infrastructure and adopt the control plane at your own pace.",
    badge: "Available",
    cta: "Open GitHub",
    href: "https://github.com/noderax",
    featured: true,
    comingSoon: false,
    highlights: [
      "Installer-managed setup with PostgreSQL, Redis, and optional SMTP validation.",
      "Workspace-aware control plane, browser terminals, notifications, and official agent rollouts.",
      "Best fit if you want to evaluate, deploy, and operate Noderax on your own hosts.",
    ],
  },
  {
    name: "Cloud",
    icon: Cloud,
    description:
      "Managed Noderax control plane for teams that want the product without owning the platform runtime.",
    cta: "Coming Soon",
    href: null,
    featured: false,
    comingSoon: true,
    highlights: [
      "Hosted control plane experience without maintaining the web and API stack yourself.",
      "Same operator workflows, rollout visibility, and workspace-aware fleet operations.",
      "Useful when you want faster onboarding and less infrastructure ownership.",
    ],
  },
  {
    name: "Enterprise",
    icon: ShieldCheck,
    description:
      "Expanded commercial offering for larger organizations with stricter rollout, governance, and support expectations.",
    cta: "Coming Soon",
    href: null,
    featured: false,
    comingSoon: true,
    highlights: [
      "Designed for teams that need stronger procurement, governance, and operating assurances.",
      "Intended to build on the same control plane foundations rather than a separate product line.",
      "Will sit above the self-hosted core once the commercial path is ready.",
    ],
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2 -translate-y-1/2 bg-orange-500/5 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Pricing & Availability
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-4xl">
              Choose how you want to{" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">
                run Noderax
              </GradientText>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Self-hosted is available today. Cloud and Enterprise are shown
              explicitly as planned options instead of pretending they already
              exist.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "group relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur-xl transition-all",
                  plan.featured
                    ? "border-primary/40 bg-card/80 shadow-[0_0_40px_-10px_rgba(239,68,68,0.2)]"
                    : "border-border/50 bg-card/50 hover:bg-card/70 hover:shadow-xl hover:border-primary/20 hover:shadow-primary/5"
                )}
              >
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  </>
                )}

                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary shadow-lg shadow-primary/30 px-5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="relative z-10 mb-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
                    <plan.icon className="h-5 w-5" />
                  </div>
                  <h3 className={cn("text-xl font-bold tracking-tight sm:text-2xl", plan.featured ? "text-primary" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90">
                    {plan.description}
                  </p>
                </div>

                {plan.href ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "relative z-10 mb-10 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl text-[15px] font-bold transition-all duration-300",
                      plan.featured
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                        : "border border-border/70 bg-background/50 text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
                    )}
                  >
                    {plan.cta}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="relative z-10 mb-10 flex min-h-[52px] items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background/35 text-sm font-bold text-muted-foreground sm:text-[15px]">
                    {plan.cta}
                  </div>
                )}

                <div className="relative z-10 mt-auto flex flex-col gap-4">
                  {plan.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3.5"
                    >
                      <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors", plan.featured ? "border-primary/30 bg-primary/10 text-primary" : "border-primary/20 bg-primary/5 text-primary/80")}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[13px] leading-relaxed font-medium text-foreground/90 sm:text-sm">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
