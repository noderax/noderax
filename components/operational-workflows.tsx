"use client";

import { Progress } from "@base-ui/react/progress";
import {
  ActivitySquare,
  ArrowRightLeft,
  PackageCheck,
  ScanLine,
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

const workflows = [
  {
    icon: ScanLine,
    title: "One-Click Bootstrapping",
    description:
      "A generated workspace-scoped installation configures PostgreSQL, Redis, and SMTP instantly, streaming live bootstrap visibility direct to the console.",
    phases: ["Setup Core", "Generate Auth", "Live Bootstrap", "Node Ready"],
    progress: 100,
    status: "Day-0 to Day-1",
  },
  {
    icon: ArrowRightLeft,
    title: "Unified Execution Pipeline",
    description:
      "Everything shares one abstraction: shell commands, packages, updates. The orchestration engine dynamically tracks claims, logs, logic gates, and outputs natively.",
    phases: ["Queue Sync", "Agent Claim", "Process Run", "Finalized Output"],
    progress: 82,
    status: "Omni-directional Control",
  },
  {
    icon: ActivitySquare,
    title: "Real-time Telemetry & SSH",
    description:
      "Telemetry pours through instantly. A highly persistent, dynamically reattaching interactive terminal streams bidirectional WebSocket packets natively.",
    phases: ["Metrics Pull", "Event Stream", "Socket Attach", "Grace Window"],
    progress: 94,
    status: "Zero-latency visibility",
  },
  {
    icon: PackageCheck,
    title: "Orchestrated Rollouts",
    description:
      "Updates push automatically into a sequential rollout plan. A complete tag-based discovery protocol upgrades hundreds of agents asynchronously without downtime.",
    phases: ["Tag Discovery", "Mapping", "Sequential Deploy", "Audit Verification"],
    progress: 74,
    status: "Hands-free lifecycle",
  },
];

export function OperationalWorkflows() {
  return (
    <section id="operations" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute right-0 top-0 h-[600px] w-full translate-x-1/3 -translate-y-1/4 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Operational Realities
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
              Modeling operations your teams{" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">execute natively</GradientText>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Every scattered script, side utility, and manual process is unified. Core metrics, automated software deployments, and interactive terminals run out-of-the-box natively.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {workflows.map((workflow, index) => (
            <ScrollReveal key={workflow.title} delay={index * 0.1}>
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-xl transition-all hover:bg-card/70 hover:shadow-2xl hover:shadow-primary/5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -inset-px rounded-xl border border-primary/10 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 z-[-1] blur-[1px]" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-105">
                      <workflow.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="muted" className="border-primary/20 bg-background/50 backdrop-blur text-[11px] uppercase tracking-wider font-semibold text-primary/90">
                      {workflow.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {workflow.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {workflow.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-2 space-y-6">
                  <Progress.Root
                    value={workflow.progress}
                    aria-valuetext={workflow.status}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <Progress.Label>Pipeline Execution</Progress.Label>
                      <span className="text-primary tabular-nums">{workflow.progress}%</span>
                    </div>
                    <Progress.Track className="relative h-2 overflow-hidden rounded-full bg-border/40 shadow-inner">
                      <Progress.Indicator className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-400 to-primary transition-all duration-1000 ease-out" />
                      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                    </Progress.Track>
                  </Progress.Root>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {workflow.phases.map((phase, i) => (
                      <div
                        key={phase}
                        className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/50 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors group-hover:border-border/60"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </div>
                        {phase}
                      </div>
                    ))}
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
