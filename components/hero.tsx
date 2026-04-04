"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowRight,
  FolderTree,
  Radio,
  TerminalSquare,
  Sparkles,
} from "lucide-react";
import { HeroArchitecture } from "@/components/hero-architecture";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
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
    icon: FolderTree,
    title: "Workspace-Aware",
    body: "Unified search, localized teams, and zero-trust RBAC by default.",
  },
  {
    icon: TerminalSquare,
    title: "Interactive Terminals",
    body: "Persistent chunk logs and grace windows built precisely into the UI.",
  },
  {
    icon: Radio,
    title: "Realtime Telemetry",
    body: "Redis-backed fan-out. Seamless Socket.IO state streaming.",
  },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24">
      {/* Animated UI Accents - Floating depth elements */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[0%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[150px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
                  Next Generation Infrastructure Control
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Operate Linux fleets through{" "}
            <br className="hidden lg:block" />
            <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary/80">
              one coordinated runtime
            </GradientText>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Noderax combines a Next.js operator surface, a NestJS orchestration API, and a Go agent so teams can stream telemetry, exact terminal sessions, and orchestrate updates entirely from the web.
          </motion.p>

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
              Explore Product Surface
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#architecture"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80"
              )}
            >
              See Architecture Diagram
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
        >
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="pointer-events-none absolute inset-0 -inset-x-4 -inset-y-4 z-[-1] rounded-[2.5rem] bg-gradient-to-b from-primary/5 to-transparent blur-xl" />
            <div className="glow-border rounded-[2rem]">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/40 p-2 shadow-2xl backdrop-blur-xl">
                <HeroArchitecture />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center space-y-6">
            {summaryCards.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <Card className="surface-hover group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-md transition-all hover:bg-card/80">
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
