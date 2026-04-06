"use client";

import Image from "next/image";
import { useEffect, useState, type HTMLAttributes } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity,
  BellRing,
  Boxes,
  CheckCircle2,
  CirclePlay,
  Clock3,
  FolderTree,
  LayoutDashboard,
  MonitorCog,
  RefreshCcw,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  TerminalSquare,
  Users2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewKey = "dashboard" | "nodes" | "tasks" | "updates" | "settings";

type DemoNode = {
  id: string;
  name: string;
  hostname: string;
  status: "online" | "degraded" | "maintenance";
  cpu: number;
  memory: number;
  rootProfile: string;
  terminal: string;
  routes: string;
  release: string;
};

type DemoTask = {
  id: string;
  label: string;
  status: "running" | "queued" | "failed" | "completed";
  target: string;
  time: string;
};

type DemoRolloutTarget = {
  label: string;
  status: "completed" | "running" | "pending";
  note: string;
};

const viewMeta: Record<ViewKey, { title: string; description: string }> = {
  dashboard: {
    title: "Dashboard",
    description: "Monitor node health, workload, and recent activity.",
  },
  nodes: {
    title: "Nodes",
    description: "Inspect connectivity, telemetry, terminal access, and root profiles.",
  },
  tasks: {
    title: "Tasks",
    description: "Track queued work, running executions, and scheduled operations.",
  },
  updates: {
    title: "Updates",
    description: "Review official tags, rollout waves, and recovery controls.",
  },
  settings: {
    title: "Settings",
    description: "Adjust workspace delivery, access, and operational defaults.",
  },
};

const navGroups: Array<{
  label: string;
  items: Array<{ key: ViewKey; label: string; icon: LucideIcon }>;
}> = [
  {
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { key: "nodes", label: "Nodes", icon: MonitorCog },
      { key: "tasks", label: "Tasks", icon: Workflow },
    ],
  },
  {
    label: "Platform",
    items: [
      { key: "updates", label: "Updates", icon: RefreshCcw },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

const nodes: DemoNode[] = [
  {
    id: "fra-web-01",
    name: "fra-web-01",
    hostname: "fra-web-01.internal",
    status: "online",
    cpu: 22,
    memory: 58,
    rootProfile: "Operational + terminal",
    terminal: "Reattach window 04m 21s",
    routes: "Email critical, Telegram warning",
    release: "v1.0.6 stable",
  },
  {
    id: "fra-api-02",
    name: "fra-api-02",
    hostname: "fra-api-02.internal",
    status: "online",
    cpu: 31,
    memory: 63,
    rootProfile: "Operational only",
    terminal: "Claim available",
    routes: "Workspace defaults",
    release: "v1.0.6 stable",
  },
  {
    id: "iad-worker-04",
    name: "iad-worker-04",
    hostname: "iad-worker-04.internal",
    status: "degraded",
    cpu: 67,
    memory: 72,
    rootProfile: "Task + terminal",
    terminal: "Transcript retained",
    routes: "Telegram critical only",
    release: "v1.0.5 canary",
  },
  {
    id: "lon-db-01",
    name: "lon-db-01",
    hostname: "lon-db-01.internal",
    status: "maintenance",
    cpu: 14,
    memory: 46,
    rootProfile: "Read-only operations",
    terminal: "Paused during maintenance",
    routes: "Email muted, Telegram critical",
    release: "v1.0.4 pinned",
  },
];

const taskRuns: DemoTask[] = [
  {
    id: "task-1",
    label: "nginx config verify",
    status: "running",
    target: "fra-web-01",
    time: "Started 42s ago",
  },
  {
    id: "task-2",
    label: "apt security patch",
    status: "queued",
    target: "fra-api-02",
    time: "Queued 2m ago",
  },
  {
    id: "task-3",
    label: "disk usage sweep",
    status: "completed",
    target: "iad-worker-04",
    time: "Finished 6m ago",
  },
  {
    id: "task-4",
    label: "kernel check",
    status: "failed",
    target: "lon-db-01",
    time: "Failed 11m ago",
  },
];

const rolloutTargets: DemoRolloutTarget[] = [
  { label: "Canary group", status: "completed", note: "4/4 nodes healthy" },
  { label: "Wave 01", status: "running", note: "12/18 nodes updated" },
  { label: "Wave 02", status: "pending", note: "Waiting for health gate" },
  { label: "Rollback lane", status: "pending", note: "Armed but unused" },
];

const dashboardBars = [24, 33, 29, 41, 37, 49, 44, 58, 51, 63, 57, 69];
const dashboardEvents = [
  "fra-web-01 reattached to live terminal session",
  "Scoped root profile synced to iad-worker-04",
  "Workspace Telegram critical route updated",
  "Official rollout resumed after health pass",
];

function useTicker<T>(values: T[], intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (values.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % values.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, values.length]);

  return values[index]!;
}

function DemoPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border border-white/8 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function StatusBadge({
  tone,
  children,
}: {
  tone:
    | "online"
    | "degraded"
    | "maintenance"
    | "running"
    | "queued"
    | "failed"
    | "completed"
    | "pending";
  children: React.ReactNode;
}) {
  const toneMap = {
    online: "border-emerald-400/20 bg-emerald-400/12 text-emerald-100",
    degraded: "border-amber-400/20 bg-amber-400/12 text-amber-100",
    maintenance: "border-slate-300/14 bg-white/8 text-white/75",
    running: "border-primary/20 bg-primary/12 text-primary-foreground",
    queued: "border-amber-400/20 bg-amber-400/12 text-amber-100",
    failed: "border-rose-400/20 bg-rose-400/12 text-rose-100",
    completed: "border-emerald-400/20 bg-emerald-400/12 text-emerald-100",
    pending: "border-white/12 bg-white/7 text-white/65",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em]",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <DemoPanel className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
            {label}
          </p>
          <div className="mt-3 text-[1.65rem] font-semibold tracking-tight text-white">
            {value}
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.045]">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </DemoPanel>
  );
}

