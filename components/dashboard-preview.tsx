"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Activity,
  Bell,
  Cpu,
  HardDrive,
  MemoryStick,
  TrendingUp,
  Wifi,
} from "lucide-react";

function MiniChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-80">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full tone-brand px-4 py-1.5 text-xs font-semibold border">
              <Activity className="h-3.5 w-3.5" />
              Live Dashboard
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Real-time visibility across{" "}
              <GradientText>your entire fleet</GradientText>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Workspace-scoped dashboards with live metrics, node status, event
              streams, and task lifecycle tracking.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative mx-auto max-w-5xl">
            {/* Glow */}
            <div className="absolute -inset-8 rounded-3xl bg-primary/5 blur-3xl" />

            {/* Dashboard Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-dashboard">
              <BorderBeam size={250} duration={12} delay={9} />
              {/* Window Chrome */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="ml-3 flex items-center gap-1.5 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground font-mono">
                    <Wifi className="h-3 w-3 text-emerald-400" />
                    app.noderax.com/w/production/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
                  {[
                    {
                      label: "Total Nodes",
                      value: "47",
                      change: "+3",
                      icon: HardDrive,
                      color: "text-primary",
                    },
                    {
                      label: "Avg CPU",
                      value: "23%",
                      change: "-2%",
                      icon: Cpu,
                      color: "text-emerald-400",
                    },
                    {
                      label: "Memory Used",
                      value: "64.2 GB",
                      change: "+1.4",
                      icon: MemoryStick,
                      color: "text-violet-400",
                    },
                    {
                      label: "Active Tasks",
                      value: "12",
                      change: "+5",
                      icon: TrendingUp,
                      color: "text-amber-400",
                    },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="rounded-xl border border-border bg-background/50 p-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon
                          className={`h-4 w-4 ${stat.color} opacity-70`}
                        />
                        <span className="text-xs text-emerald-400 font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-foreground flex items-center">
                        {stat.label === "Avg CPU" && (
                          <NumberTicker value={23} />
                        )}
                        {stat.label === "Total Nodes" && (
                          <NumberTicker value={47} />
                        )}
                        {stat.label === "Memory Used" && (
                          <><NumberTicker value={64.2} decimalPlaces={1} /><span className="ml-1">GB</span></>
                        )}
                        {stat.label === "Active Tasks" && (
                          <NumberTicker value={12} />
                        )}
                        {stat.label === "Avg CPU" && "%"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts & Nodes */}
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* Chart */}
                  <div className="lg:col-span-2 rounded-xl border border-border bg-background/50 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-foreground">
                        Fleet CPU Usage (24h)
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        Updated 2s ago
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-24">
                      {[
                        35, 42, 38, 45, 52, 48, 55, 42, 38, 35, 40, 45, 50, 48,
                        42, 38, 35, 32, 28, 25, 22, 20, 23, 28,
                      ].map((v, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t bg-primary/30"
                          initial={{ height: 0 }}
                          animate={{ height: `${v}%` }}
                          transition={{ delay: i * 0.04, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Node List */}
                  <div className="rounded-xl border border-border bg-background/50 p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      Active Nodes
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          name: "prod-api-01",
                          cpu: [12, 15, 13, 18, 14, 12, 16],
                          status: "online",
                        },
                        {
                          name: "prod-api-02",
                          cpu: [8, 10, 9, 12, 8, 7, 11],
                          status: "online",
                        },
                        {
                          name: "worker-01",
                          cpu: [45, 52, 48, 55, 50, 47, 53],
                          status: "online",
                        },
                        {
                          name: "staging-01",
                          cpu: [3, 5, 4, 6, 3, 2, 4],
                          status: "maintenance",
                        },
                      ].map((node) => (
                        <div
                          key={node.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${node.status === "online" ? "bg-emerald-400" : "bg-amber-400"}`}
                            />
                            <span className="text-xs font-medium text-foreground font-mono">
                              {node.name}
                            </span>
                          </div>
                          <MiniChart
                            values={node.cpu}
                            color={
                              node.status === "online" ? "#34d399" : "#fbbf24"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
