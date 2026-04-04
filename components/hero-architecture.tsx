"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Server, Globe, Database } from "lucide-react";

function useLiveStats(base: number, variance: number, intervalMs: number) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue(base + (Math.floor(Math.random() * variance * 2) - variance));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [base, variance, intervalMs]);

  return value;
}

const flowPaths = {
  webToCore: "M 120 116 L 360 116",
  coreToWeb: "M 360 124 L 120 124",
  coreToDb: "M 412 165 L 412 205",
  dbToCore: "M 420 205 L 420 165",
  coreToAgents: "M 470 116 L 710 116",
  agentsToCore: "M 710 124 L 470 124",
};

const signalPalette = {
  control: {
    fill: "#fed7aa",
    accent: "#f97316",
  },
  sync: {
    fill: "#fecaca",
    accent: "#ef4444",
  },
  storage: {
    fill: "#fde68a",
    accent: "#f59e0b",
  },
} as const;

type SvgFlowPacketProps = {
  fill: string;
  accent: string;
  delay?: string;
  duration: string;
  path: string;
  reduceMotion: boolean;
};

function SvgFlowPacket({
  fill,
  accent,
  delay = "0s",
  duration,
  path,
  reduceMotion,
}: SvgFlowPacketProps) {
  if (reduceMotion) {
    return null;
  }

  return (
    <g>
      <g filter="url(#glow-soft)">
        <rect x="-8" y="-3.5" width="16" height="7" rx="3.5" fill={fill}>
          <animate
            attributeName="opacity"
            values="0;0.95;0"
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
          />
          <animate
            attributeName="width"
            values="10;16;10"
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
          />
          <animateMotion
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
            path={path}
          />
        </rect>
        <rect
          x="-13"
          y="-2.1"
          width="4.2"
          height="4.2"
          rx="2.1"
          fill={accent}
          opacity="0.75"
        >
          <animate
            attributeName="opacity"
            values="0;0.8;0"
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
          />
          <animateMotion
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
            path={path}
          />
        </rect>
        <rect
          x="9.6"
          y="-2.1"
          width="4.2"
          height="4.2"
          rx="2.1"
          fill={accent}
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0;0.45;0"
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
          />
          <animateMotion
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
            path={path}
          />
        </rect>
      </g>
      <circle r="1.8" fill={accent} opacity="0.85">
        <animate
          attributeName="opacity"
          values="0;0.95;0"
          dur={duration}
          begin={delay}
          repeatCount="indefinite"
        />
        <animateMotion
          dur={duration}
          begin={delay}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
      <circle r="7" fill={fill} opacity="0.16" filter="url(#glow-soft)">
        <animate
          attributeName="opacity"
          values="0;0.24;0"
          dur={duration}
          begin={delay}
          repeatCount="indefinite"
        />
        <animateMotion
          dur={duration}
          begin={delay}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </g>
  );
}

