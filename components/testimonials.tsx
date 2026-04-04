"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Noderax completely transformed how we manage our 200+ node fleet. The live terminal feature alone saves us hours of SSH juggling every day.",
    name: "Marcus Chen",
    role: "Lead SRE",
    company: "ScaleGrid",
    avatar: "MC",
  },
  {
    quote:
      "The realtime telemetry and workspace isolation are exactly what we needed. We went from 4 different tools to just Noderax across all our environments.",
    name: "Sarah Okonkwo",
    role: "VP of Engineering",
    company: "NexaBuild",
    avatar: "SO",
  },
  {
    quote:
      "Setting up was incredibly fast — one curl command and our nodes were reporting. The task orchestration and fleet rollouts make day-2 ops painless.",
    name: "Tobias Richter",
    role: "Infrastructure Lead",
    company: "CloudForge",
    avatar: "TR",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 border-y border-border/50"
    >
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full tone-brand px-4 py-1.5 text-xs font-semibold border">
              Testimonials
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Loved by{" "}
              <GradientText>infrastructure teams</GradientText>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 surface-hover"
              >
                <Quote className="mb-4 h-8 w-8 text-primary/20" />

                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
