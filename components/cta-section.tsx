"use client";

import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const callouts = [
  "Self-reliant first-run installation and Redis validation",
  "Zero-trust one-click workspace agent onboarding",
  "Cohesive Terminal, Telegraphy, Audit, and Execution console",
];

export function CTASection() {
  return (
    <section id="cta" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <Card className="group relative overflow-hidden border border-primary/20 bg-card/60 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(239,68,68,0.25)] transition-all hover:shadow-[0_0_60px_-12px_rgba(239,68,68,0.35)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-50" />
            <div className="absolute -inset-px rounded-xl border border-primary/20 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100 z-[-1] blur-[1px]" />
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <CardContent className="relative z-10 grid gap-12 p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
                  <Zap className="mr-2 h-4 w-4" /> Start Orchestrating
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl text-foreground">
                  Take absolute control over your{" "}
                  <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">infrastructure scale.</GradientText>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground/90">
                  Deploy the Noderax control plane within minutes. Automate massive Linux fleet rollouts, secure remote access, and unify telemetry streaming instantly.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#" className={cn(buttonVariants({ size: "lg" }), "group/btn rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30")}>
                    Deploy Control Plane
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  <a
                    href="#faq"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full bg-background/50 backdrop-blur transition-all hover:bg-background/80 hover:text-foreground")}
                  >
                    View Documentation
                  </a>
                </div>
              </div>

              <div className="relative flex flex-col gap-4">
                {callouts.map((callout, i) => (
                  <div
                    key={callout}
                    className="flex items-center gap-4 rounded-2xl border border-border/50 bg-background/70 px-5 py-4 shadow-sm backdrop-blur transition-colors hover:border-primary/30"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-foreground/90">
                      {callout}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