export function HeroArchitecture() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const webUsers = useLiveStats(124, 15, 2000);
  const webReqs = useLiveStats(450, 80, 800);
  const coreLatency = useLiveStats(24, 8, 1000);
  const dbOps = useLiveStats(1520, 300, 1500);
  const agentAvgCpu = useLiveStats(12, 5, 2000);
  const agentPeakCpu = useLiveStats(34, 12, 1200);

  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 py-4 sm:px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-75 w-100 rounded-full bg-primary/20 blur-[120px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.1, 0.98, 1],
                  opacity: [0.38, 0.52, 0.34, 0.38],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 shadow-2xl glass-panel">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/5 opacity-60" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-14 bottom-0 h-px bg-linear-to-r from-transparent via-orange-300/25 to-transparent dark:via-orange-200/20" />
        <div className="pointer-events-none absolute left-0 top-14 h-24 w-px bg-linear-to-b from-transparent via-border/70 to-transparent" />
        <div className="pointer-events-none absolute right-0 bottom-14 h-24 w-px bg-linear-to-b from-transparent via-border/70 to-transparent" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 832 300"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <linearGradient id="beam-control" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="beam-sync" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fecaca" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="100%" stopColor="#fecaca" stopOpacity="0.14" />
            </linearGradient>

            <linearGradient id="beam-storage" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.12" />
            </linearGradient>

            <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={flowPaths.webToCore}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.webToCore}
            stroke="url(#beam-control)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="40 240"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              { "--anim-dur": "1.65s", "--anim-delay": "0s" } as CSSProperties
            }
          />

          <path
            d={flowPaths.coreToWeb}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.coreToWeb}
            stroke="url(#beam-sync)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="40 240"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              { "--anim-dur": "2s", "--anim-delay": "0.25s" } as CSSProperties
            }
          />

          <path
            d={flowPaths.coreToDb}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.coreToDb}
            stroke="url(#beam-storage)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="20 40"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              { "--anim-dur": "1.1s", "--anim-delay": "0s" } as CSSProperties
            }
          />

          <path
            d={flowPaths.dbToCore}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.dbToCore}
            stroke="url(#beam-control)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="20 40"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              { "--anim-dur": "1s", "--anim-delay": "0.3s" } as CSSProperties
            }
          />

          <path
            d={flowPaths.coreToAgents}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.coreToAgents}
            stroke="url(#beam-sync)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="40 240"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              {
                "--anim-dur": "1.55s",
                "--anim-delay": "0.15s",
              } as CSSProperties
            }
          />

          <path
            d={flowPaths.agentsToCore}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d={flowPaths.agentsToCore}
            stroke="url(#beam-control)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-soft)"
            strokeDasharray="40 240"
            strokeLinecap="round"
            className={shouldReduceMotion ? undefined : "animate-dash-forward"}
            style={
              { "--anim-dur": "1.9s", "--anim-delay": "0.45s" } as CSSProperties
            }
          />

          <SvgFlowPacket
            fill={signalPalette.control.fill}
            accent={signalPalette.control.accent}
            duration="1.7s"
            path={flowPaths.webToCore}
            reduceMotion={shouldReduceMotion}
          />
          <SvgFlowPacket
            fill={signalPalette.sync.fill}
            accent={signalPalette.sync.accent}
            delay="0.4s"
            duration="2s"
            path={flowPaths.coreToWeb}
            reduceMotion={shouldReduceMotion}
          />
          <SvgFlowPacket
            fill={signalPalette.storage.fill}
            accent={signalPalette.storage.accent}
            delay="0.1s"
            duration="1.1s"
            path={flowPaths.coreToDb}
            reduceMotion={shouldReduceMotion}
          />
          <SvgFlowPacket
            fill={signalPalette.control.fill}
            accent={signalPalette.control.accent}
            delay="0.3s"
            duration="1s"
            path={flowPaths.dbToCore}
            reduceMotion={shouldReduceMotion}
          />
          <SvgFlowPacket
            fill={signalPalette.sync.fill}
            accent={signalPalette.sync.accent}
            delay="0.15s"
            duration="1.55s"
            path={flowPaths.coreToAgents}
            reduceMotion={shouldReduceMotion}
          />
          <SvgFlowPacket
            fill={signalPalette.control.fill}
            accent={signalPalette.control.accent}
            delay="0.45s"
            duration="1.9s"
            path={flowPaths.agentsToCore}
            reduceMotion={shouldReduceMotion}
          />
        </svg>

        <div className="relative z-10 h-75 w-full">
          <div className="absolute left-[9.6%] top-[40%] -translate-x-1/2 -translate-y-1/2">
            <div className="z-20 flex flex-col items-center gap-3">
              <div className="absolute -top-12 flex flex-col items-center rounded-lg border border-border/50 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm whitespace-nowrap">
                <span className="text-[10px] font-mono text-muted-foreground">
                  active users:{" "}
                  <span className="font-bold text-foreground">{webUsers}</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  req/s:{" "}
                  <span className="font-bold text-primary">{webReqs}</span>
                </span>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]">
                <Globe className="h-7 w-7 text-primary" />
              </div>

              <div className="rounded bg-background/50 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur">
                Web Panel
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
            <div className="z-20 flex flex-col items-center gap-3">
              <div className="absolute -top-10 flex flex-col items-center rounded-lg border border-border/50 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm whitespace-nowrap">
                <span className="text-[10px] font-mono text-muted-foreground">
                  mesh latency:{" "}
                  <span className="font-bold text-primary">
                    {coreLatency}ms
                  </span>
                </span>
              </div>

              <div className="relative">
                {!shouldReduceMotion && (
                  <>
                    <motion.div
                      className="absolute -inset-4 rounded-[2rem] bg-[conic-gradient(from_180deg,rgba(249,115,22,0.26),rgba(239,68,68,0.06),rgba(245,158,11,0.22),rgba(249,115,22,0.26))] blur-md"
                      animate={{ rotate: [0, 360], scale: [0.96, 1.02, 0.96] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      className="absolute -inset-8 rounded-[2.4rem] border border-primary/20"
                      animate={{ scale: [0.92, 1.14], opacity: [0.22, 0] }}
                      transition={{
                        duration: 3.2,
                        delay: 0.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </>
                )}

                <div className="relative z-20 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.7rem] border border-primary/25 bg-[radial-gradient(circle_at_24%_18%,rgba(251,146,60,0.24),rgba(255,255,255,0.94)_45%,rgba(255,255,255,0.9)_72%)] shadow-[0_22px_48px_-24px_rgba(249,115,22,0.72)] dark:bg-[radial-gradient(circle_at_28%_18%,rgba(251,146,60,0.26),rgba(17,24,39,0.95)_45%,rgba(15,23,42,0.86)_100%)] dark:shadow-[0_22px_48px_-24px_rgba(249,115,22,0.58)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,146,60,0.1),transparent_42%,rgba(239,68,68,0.14))] dark:bg-[linear-gradient(135deg,rgba(251,146,60,0.14),transparent_42%,rgba(239,68,68,0.16))]" />
                  <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent" />
                  <div className="absolute inset-3 rounded-xl border border-primary/15 bg-white/70 dark:bg-black/15" />
                  <>
                    <Image
                      src="/logo.webp"
                      alt="Noderax Core"
                      width={128}
                      height={128}
                      className={`relative z-10 h-16 w-16 object-contain drop-shadow-[0_10px_14px_rgba(249,115,22,0.28)] dark:hidden ${
                        shouldReduceMotion ? "" : "animate-pulse-logo"
                      }`}
                    />
                    <Image
                      src="/logo-white.png"
                      alt="Noderax Core"
                      width={128}
                      height={128}
                      className={`relative z-10 hidden h-16 w-16 object-contain drop-shadow-[0_10px_18px_rgba(249,115,22,0.38)] dark:block ${
                        shouldReduceMotion ? "" : "animate-pulse-logo"
                      }`}
                    />
                  </>

                  {/* <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white shadow-glow">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-white ${
                        shouldReduceMotion ? "" : "animate-pulse"
                      }`}
                    />
                  </div> */}
                </div>
              </div>

              <div className="rounded bg-background/50 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-foreground backdrop-blur">
                Noderax Core
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2">
            <div className="z-20 flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-lg">
                <Database className="h-6 w-6 text-amber-500" />
              </div>

              <div className="absolute bottom-1/2 left-full ml-4 flex -translate-y-1/2 flex-col items-center rounded-lg border border-border/50 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm whitespace-nowrap">
                <span className="text-[10px] font-mono text-muted-foreground">
                  ops/s:{" "}
                  <span className="font-bold text-amber-500">{dbOps}</span>
                </span>
              </div>

              <div className="z-20 rounded bg-background/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur">
                Redis / PgSQL
              </div>
            </div>
          </div>

          <div className="absolute left-[90.4%] top-[40%] -translate-x-1/2 -translate-y-1/2">
            <div className="z-20 flex flex-col items-center gap-3">
              <div className="absolute -top-11 flex flex-col items-center rounded-lg border border-border/50 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm whitespace-nowrap">
                <span className="text-[10px] font-mono text-muted-foreground">
                  avg fleet cpu:{" "}
                  <span
                    className={
                      agentAvgCpu > 20
                        ? "font-bold text-amber-500"
                        : "font-bold text-primary"
                    }
                  >
                    {agentAvgCpu}%
                  </span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  peak cpu:{" "}
                  <span
                    className={
                      agentPeakCpu > 40
                        ? "font-bold text-red-500"
                        : "font-bold text-orange-500"
                    }
                  >
                    {agentPeakCpu}%
                  </span>
                </span>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]">
                <Server className="h-7 w-7 text-red-500" />
              </div>

              <div className="rounded bg-background/50 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur">
                Agent Nodes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
