"use client";

import {
  Server,
  Terminal,
  Activity,
  Shield,
  Users,
  Workflow,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion } from "motion/react";
import { useState } from "react";

const features = [
  {
    icon: Server,
    title: "Node Inventory",
    description:
      "Complete Linux server inventory with live status, CPU/RAM/disk telemetry, package management, and maintenance mode controls.",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Workflow,
    title: "Task Orchestration",
    description:
      "On-demand tasks, multi-node batch dispatch, team-targeted runs, scheduled tasks, and task templates with prefill UX.",
    gradient: "from-violet-500/20 to-indigo-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Activity,
    title: "Realtime Telemetry",
    description:
      "Live metrics ingestion via Socket.IO — node status, CPU load, memory usage, and event streams with zero polling.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Terminal,
    title: "Interactive Terminal",
    description:
      "SSH-like xterm.js console tunneled through the agent. Session history, transcript timelines, and 5-min reattach window.",
    gradient: "from-sky-500/20 to-cyan-500/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description:
      "Multi-workspace architecture with workspace-scoped roles, team ownership, member management, and audit trails.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Shield,
    title: "Security & SSO",
    description:
      "QR-based TOTP MFA, recovery codes, OIDC/SSO provider management, JWT sessions, platform audit, and role-based access.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 surface-hover cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500`}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
        />
        
        {/* Animated Border Beam */}
        <BorderBeam 
          size={120} 
          duration={8} 
          delay={index * 0.5} 
          className={!isHovered ? "opacity-0 transition-opacity duration-500" : "opacity-100 transition-opacity duration-500"} 
        />

        {/* Icon */}
        <div className="relative mb-5">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
          >
            <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="mb-2 text-lg font-bold text-foreground">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 border-t border-border/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full tone-brand px-4 py-1.5 text-xs font-semibold border">
              Platform Features
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need to{" "}
              <GradientText>operate at scale</GradientText>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete control plane for your Linux infrastructure — from
              single nodes to multi-workspace fleet operations.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
