"use client";

import { Check, Minus, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for exploratory rollouts",
    price: "Free",
    period: "",
    cta: "Deploy Starter",
    featured: false,
    features: [
      { text: "Up to 5 synced nodes", included: true },
      { text: "1 logical workspace", included: true },
      { text: "Basic orchestration", included: true },
      { text: "Real-time telemetry", included: true },
      { text: "Community forums", included: true },
      { text: "Persistent terminal", included: false },
      { text: "OIDC & SSO Integrations", included: false },
      { text: "Cryptographic auditing", included: false },
    ],
  },
  {
    name: "Pro Fleet",
    description: "For sprawling networks that demand scale",
    price: "$29",
    period: "/node/mo",
    cta: "Start Pro Trial",
    featured: true,
    features: [
      { text: "Unlimited node limits", included: true },
      { text: "Unlimited workspaces", included: true },
      { text: "Advanced pipelines", included: true },
      { text: "Historical metric parsing", included: true },
      { text: "Priority SLA support", included: true },
      { text: "Persistent terminal", included: true },
      { text: "OIDC & SSO Integrations", included: true },
      { text: "Cryptographic auditing", included: false },
    ],
  },
  {
    name: "Enterprise Core",
    description: "Air-gapped clusters mapping full power",
    price: "Custom",
    period: "",
    cta: "Contact Engineers",
    featured: false,
    features: [
      { text: "Global multi-tenant plane", included: true },
      { text: "Self-hosted & on-prem", included: true },
      { text: "Sequential agent updates", included: true },
      { text: "Exportable metric lakes", included: true },
      { text: "Dedicated success rep", included: true },
      { text: "Persistent terminal", included: true },
      { text: "OIDC / SSO / YubiKey MFA", included: true },
      { text: "Granular audit logs", included: true },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2 -translate-y-1/2 bg-orange-500/5 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Flexible Tiers
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
              Scale your fleet without {" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">architectural limits</GradientText>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Everything required to orchestrate vast systems. Begin testing locally, and roll out seamlessly once you're comfortable. Absolute transparency.
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
                {/* Featured background glow effect */}
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  </>
                )}

                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary shadow-lg shadow-primary/30 px-5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      Definitive Choice
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="relative z-10 mb-8">
                  <h3 className={cn("text-2xl font-bold tracking-tight", plan.featured ? "text-primary" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-snug text-muted-foreground/90">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="relative z-10 mb-8 flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[15px] font-medium text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={cn(
                    "relative z-10 mb-10 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl text-[15px] font-bold transition-all duration-300",
                    plan.featured
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                      : "border border-border/70 bg-background/50 text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Features */}
                <div className="relative z-10 mt-auto flex flex-col gap-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3.5"
                    >
                      <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors", feature.included ? (plan.featured ? "border-primary/30 bg-primary/10 text-primary" : "border-primary/20 bg-primary/5 text-primary/80") : "border-transparent bg-transparent text-muted-foreground/40")}>
                        {feature.included ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Minus className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <span
                        className={cn("text-sm font-medium",
                          feature.included
                            ? "text-foreground/90"
                            : "text-muted-foreground/50"
                        )}
                      >
                        {feature.text}
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
