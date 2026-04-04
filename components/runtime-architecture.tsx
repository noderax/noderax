"use client";

import { useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import {
  AppWindowMac,
  Database,
  RadioTower,
  ServerCog,
  CheckCircle2,
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
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const runtimeTabs = [
  {
    id: "web",
    label: "Web Control Plane",
    icon: AppWindowMac,
    title: "Next.js 16 Workspace-Aware Core",
    summary:
      "A lightning-fast frontend that communicates through proxy layers, leaving the core protected. Everything from session context to unified state resides here.",
    bullets: [
      "Public auth boundaries managed tightly under protected routes",
      "React Query handles backend state natively",
      "Real-time terminal WebSockets render effortlessly",
    ],
    sideTitle: "Impenetrable Experience",
    sideBody:
      "By isolating the session boundary and leveraging route handlers, direct API exposure is entirely bypassed, preventing common threat vectors automatically.",
    tags: ["Session context", "Real-time Native", "Zero-polling"],
  },
  {
    id: "api",
    label: "Core API",
    icon: Database,
    title: "NestJS Orchestration Engine",
    summary:
      "The master choreographer. From the moment Noderax starts, it assesses its boot mode, spins up HTTP APIs, and establishes connections across the decentralized network.",
    bullets: [
      "TypeORM maps multi-layer invariants instantly",
      "Redis channels handle continuous state broadcast",
      "Self-validating first-run setup across services",
    ],
    sideTitle: "Orchestration Power",
    sideBody:
      "This is where team-targeted runs map down into localized node-tasks and audit records are perfectly synthesized.",
    tags: ["TypeORM mappings", "Redis backend", "Event-driven"],
  },
  {
    id: "agent",
    label: "Node Agent",
    icon: ServerCog,
    title: "Go-lang Native Node Runtime",
    summary:
      "A long-running, fault-tolerant Go binary deployed onto fleets, responsible for bootstrapping nodes securely, pulling updates natively, and pushing active telemetry.",
    bullets: [
      "Self-contained zero-dependency binaries",
      "Internal metrics and terminal connection multiplexing",
      "Hardware and OS version telemetry parsing",
    ],
    sideTitle: "Execution Safety",
    sideBody:
      "Updates, shell tasks, and package deployments go through exactly one standardized, auditable execution path.",
    tags: ["Go Binary", "Zero-dependency", "Secure Self-Update"],
  },
  {
    id: "coordination",
    label: "Coordinations",
    icon: RadioTower,
    title: "Omni-directional State Sync",
    summary:
      "A complete synchronization layer that bridges the web UI, orchestration API, and individual agents simultaneously across Redis and WebSockets.",
    bullets: [
      "Targeted Socket.IO isolated namespaces",
      "Live terminal transcript broadcast and tracking",
      "Immediate UI update dispatch across operator devices",
    ],
    sideTitle: "Instant Operator Intel",
    sideBody:
      "Operators experience live updates across every agent connection, upgrade task, or pipeline disruption without needing to hit reload once.",
    tags: ["Live Fan-Out", "WebSocket Routing", "Redis Cache"],
  },
] as const;

type RuntimeTabId = (typeof runtimeTabs)[number]["id"];

export function RuntimeArchitecture() {
  const [activeTab, setActiveTab] = useState<RuntimeTabId>("web");

  return (
    <section
      id="architecture"
      className="relative border-y border-border/40 bg-gradient-to-b from-background via-background/90 to-card/20 py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-30 dark:opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
      <div className="absolute -left-1/4 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-[160px] dark:bg-primary/20" />
      <div className="absolute -right-1/4 top-[80%] -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px] dark:bg-orange-500/15" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              Runtime Systems
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
              One product, four coordinated{" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">runtime responsibilities</GradientText>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Noderax splits operations seamlessly across web, API, agent, and realtime layers. We architected it so your data and commands travel safely and beautifully.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Tabs.Root
            value={activeTab}
            onValueChange={(value) => {
              if (typeof value === "string") {
                setActiveTab(value as RuntimeTabId);
              }
            }}
            className="mx-auto max-w-6xl space-y-10"
          >
            <Tabs.List className="relative z-10 flex w-full flex-wrap justify-center gap-3 rounded-[2.5rem] border border-border/50 bg-card/40 p-2.5 shadow-xl backdrop-blur-xl md:flex-nowrap">
              {runtimeTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <Tabs.Tab
                    key={tab.id}
                    value={tab.id}
                    className="relative flex flex-1 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-bold transition-all focus:outline-none min-w-[200px]"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab"
                        className="absolute inset-0 z-0 rounded-full bg-primary shadow-[0_0_20px_rgba(239,68,68,0.3)] dark:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={cn("relative z-10 flex items-center gap-2", isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                      <tab.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary/70")} />
                      {tab.label}
                    </div>
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            <div className="relative mt-10 min-h-[420px]">
              <AnimatePresence mode="wait">
                {runtimeTabs.map((tab) =>
                  activeTab === tab.id ? (
                    <Tabs.Panel
                      key={tab.id}
                      value={tab.id}
                      keepMounted
                      className="focus:outline-none"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid gap-6 xl:grid-cols-[1.6fr_1fr]"
                      >
                        <Card className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl transition-all hover:bg-card/70">
                          <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 dark:opacity-10 dark:group-hover:opacity-20 pointer-events-none">
                            <tab.icon className="h-48 w-48 text-primary" />
                          </div>
                          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
                          <CardHeader className="pb-4 relative z-10">
                            <div className="mb-2 hidden w-max items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm sm:flex">
                              {tab.label} Integration
                            </div>
                            <CardTitle className="text-3xl font-bold tracking-tight mt-2 text-foreground">
                              {tab.title}
                            </CardTitle>
                            <CardDescription className="mt-4 text-base leading-relaxed text-muted-foreground/90 max-w-2xl">
                              {tab.summary}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="relative z-10 pt-4">
                            <div className="grid gap-4">
                              {tab.bullets.map((bullet, idx) => (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                                  key={bullet}
                                  className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/50 p-4 transition-colors hover:border-primary/30"
                                >
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <CheckCircle2 className="h-5 w-5" />
                                  </div>
                                  <div className="text-sm font-medium leading-relaxed text-muted-foreground/90">
                                    {bullet}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid gap-6">
                          <Card className="relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
                            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent opacity-30" />
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                                <CardTitle className="text-lg font-bold">{tab.sideTitle}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="text-[15px] leading-relaxed text-muted-foreground">
                                {tab.sideBody}
                              </CardDescription>
                            </CardContent>
                          </Card>

                          <Card className="relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-xl flex-1 flex flex-col">
                            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-30" />
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Key Technical Properties</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2.5">
                              {tab.tags.map((tag) => (
                                <span key={tag} className="inline-flex rounded-lg border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                                  {tag}
                                </span>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    </Tabs.Panel>
                  ) : null
                )}
              </AnimatePresence>
            </div>
          </Tabs.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}
