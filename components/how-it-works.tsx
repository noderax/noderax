"use client";

import { Download, Link2, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install the Agent",
    description:
      "One-liner install command deploys the lightweight Noderax agent on any Linux server. Supports Ubuntu, Debian, CentOS, and RHEL.",
    code: "curl -sSL https://get.noderax.com | bash",
    color: "text-primary",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    number: "02",
    icon: Link2,
    title: "Connect to Control Plane",
    description:
      "The agent automatically registers with your Noderax instance. Live bootstrap progress shows real-time connection status.",
    code: "Agent connected — node 'prod-api-01' online ✓",
    color: "text-emerald-400",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    number: "03",
    icon: Zap,
    title: "Operate & Monitor",
    description:
      "Run tasks, monitor telemetry, open terminals, schedule operations, and manage your fleet from a unified workspace dashboard.",
    code: "noderax task run --template deploy --target prod-*",
    color: "text-violet-400",
    gradient: "from-violet-500/10 to-indigo-500/10",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32 border-t border-border/20"
    >

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full tone-brand px-4 py-1.5 text-xs font-semibold border">
              Quick Start
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Up and running in{" "}
              <GradientText>under 5 minutes</GradientText>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three steps to go from zero to full fleet visibility. No complex
              configuration needed.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative grid gap-8 lg:grid-cols-3">
          {/* Connection Line (Desktop) */}
          <div className="absolute top-24 left-[16.6%] right-[16.6%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <motion.div
                className="group relative flex flex-col items-center text-center"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br ${step.gradient} shadow-lg`}
                  >
                    <step.icon className={`h-7 w-7 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-glow">
                    {step.number}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground max-w-xs">
                  {step.description}
                </p>

                {/* Code Snippet */}
                <div className="w-full rounded-lg border border-border bg-background/80 p-3">
                  <code className="text-xs font-mono text-muted-foreground break-all">
                    <span className={step.color}>$</span> {step.code}
                  </code>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
