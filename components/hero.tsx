"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Check,
  ArrowRight,
  ArrowUpCircle,
  BellRing,
  Copy,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeroArchitecture } from "@/components/hero-architecture";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const summaryCards = [
  {
    icon: ShieldCheck,
    title: "Scoped Root Profiles",
    body: "Per-node operational, task, and terminal scopes with desired/applied sync visibility.",
  },
  {
    icon: BellRing,
    title: "Node Delivery Rules",
    body: "Workspace Email and Telegram automations with node-level severity overrides.",
  },
  {
    icon: ArrowUpCircle,
    title: "Update Center",
    body: "Tagged agent releases and installer-managed control-plane updates land in one staged apply flow.",
  },
];

const orbitRings = [
  {
    size: "h-[18rem] w-[18rem] sm:h-[23rem] sm:w-[23rem]",
    border: "border-primary/15",
    dotClass:
      "bg-primary shadow-[0_0_18px_rgba(239,68,68,0.55)] dark:shadow-[0_0_18px_rgba(239,68,68,0.42)]",
    duration: 24,
    rotation: 360,
  },
  {
    size: "h-[26rem] w-[26rem] sm:h-[34rem] sm:w-[34rem]",
    border: "border-orange-400/12",
    dotClass:
      "bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.45)] dark:shadow-[0_0_18px_rgba(251,146,60,0.34)]",
    duration: 34,
    rotation: -360,
  },
  {
    size: "h-[34rem] w-[34rem] sm:h-[44rem] sm:w-[44rem]",
    border: "border-foreground/6",
    dotClass:
      "bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.28)] dark:bg-white/55 dark:shadow-[0_0_14px_rgba(255,255,255,0.18)]",
    duration: 46,
    rotation: 360,
  },
] as const;

const heroHighlights = [
  "Installer-managed self-update",
  "5-minute terminal reattach",
  "Email + Telegram routing",
];

const INSTALLER_COMMAND =
  "curl -fsSL https://cdn.noderax.net/noderax-platform/install.sh | sudo bash";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleCopyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(INSTALLER_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2">
          {orbitRings.map((ring) => (
            <motion.div
              key={ring.size}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                ring.size,
                ring.border,
              )}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: ring.rotation,
                      scale: [1, 1.025, 1],
                    }
              }
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className={cn(
                  "absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  ring.dotClass,
                )}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute top-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-primary/6 blur-[120px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.28, 0.46, 0.28] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[0%] h-[500px] w-[500px] rounded-full bg-orange-500/6 blur-[150px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1.08, 1, 1.08], opacity: [0.22, 0.36, 0.22] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-[-10%] top-[47%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["-6%", "6%", "-6%"],
                  opacity: [0.18, 0.55, 0.18],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={contentVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative inline-flex"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative inline-flex items-center overflow-hidden rounded-full border border-primary/25 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_14%,transparent),color-mix(in_oklch,var(--background)_88%,transparent))] px-4 py-1.5 text-sm font-medium text-primary shadow-[0_12px_28px_-18px_rgba(239,68,68,0.7)] backdrop-blur-md transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_18px_36px_-16px_rgba(239,68,68,0.9)]">
                <div className="absolute inset-y-0 left-[-35%] w-1/3 -skew-x-12 bg-white/15 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100 dark:bg-white/10" />
                <Sparkles className="relative mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative tracking-[0.01em]">
                  One surface. Every Linux move.
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Operate Linux fleets with{" "}
            <br className="hidden lg:block" />
            <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary/80">
              scoped privilege and live runtime control
            </GradientText>
          </motion.h1>

          {/* <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Noderax combines a Next.js operator surface, a NestJS orchestration
            API, and a Go agent so teams can install nodes, stream telemetry,
            open browser terminals, tune Email and Telegram delivery, and roll
            out official tagged agent releases while platform admins stage
            newer control-plane builds from one workspace-aware control plane.
          </motion.p> */}

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#surface"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative overflow-hidden rounded-full shadow-lg transition-transform hover:scale-105"
              )}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/10" />
              Inspect Product Surface
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#architecture"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80"
              )}
            >
              View Runtime Topology
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {heroHighlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-full border border-border/60 bg-background/55 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-md"
              >
                {highlight}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 w-full max-w-4xl">
            <div className="rounded-[1.75rem] border border-border/60 bg-card/70 p-4 text-left shadow-xl backdrop-blur-xl sm:p-5">
              <div className="max-w-1xl">
                <p className="text-sm font-semibold text-foreground">
                  Self-hosted quick start
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Install the control plane with one command, complete guided
                  setup at <span className="font-mono text-foreground">/setup</span>,
                  then let the dashboard surface future control-plane updates
                  when a newer official build is available.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border/70 bg-background/80 p-2 pl-4 shadow-inner">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
                  {INSTALLER_COMMAND}
                </code>
                <Button
                  variant={copied ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 rounded-xl"
                  onClick={handleCopyInstallCommand}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 space-y-8"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
        >
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="pointer-events-none absolute inset-0 -inset-x-4 -inset-y-4 z-[-1] rounded-[2.5rem] bg-gradient-to-b from-primary/5 to-transparent blur-xl" />
            <div className="hidden lg:block">
              <div className="glow-border rounded-[2rem]">
                <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/40 p-2 shadow-2xl backdrop-blur-xl">
                  <HeroArchitecture />
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <div className="rounded-[2rem] border border-border/60 bg-card/60 p-6 shadow-xl backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Product surface
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  Mobile keeps the message, not the dashboard chrome.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  The full live dashboard preview is reserved for larger screens.
                  On mobile, focus stays on guided install, scoped privilege,
                  terminals, notifications, and update orchestration.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Guided self-hosted setup
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Install with one command, finish <span className="font-mono text-foreground">/setup</span>, then operate the HA runtime.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Staged updates
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Agent rollouts and control-plane releases stay staged, explicit, and observable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {summaryCards.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <Card className="surface-hover group relative h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-md transition-all hover:bg-card/80">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-110">
                        <card.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