function SidebarItem({
  item,
  active,
  onSelect,
}: {
  item: { key: ViewKey; label: string; icon: LucideIcon };
  active: boolean;
  onSelect: (key: ViewKey) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition-all",
        active
          ? "border-primary/28 bg-primary/14 text-white shadow-[0_10px_30px_-20px_rgba(255,98,71,0.7)]"
          : "border-transparent text-white/62 hover:border-white/8 hover:bg-white/[0.04] hover:text-white",
      )}
    >
      <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-white/45")} />
      <span className="truncate">{item.label}</span>
    </button>
  );
}

function DashboardScene({
  totalNodes,
  onlineNodes,
  runningTasks,
  queuedAlerts,
  shouldReduceMotion,
}: {
  totalNodes: number;
  onlineNodes: number;
  runningTasks: number;
  queuedAlerts: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="grid h-full gap-4 xl:grid-cols-[1.35fr_0.9fr]">
      <div className="grid min-h-0 gap-4">
        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
          <StatCard label="Node snapshot" value={totalNodes} icon={Boxes} />
          <StatCard label="Online snapshot" value={onlineNodes} icon={ServerCog} />
          <StatCard label="Running tasks" value={runningTasks} icon={CirclePlay} />
          <StatCard label="Queued alerts" value={queuedAlerts} icon={BellRing} />
        </div>

        <DemoPanel className="grid min-h-0 gap-4 p-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="min-h-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">Node telemetry board</p>
                <p className="mt-1 text-sm text-white/45">
                  The same dashboard window operators use for fleet snapshot scanning.
                </p>
              </div>
              <StatusBadge tone="online">Realtime connected</StatusBadge>
            </div>

            <div className="mt-5 flex h-36 items-end gap-2">
              {dashboardBars.map((bar, index) => (
                <div key={`bar-${index}`} className="flex h-full flex-1 items-end">
                  <motion.div
                    className="w-full rounded-t-[1rem] bg-gradient-to-t from-primary/25 via-primary/80 to-orange-300/90 shadow-[0_0_20px_rgba(255,98,71,0.22)]"
                    animate={
                      shouldReduceMotion
                        ? { height: `${bar}%` }
                        : {
                            height: [
                              `${Math.max(bar - 8, 20)}%`,
                              `${bar}%`,
                              `${Math.min(bar + 7, 96)}%`,
                              `${Math.max(bar - 3, 22)}%`,
                            ],
                          }
                    }
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      delay: index * 0.12,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {nodes.slice(0, 4).map((node) => (
                <div
                  key={node.id}
                  className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{node.name}</p>
                      <p className="text-xs text-white/42">{node.hostname}</p>
                    </div>
                    <StatusBadge tone={node.status}>{node.status}</StatusBadge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/55">
                    <span>CPU {node.cpu}%</span>
                    <span>MEM {node.memory}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-h-0 gap-4">
            <DemoPanel className="p-4">
              <p className="text-sm font-medium text-white">Recent events</p>
              <div className="mt-4 space-y-3">
                {dashboardEvents.map((event, index) => (
                  <div
                    key={event}
                    className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <motion.span
                        className="mt-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(255,98,71,0.8)]"
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { opacity: [0.45, 1, 0.45], scale: [0.95, 1.2, 0.95] }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: index * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                      <div>
                        <p className="text-sm leading-6 text-white/78">{event}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/34">
                          workspace activity
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoPanel>

            <DemoPanel className="grid gap-3 p-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/7 bg-black/20 p-4">
                <p className="text-sm font-medium text-white">Root profiles</p>
                <p className="mt-2 text-sm text-white/46">
                  Operational, task, and terminal scope stay visible in one place.
                </p>
                <div className="mt-4 space-y-2 text-xs text-white/62">
                  <div className="flex items-center justify-between">
                    <span>Desired vs applied</span>
                    <span className="text-emerald-300">100% synced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Terminal claims</span>
                    <span>5-minute reattach</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/7 bg-black/20 p-4">
                <p className="text-sm font-medium text-white">Delivery routes</p>
                <p className="mt-2 text-sm text-white/46">
                  Email and Telegram automation exposed at workspace and node level.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBadge tone="completed">Email critical</StatusBadge>
                  <StatusBadge tone="running">Telegram warning</StatusBadge>
                </div>
              </div>
            </DemoPanel>
          </div>
        </DemoPanel>
      </div>

      <div className="grid min-h-0 gap-4">
        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Workspace pulse</p>
          <div className="mt-4 grid gap-3">
            {[
              "Root-aware tasks and browser terminals",
              "Official tagged releases through one updates center",
              "Invite-first workspace roles and audit visibility",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span className="text-sm leading-6 text-white/74">{item}</span>
              </div>
            ))}
          </div>
        </DemoPanel>

        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Release lane</p>
          <div className="mt-4 rounded-2xl border border-white/7 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-white/66">v1.0.6 stable</span>
              <span className="text-sm font-semibold text-white">72%</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-orange-400 to-orange-300"
                animate={{ width: "72%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-4 space-y-2">
              {rolloutTargets.slice(0, 3).map((target) => (
                <div
                  key={target.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/7 bg-white/[0.03] px-3 py-2.5"
                >
                  <span className="text-sm text-white/74">{target.label}</span>
                  <StatusBadge tone={target.status}>{target.status}</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}

function NodesScene({
  selectedNode,
  setSelectedNodeId,
}: {
  selectedNode: DemoNode;
  setSelectedNodeId: (value: string) => void;
}) {
  return (
    <div className="grid h-full gap-4 xl:grid-cols-[0.86fr_1.14fr]">
      <DemoPanel className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-white">Node list</p>
            <p className="mt-1 text-sm text-white/45">
              Fleet nodes with status, telemetry, and route visibility.
            </p>
          </div>
          <StatusBadge tone="online">4 nodes loaded</StatusBadge>
        </div>

        <div className="mt-4 space-y-3">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(node.id)}
              className={cn(
                "w-full rounded-[1.2rem] border px-3 py-3 text-left transition-all",
                selectedNode.id === node.id
                  ? "border-primary/30 bg-primary/12"
                  : "border-white/7 bg-black/20 hover:border-white/12 hover:bg-white/[0.04]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{node.name}</p>
                  <p className="mt-1 text-xs text-white/42">{node.hostname}</p>
                </div>
                <StatusBadge tone={node.status}>{node.status}</StatusBadge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/58">
                <span>CPU {node.cpu}%</span>
                <span>MEM {node.memory}%</span>
              </div>
            </button>
          ))}
        </div>
      </DemoPanel>

      <div className="grid gap-4">
        <DemoPanel className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold tracking-tight text-white">
                  {selectedNode.name}
                </p>
                <StatusBadge tone={selectedNode.status}>{selectedNode.status}</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-white/45">{selectedNode.hostname}</p>
            </div>
            <StatusBadge tone="completed">{selectedNode.release}</StatusBadge>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <StatCard label="CPU" value={`${selectedNode.cpu}%`} icon={Activity} />
            <StatCard label="Memory" value={`${selectedNode.memory}%`} icon={Boxes} />
            <StatCard label="Terminal" value="Ready" icon={TerminalSquare} />
          </div>
        </DemoPanel>

        <div className="grid gap-4 md:grid-cols-3">
          <DemoPanel className="p-4">
            <p className="text-sm font-medium text-white">Root profile</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {selectedNode.rootProfile}
            </p>
          </DemoPanel>
          <DemoPanel className="p-4">
            <p className="text-sm font-medium text-white">Terminal state</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {selectedNode.terminal}
            </p>
          </DemoPanel>
          <DemoPanel className="p-4">
            <p className="text-sm font-medium text-white">Delivery routes</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {selectedNode.routes}
            </p>
          </DemoPanel>
        </div>

        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Node summary</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "Telemetry, tasks, and browser terminal are surfaced from the same node detail view.",
              "Root-aware actions stay disabled until desired and applied profiles converge.",
              "Workspace delivery overrides remain visible beside node connectivity.",
              "Official release state sits next to runtime metrics instead of a separate tool.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3 text-sm leading-6 text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}

function TasksScene({
  runningTasks,
  queuedTasks,
}: {
  runningTasks: number;
  queuedTasks: number;
}) {
  return (
    <div className="grid h-full gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="grid min-h-0 gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <StatCard label="Running" value={runningTasks} icon={CirclePlay} />
          <StatCard label="Queued" value={queuedTasks} icon={Clock3} />
          <StatCard label="Schedules" value={8} icon={Workflow} />
        </div>

        <DemoPanel className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Recent task runs</p>
              <p className="mt-1 text-sm text-white/45">
                Queue, run, and result state share the same task surface.
              </p>
            </div>
            <StatusBadge tone="running">Live queue</StatusBadge>
          </div>

          <div className="mt-4 space-y-3">
            {taskRuns.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{task.label}</p>
                  <p className="mt-1 text-xs text-white/42">
                    {task.target} · {task.time}
                  </p>
                </div>
                <StatusBadge tone={task.status}>{task.status}</StatusBadge>
              </div>
            ))}
          </div>
        </DemoPanel>
      </div>

      <div className="grid gap-4">
        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Scheduled tasks</p>
          <div className="mt-4 space-y-3">
            {[
              "hourly disk sweep · 12 nodes · next run 08:00 UTC",
              "nginx config verify · 6 nodes · next run 09:30 UTC",
              "kernel compliance check · 4 nodes · next run 12:00 UTC",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3 text-sm text-white/74"
              >
                {item}
              </div>
            ))}
          </div>
        </DemoPanel>

        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Guarded execution</p>
          <div className="mt-4 grid gap-3">
            {[
              "Task and shell surfaces honor the node's applied root profile.",
              "Queued work remains visible even if realtime degrades.",
              "Browser terminals keep a five-minute reattach lane after exit.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm leading-6 text-white/72">{item}</span>
              </div>
            ))}
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}

function UpdatesScene({ rolloutProgress }: { rolloutProgress: number }) {
  return (
    <div className="grid h-full gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <DemoPanel className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">Official releases</p>
            <p className="mt-1 text-sm text-white/45">
              Tagged agent updates move through monitored rollout waves.
            </p>
          </div>
          <StatusBadge tone="completed">v1.0.6 stable</StatusBadge>
        </div>

        <div className="mt-5 rounded-[1.2rem] border border-white/7 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/66">Current rollout progress</span>
            <span className="text-sm font-semibold text-white">{rolloutProgress}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-orange-400 to-orange-300"
              animate={{ width: `${rolloutProgress}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <div className="mt-4 grid gap-3">
            {rolloutTargets.map((target) => (
              <div
                key={target.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/7 bg-white/[0.03] px-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{target.label}</p>
                  <p className="mt-1 text-xs text-white/42">{target.note}</p>
                </div>
                <StatusBadge tone={target.status}>{target.status}</StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </DemoPanel>

      <div className="grid gap-4">
        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Release center</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <StatCard label="Eligible nodes" value={34} icon={MonitorCog} />
            <StatCard label="Retry ready" value={6} icon={RefreshCcw} />
          </div>
        </DemoPanel>

        <DemoPanel className="p-4">
          <p className="text-sm font-medium text-white">Recovery controls</p>
          <div className="mt-4 space-y-3">
            {[
              "Retry, skip, resume, cancel, and rollback stay in one updates center.",
              "Rollout targets preserve per-node state and operator notes.",
              "Only official tagged builds appear in the release surface.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3 text-sm leading-6 text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}

function SettingsScene() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-2">
      <DemoPanel className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-white">Workspace delivery</p>
            <p className="mt-1 text-sm text-white/45">
              Email and Telegram automation live beside workspace metadata.
            </p>
          </div>
          <StatusBadge tone="completed">Production</StatusBadge>
        </div>

        <div className="mt-4 space-y-3">
          {[
            ["Automation email", "Enabled"],
            ["Automation Telegram", "Enabled"],
            ["Default timezone", "Europe/Istanbul"],
            ["Archive mode", "Read-only off"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
            >
              <span className="text-sm text-white/74">{label}</span>
              <span className="text-xs font-medium text-white/46">{value}</span>
            </div>
          ))}
        </div>
      </DemoPanel>

      <DemoPanel className="p-4">
        <p className="text-sm font-medium text-white">Access and team structure</p>
        <div className="mt-4 grid gap-3">
          {[
            {
              icon: Users2,
              title: "Workspace roles",
              body: "Owner, admin, member, and viewer roles stay scoped to the current workspace.",
            },
            {
              icon: FolderTree,
              title: "Teams",
              body: "Nodes and members can be grouped without leaving the operational workspace.",
            },
            {
              icon: ShieldCheck,
              title: "Root profiles",
              body: "Desired and applied root scopes remain visible before privileged actions unlock.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/7 bg-black/20 px-3 py-3"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/72">{item.body}</p>
            </div>
          ))}
        </div>
      </DemoPanel>
    </div>
  );
}

export function HeroArchitecture() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0]!.id);
  const totalNodes = useTicker([136, 139, 141, 138], 2600);
  const onlineNodes = useTicker([129, 132, 131, 133], 2200);
  const runningTasks = useTicker([12, 14, 13, 15], 2400);
  const queuedTasks = useTicker([3, 4, 2, 5], 2500);
  const queuedAlerts = useTicker([7, 9, 8, 10], 2900);
  const rolloutProgress = useTicker([64, 69, 73, 71], 3200);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0]!;

  return (
    <div className="relative h-[38rem] overflow-hidden rounded-[2rem] bg-[#09090c] text-white sm:h-[39rem] lg:h-[34rem]">
      <div className="absolute inset-0 data-grid opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_82%_8%,rgba(255,104,64,0.16),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(255,132,54,0.14),transparent_28%)]" />

      <motion.div
        className="absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/16 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.14, 0.28, 0.14], scale: [0.95, 1.08, 0.97] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-orange-400/12 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 0.96] }
        }
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, 420, 0], opacity: [0, 0.72, 0] }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex h-14 items-center justify-between gap-4 border-b border-white/8 px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/85" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/85" />
            </div>
            <div className="hidden min-w-0 items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/55 sm:flex">
              <Search className="h-3.5 w-3.5 text-white/34" />
              <span className="truncate">app.noderax.com/w/production/{activeView}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge tone="online">Realtime live</StatusBadge>
            <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-2 py-1 sm:flex">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-primary/10">
                <Image
                  src="/logo-white.png"
                  alt="Noderax"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="pr-1 text-[11px] font-medium text-white/58">
                production workspace
              </span>
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[4.75rem_1fr] sm:grid-cols-[5.5rem_1fr] lg:grid-cols-[15.5rem_1fr]">
          <aside className="border-r border-white/8 bg-black/18 px-2 py-4 lg:px-3">
            <div className="mb-4 hidden items-center gap-3 rounded-[1.1rem] border border-white/8 bg-white/[0.04] px-3 py-3 lg:flex">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/8 bg-primary/8">
                <Image
                  src="/logo-white.png"
                  alt="Noderax"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-white">Noderax</p>
                <p className="text-xs text-white/42">Operations center</p>
              </div>
            </div>

            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-1.5">
                  <p className="hidden px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28 lg:block">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarItem
                        key={item.key}
                        item={item}
                        active={activeView === item.key}
                        onSelect={setActiveView}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col">
            <div className="border-b border-white/8 px-4 py-4 lg:px-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/32">
                    demo surface
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-white lg:text-2xl">
                    {viewMeta[activeView].title}
                  </h3>
                  <p className="mt-1 text-sm text-white/48">
                    {viewMeta[activeView].description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone="completed">Workspace admin</StatusBadge>
                  <StatusBadge tone="running">Root-aware controls</StatusBadge>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 lg:px-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeView}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  {activeView === "dashboard" ? (
                    <DashboardScene
                      totalNodes={totalNodes}
                      onlineNodes={onlineNodes}
                      runningTasks={runningTasks}
                      queuedAlerts={queuedAlerts}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ) : null}

                  {activeView === "nodes" ? (
                    <NodesScene
                      selectedNode={selectedNode}
                      setSelectedNodeId={setSelectedNodeId}
                    />
                  ) : null}

                  {activeView === "tasks" ? (
                    <TasksScene runningTasks={runningTasks} queuedTasks={queuedTasks} />
                  ) : null}

                  {activeView === "updates" ? (
                    <UpdatesScene rolloutProgress={rolloutProgress} />
                  ) : null}

                  {activeView === "settings" ? <SettingsScene /> : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
