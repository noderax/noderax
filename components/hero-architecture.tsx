"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  BellRing,
  Boxes,
  CircleCheckBig,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  ClipboardList,
  Cpu,
  ExternalLink,
  FolderTree,
  HardDrive,
  LayoutDashboard,
  MemoryStick,
  MonitorCog,
  MoreVertical,
  RefreshCcw,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  SquareTerminal,
  Sun,
  Thermometer,
  UserRound,
  Users,
  Users2,
  WifiOff,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewKey =
  | "dashboard"
  | "nodes"
  | "tasks"
  | "events"
  | "members"
  | "teams"
  | "audit"
  | "settings"
  | "workspaces"
  | "users"
  | "updates"
  | "platform-audit"
  | "platform-settings";

type SidebarItem = {
  key: ViewKey;
  label: string;
  icon: LucideIcon;
};

type TelemetryNode = {
  name: string;
  host: string;
  status: "online";
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    temp: number;
  };
  runtime: [string, string];
  lastSeen: string;
  profile: string;
};

type SurfaceStatCard = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "brand" | "success" | "warning" | "danger";
};

const sidebarGroups: Array<{ label: string; items: SidebarItem[] }> = [
  {
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { key: "nodes", label: "Nodes", icon: MonitorCog },
      { key: "tasks", label: "Tasks", icon: Workflow },
      { key: "events", label: "Events", icon: BellRing },
    ],
  },
  {
    label: "Workspace",
    items: [
      { key: "members", label: "Members", icon: UserRound },
      { key: "teams", label: "Teams", icon: Users2 },
      { key: "audit", label: "Audit", icon: ClipboardList },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
  {
    label: "Platform",
    items: [
      { key: "workspaces", label: "Workspaces", icon: FolderTree },
      { key: "users", label: "Users", icon: Users },
      { key: "updates", label: "Updates", icon: RefreshCcw },
      { key: "platform-audit", label: "Platform Audit", icon: ClipboardList },
      { key: "platform-settings", label: "Platform Settings", icon: ServerCog },
    ],
  },
];

const statCards: SurfaceStatCard[] = [
  {
    label: "Node snapshot",
    value: "2",
    description: "Nodes currently loaded into this dashboard snapshot window.",
    icon: Boxes,
    tone: "brand",
  },
  {
    label: "Online snapshot",
    value: "2",
    description: "Loaded snapshot nodes actively reporting recent state.",
    icon: ServerCog,
    tone: "success",
  },
  {
    label: "Task snapshot",
    value: "0",
    description: "Running tasks currently present in the dashboard task window.",
    icon: CirclePlay,
    tone: "warning",
  },
  {
    label: "Failed snapshot",
    value: "29",
    description: "Failed tasks currently visible in the dashboard snapshot.",
    icon: AlertTriangle,
    tone: "danger",
  },
];

const nodeStatCards: SurfaceStatCard[] = [
  {
    label: "Visible nodes",
    value: "2",
    description: "Nodes currently loaded in this inventory page.",
    icon: Boxes,
    tone: "brand",
  },
  {
    label: "Online",
    value: "2",
    description: "Visible nodes with healthy status and recent activity.",
    icon: ShieldCheck,
    tone: "success",
  },
  {
    label: "Offline",
    value: "0",
    description: "Visible nodes that need follow-up or heartbeat recovery.",
    icon: WifiOff,
    tone: "danger",
  },
  {
    label: "Avg CPU load",
    value: "2%",
    description: "Average CPU across visible nodes with telemetry in this page.",
    icon: Cpu,
    tone: "warning",
  },
];

const taskStatCards: SurfaceStatCard[] = [
  {
    label: "Queued",
    value: "0",
    description: "Queued tasks visible in the current server-side page.",
    icon: Boxes,
    tone: "brand",
  },
  {
    label: "Running",
    value: "0",
    description: "Active executions currently loaded in this page.",
    icon: CirclePlay,
    tone: "warning",
  },
  {
    label: "Successful",
    value: "22",
    description: "Loaded tasks that completed with a successful outcome.",
    icon: CircleCheckBig,
    tone: "success",
  },
  {
    label: "Failed",
    value: "3",
    description: "Loaded tasks that still need review or retry.",
    icon: AlertTriangle,
    tone: "danger",
  },
];

const nodePages: TelemetryNode[][] = [
  [
    {
      name: "Noderax Server",
      host: "ip-172-26-2-73",
      status: "online",
      metrics: { cpu: 3, memory: 67, disk: 33, temp: 0 },
      runtime: ["ubuntu", "amd64"],
      lastSeen: "16 minutes ago",
      profile: "Telemetry ready",
    },
    {
      name: "RaspberryPi",
      host: "pi-home",
      status: "online",
      metrics: { cpu: 2, memory: 29, disk: 3, temp: 54.3 },
      runtime: ["ubuntu", "arm64"],
      lastSeen: "16 minutes ago",
      profile: "Telemetry ready",
    },
  ],
  [
    {
      name: "fra-api-02",
      host: "fra-api-02.internal",
      status: "online",
      metrics: { cpu: 18, memory: 58, disk: 29, temp: 46.2 },
      runtime: ["ubuntu", "amd64"],
      lastSeen: "22 seconds ago",
      profile: "Telemetry ready",
    },
    {
      name: "iad-worker-04",
      host: "iad-worker-04.internal",
      status: "online",
      metrics: { cpu: 41, memory: 62, disk: 37, temp: 51.8 },
      runtime: ["ubuntu", "arm64"],
      lastSeen: "28 seconds ago",
      profile: "Telemetry ready",
    },
  ],
];

const events = [
  {
    severity: "critical",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on ip-172-26-2-73 reached 97.5%",
    time: "12 minutes ago",
    type: "high.cpu",
    createdAt: "7 Nis 2026 22:47:17",
  },
  {
    severity: "warning",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on pi-home reached 95.0%",
    time: "2 hours ago",
    type: "high.cpu",
    createdAt: "7 Nis 2026 21:06:55",
  },
  {
    severity: "warning",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on ip-172-26-2-73 reached 94.9%",
    time: "6 hours ago",
    type: "high.cpu",
    createdAt: "7 Nis 2026 17:07:51",
  },
  {
    severity: "warning",
    title: "Node Root Access Updated",
    source: "Node monitor",
    message: "Node ip-172-26-2-73 root access profile was disabled.",
    time: "1 hour ago",
    type: "node.root-access.updated",
    createdAt: "7 Nis 2026 00:23:11",
  },
  {
    severity: "warning",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on pi-home reached 91.4%",
    time: "7 hours ago",
    type: "high.cpu",
    createdAt: "7 Nis 2026 16:23:37",
  },
  {
    severity: "critical",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on ip-172-26-2-73 reached 97.6%",
    time: "8 hours ago",
    type: "high.cpu",
    createdAt: "7 Nis 2026 14:40:03",
  },
  {
    severity: "warning",
    title: "Node Root Access Updated",
    source: "Node monitor",
    message: "Node pi-home root access profile set to operational.",
    time: "9 hours ago",
    type: "node.root-access.updated",
    createdAt: "7 Nis 2026 00:23:00",
  },
  {
    severity: "warning",
    title: "Node Root Access Updated",
    source: "Node monitor",
    message: "Node pi-home root access profile set to operational_terminal.",
    time: "10 hours ago",
    type: "node.root-access.updated",
    createdAt: "7 Nis 2026 00:21:34",
  },
  {
    severity: "critical",
    title: "High Cpu",
    source: "Metrics pipeline",
    message: "CPU usage on ip-172-26-2-73 reached 100.0%",
    time: "1 day ago",
    type: "high.cpu",
    createdAt: "6 Nis 2026 23:45:49",
  },
] as const;

const activityRows = [
  {
    name: "Noderax Server",
    host: "ip-172-26-2-73",
    status: "online",
    cpu: "3%",
    memory: "67%",
    lastSeen: "16 minutes ago",
  },
  {
    name: "RaspberryPi",
    host: "pi-home",
    status: "online",
    cpu: "2%",
    memory: "29%",
    lastSeen: "16 minutes ago",
  },
] as const;

const nodeInventoryRows = [
  {
    name: "Noderax Server",
    host: "ip-172-26-2-73",
    status: "online",
    team: "Unassigned",
    lastSeen: "8 seconds ago",
    os: "ubuntu / amd64",
    agent: "1.0.6",
    cpu: "3%",
    temp: "0.0°C",
  },
  {
    name: "RaspberryPi",
    host: "pi-home",
    status: "online",
    team: "Unassigned",
    lastSeen: "8 seconds ago",
    os: "ubuntu / arm64",
    agent: "1.0.6",
    cpu: "0%",
    temp: "54.9°C",
  },
] as const;

const taskRows = [
  {
    status: "success",
    name: "PackageList",
    subtitle: "packageList",
    node: "Noderax Server",
    created: "1 day ago",
    output:
      "Desired=Unknown/Install/Remove/Purge/Hold | Status=Not/Inst/Conf-files/Unpacked/half-conf/Half-inst/trig-aWait/Trig-pend | /Err?=(none)/Reinst-...",
  },
  {
    status: "success",
    name: "PackageList",
    subtitle: "packageList",
    node: "Noderax Server",
    created: "1 day ago",
    output:
      "Desired=Unknown/Install/Remove/Purge/Hold | Status=Not/Inst/Conf-files/Unpacked/half-conf/Half-inst/trig-aWait/Trig-pend | /Err?=(none)/Reinst-...",
  },
  {
    status: "success",
    name: "PackageList",
    subtitle: "packageList",
    node: "Noderax Server",
    created: "1 day ago",
    output:
      "Desired=Unknown/Install/Remove/Purge/Hold | Status=Not/Inst/Conf-files/Unpacked/half-conf/Half-inst/trig-aWait/Trig-pend | /Err?=(none)/Reinst-...",
  },
  {
    status: "success",
    name: "Agent Update",
    subtitle: "agent.update",
    node: "Noderax Server",
    created: "1 day ago",
    output: "->->->->-> reconnecting release lane ->->->->->",
  },
  {
    status: "success",
    name: "PackageList",
    subtitle: "packageList",
    node: "RaspberryPi",
    created: "1 day ago",
    output:
      "Desired=Unknown/Install/Remove/Purge/Hold | Status=Not/Inst/Conf-files/Unpacked/half-conf/Half-inst/trig-aWait/Trig-pend | /Err?=(none)/Reinst-...",
  },
  {
    status: "success",
    name: "Agent Update",
    subtitle: "agent.update",
    node: "RaspberryPi",
    created: "1 day ago",
    output: "^^^^^^^^ stable agent promoted 1.0.6.",
  },
  {
    status: "success",
    name: "Agent Update",
    subtitle: "agent.update",
    node: "Unknown node",
    created: "1 day ago",
    output: "Agent reconnect confirmed 1.0.6.",
  },
  {
    status: "success",
    name: "PackageList",
    subtitle: "packageList",
    node: "Unknown node",
    created: "2 days ago",
    output:
      "Desired=Unknown/Install/Remove/Purge/Hold | Status=Not/Inst/Conf-files/Unpacked/half-conf/Half-inst/trig-aWait/Trig-pend | /Err?=(none)/Reinst-...",
  },
] as const;

const metricRows = [
  { label: "CPU", key: "cpu", icon: Cpu, tone: "bg-[#ff4f45]" },
  { label: "Memory", key: "memory", icon: MemoryStick, tone: "bg-[#58d68d]" },
  { label: "Disk", key: "disk", icon: HardDrive, tone: "bg-[#f5b14c]" },
  { label: "Temp", key: "temp", icon: Thermometer, tone: "bg-[#ff9b7a]" },
] as const;

const summaryCopy: Record<
  Exclude<ViewKey, "dashboard">,
  { title: string; description: string; bullets: string[] }
> = {
  nodes: {
    title: "Nodes",
    description: "Inspect node connectivity, telemetry, and runtime state.",
    bullets: [
      "Per-node telemetry, package state, and live terminal entry points",
      "Desired and applied root profiles stay visible before actions unlock",
      "Delivery overrides appear next to connectivity and health data",
    ],
  },
  tasks: {
    title: "Tasks",
    description: "Track executions, outcomes, and live operational work.",
    bullets: [
      "Queued, running, failed, and completed executions in one surface",
      "Scheduled tasks reuse the same guarded execution model",
      "Browser terminals and shell work stay tied to node policy",
    ],
  },
  events: {
    title: "Events",
    description: "Review alerts, warnings, and platform event history.",
    bullets: [
      "Severity-labeled event feed with node and task source context",
      "Recency-ordered stream for alert triage",
      "Direct drill-down to nodes, tasks, and audit surfaces",
    ],
  },
  members: {
    title: "Members",
    description: "Manage workspace access and role assignments.",
    bullets: [
      "Owner, admin, member, and viewer roles",
      "Invite-first workspace membership flow",
      "Membership changes show up in audit history",
    ],
  },
  teams: {
    title: "Teams",
    description: "Group members and node ownership inside the workspace.",
    bullets: [
      "Team-linked nodes and shared operational responsibility",
      "Works with workspace roles instead of replacing them",
      "Useful for regional or service-based fleet slices",
    ],
  },
  audit: {
    title: "Audit",
    description: "Inspect append-only admin and security actions.",
    bullets: [
      "Platform and workspace audit surfaces",
      "Root profile, settings, member, and rollout actions tracked",
      "Supports operational review without leaving the control plane",
    ],
  },
  settings: {
    title: "Settings",
    description: "Configure workspace behavior and operational defaults.",
    bullets: [
      "Timezone, workspace metadata, and automation routing",
      "Email and Telegram delivery preferences",
      "Archived workspaces remain readable while mutations pause",
    ],
  },
  workspaces: {
    title: "Workspaces",
    description: "Create and manage isolated operational boundaries.",
    bullets: [
      "Default workspace fallback and archive support",
      "Search across nodes, tasks, schedules, members, and teams",
      "Platform admins span installations while workspaces stay isolated",
    ],
  },
  users: {
    title: "Users",
    description: "Manage operator accounts and global platform roles.",
    bullets: [
      "Platform-admin aware access control",
      "Ties into workspace membership rather than duplicating it",
      "Supports operational governance across environments",
    ],
  },
  updates: {
    title: "Updates",
    description: "Control official tagged agent releases and installer-managed control-plane updates.",
    bullets: [
      "Only official agent tags and official control-plane builds appear in the updates center",
      "Platform admins can stage downloads, then explicitly apply prepared control-plane builds",
      "Per-target rollout and prepared-release state stay visible during execution",
    ],
  },
  "platform-audit": {
    title: "Platform Audit",
    description: "Cross-workspace administrative activity and review trail.",
    bullets: [
      "Platform-level changes separated from workspace audit",
      "Useful for installation-wide governance",
      "Preserves recent admin activity in one surface",
    ],
  },
  "platform-settings": {
    title: "Platform Settings",
    description: "Adjust installation-wide defaults and controls.",
    bullets: [
      "Global settings beyond workspace scope",
      "Supports operator governance at platform level",
      "Keeps install-wide behavior separate from fleet operations",
    ],
  },
};

function toneClasses(tone: "brand" | "success" | "warning" | "danger") {
  switch (tone) {
    case "brand":
      return "border-primary/18 bg-primary/10 text-primary";
    case "success":
      return "border-emerald-400/18 bg-emerald-400/10 text-emerald-300";
    case "warning":
      return "border-amber-400/18 bg-amber-400/10 text-amber-300";
    case "danger":
      return "border-rose-400/18 bg-rose-400/10 text-rose-300";
  }
}

function eventSeverityClasses(severity: "warning" | "critical") {
  return severity === "critical"
    ? "border-rose-400/18 bg-rose-400/10 text-rose-300"
    : "border-amber-400/18 bg-amber-400/10 text-amber-300";
}

function taskStatusClasses(status: "success" | "running" | "queued" | "failed") {
  switch (status) {
    case "success":
      return "border-emerald-400/16 bg-emerald-400/8 text-emerald-300";
    case "running":
      return "border-amber-400/18 bg-amber-400/10 text-amber-300";
    case "queued":
      return "border-primary/18 bg-primary/10 text-primary";
    case "failed":
      return "border-rose-400/18 bg-rose-400/10 text-rose-300";
  }
}

function SurfaceCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-white/7 bg-[#121214] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SmallBadge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function ControlPill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 text-[0.82rem] text-white/62",
        className,
      )}
    >
      <span>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 text-white/34" />
    </button>
  );
}

function TableActionButton({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "danger" | "primary";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition-colors",
        tone === "default" &&
          "border-white/8 bg-white/[0.03] text-white/78 hover:bg-white/[0.06]",
        tone === "danger" &&
          "border-primary/35 bg-primary/12 text-primary hover:bg-primary/18",
        tone === "primary" &&
          "border-primary/25 bg-primary text-white hover:bg-primary/90",
      )}
    >
      {children}
    </button>
  );
}

function SidebarLink({
  item,
  active,
  onSelect,
}: {
  item: SidebarItem;
  active: boolean;
  onSelect: (value: ViewKey) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left text-[0.84rem] transition-all",
        active
          ? "border-primary/28 bg-primary/13 text-primary"
          : "border-transparent text-white/68 hover:border-white/8 hover:bg-white/[0.03] hover:text-white",
      )}
    >
      <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-white/42")} />
      <span className="truncate">{item.label}</span>
      {item.key === "tasks" ? (
        <ChevronDown className="ml-auto h-4 w-4 text-white/36" />
      ) : null}
    </button>
  );
}

function SnapshotCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: SurfaceStatCard) {
  return (
    <SurfaceCard className="p-3.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">
            {label}
          </p>
          <p className="mt-2.5 text-[1.9rem] font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-2.5 max-w-[17rem] text-[0.82rem] leading-6 text-white/46">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            toneClasses(tone),
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </SurfaceCard>
  );
}

function TelemetryCard({
  node,
  shouldReduceMotion,
}: {
  node: TelemetryNode;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="h-full max-w-[17.5rem] rounded-[1.35rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(22,22,24,1),rgba(15,15,17,1))] p-2.5 shadow-[inset_0_0_0_1px_rgba(255,98,71,0.14)]">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/18 bg-primary/10 text-primary">
              <ServerCog className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5447]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#58d68d]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5b14c]" />
                <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                  Node
                </span>
              </div>
              <p className="truncate text-[0.96rem] font-semibold tracking-tight text-white">
                {node.name}
              </p>
              <p className="truncate text-xs text-white/42">{node.host}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
              <MoreVertical className="h-4 w-4 text-white/50" />
            </div>
            <SmallBadge className="border-emerald-400/16 bg-emerald-400/8 text-emerald-300">
              ONLINE
            </SmallBadge>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-white/8 bg-[#0d0d0f] p-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.span
                className="h-3.5 w-3.5 rounded-full bg-primary/18 p-[3px]"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { boxShadow: ["0 0 0 rgba(255,98,71,0)", "0 0 14px rgba(255,98,71,0.45)", "0 0 0 rgba(255,98,71,0)"] }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="block h-full w-full rounded-full bg-primary" />
              </motion.span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                Resource snapshot
              </p>
            </div>
            <p className="text-xs font-medium text-white/78">Latest sample</p>
          </div>

          <div className="mt-2.5 grid gap-1.5">
            {metricRows.map((metric) => {
              const MetricIcon = metric.icon;
              const value = node.metrics[metric.key];

              return (
                <div
                  key={metric.key}
                  className="rounded-xl border border-white/7 bg-[#111113] px-2.5 py-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MetricIcon className="h-3.5 w-3.5 text-white/46" />
                      <span className="text-xs font-medium text-white/78">
                        {metric.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-white/46">
                      {metric.key === "temp" ? `${value} °C` : `${value}%`}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      className={cn("h-full rounded-full", metric.tone)}
                      animate={{ width: `${Math.max(4, Math.min(100, value))}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-1.5 sm:grid-cols-2">
          <div className="rounded-xl border border-white/7 bg-[#0f0f11] px-2.5 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
              Runtime
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {node.runtime.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/68"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/7 bg-[#0f0f11] px-2.5 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
              Last seen
            </p>
            <p className="mt-1.5 text-sm font-medium text-white">{node.lastSeen}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-xl border border-white/7 bg-[#0f0f11] px-2.5 py-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
              Rack profile
            </p>
            <p className="mt-1 text-xs font-medium text-white/78">{node.profile}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/8 text-emerald-300">
            <ServerCog className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardScene({
  pageIndex,
  setPageIndex,
  shouldReduceMotion,
}: {
  pageIndex: number;
  setPageIndex: (value: number) => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="flex h-full flex-col gap-3.5">
      <div className="grid gap-3.5 xl:grid-cols-4">
        {statCards.map((card) => (
          <SnapshotCard key={card.label} {...card} />
        ))}
      </div>

      <SurfaceCard className="flex min-h-[18.5rem] flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-white/7 px-4 py-3">
          <div>
            <p className="text-[0.98rem] font-medium text-white">Node telemetry board</p>
            <p className="mt-1 text-[0.82rem] text-white/46">
              Nodes are shown in groups of four so each telemetry snapshot stays separate and easy to scan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/52">
              {pageIndex + 1}-{nodePages.length} of {nodePages.length}
            </span>
            <button
              type="button"
              onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/58 transition-colors hover:bg-white/[0.06]"
              aria-label="Previous node group"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPageIndex(Math.min(nodePages.length - 1, pageIndex + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/58 transition-colors hover:bg-white/[0.06]"
              aria-label="Next node group"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-4 py-3.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pageIndex}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full gap-3.5"
            >
              {nodePages[pageIndex]!.map((node) => (
                <TelemetryCard
                  key={`${pageIndex}-${node.name}`}
                  node={node}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
              <div className="hidden flex-1 xl:block" />
            </motion.div>
          </AnimatePresence>
        </div>
      </SurfaceCard>

      <div className="grid min-h-0 flex-1 gap-3.5 xl:grid-cols-[0.92fr_1.08fr]">
        <SurfaceCard className="min-h-0 overflow-hidden">
          <div className="border-b border-white/7 px-4 py-3">
            <p className="text-[0.98rem] font-medium text-white">Recent events</p>
            <p className="mt-1 text-[0.82rem] text-white/46">
              Alerts, state changes, and task transitions ordered by recency.
            </p>
          </div>
          <div className="divide-y divide-white/7">
            {events.slice(0, 5).map((event) => (
              <div
                key={`${event.title}-${event.createdAt}`}
                className="flex items-start gap-3 px-4 py-3.5"
              >
                <SmallBadge className={eventSeverityClasses(event.severity)}>
                  {event.severity}
                </SmallBadge>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-white">{event.title}</p>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/36">
                      {event.source}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.82rem] leading-6 text-white/52">{event.message}</p>
                </div>
                <span className="shrink-0 text-xs text-white/38">{event.time}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="min-h-0 overflow-hidden">
          <div className="border-b border-white/7 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
              Node snapshot
            </p>
            <p className="mt-1.5 text-[0.98rem] font-medium text-white">Recent node activity</p>
            <p className="mt-1 text-[0.82rem] text-white/46">
              A concise view of the nodes contributing the most recent telemetry.
            </p>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/7">
                <tr>
                  {["Name", "Status", "CPU", "Memory", "Last seen", "Actions"].map((head) => (
                    <th
                      key={head}
                      className="px-3.5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activityRows.map((row) => (
                  <tr key={row.name} className="border-b border-white/7">
                    <td className="px-3.5 py-3.5">
                      <div>
                        <p className="font-medium text-white">{row.name}</p>
                        <p className="text-xs text-white/42">{row.host}</p>
                      </div>
                    </td>
                    <td className="px-3.5 py-3.5">
                      <SmallBadge className="border-emerald-400/16 bg-emerald-400/8 text-emerald-300">
                        {row.status}
                      </SmallBadge>
                    </td>
                    <td className="px-3.5 py-3.5 text-white/72">{row.cpu}</td>
                    <td className="px-3.5 py-3.5 text-white/72">{row.memory}</td>
                    <td className="px-3.5 py-3.5 text-white/46">{row.lastSeen}</td>
                    <td className="px-3.5 py-3.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/52">
                        <MoreVertical className="h-4 w-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function NodesScene() {
  return (
    <div className="flex h-full flex-col gap-3.5">
      <div className="grid gap-3.5 xl:grid-cols-4">
        {nodeStatCards.map((card) => (
          <SnapshotCard key={card.label} {...card} />
        ))}
      </div>

      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-white/7 px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
                Directory
              </p>
              <p className="mt-1.5 text-[0.98rem] font-medium text-white">Node inventory</p>
              <p className="mt-1 text-[0.82rem] text-white/46">
                Filter nodes, page through results, and open node-level detail.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ControlPill label="all" />
              <ControlPill label="All teams" />
              <ControlPill label="all" />
              <TableActionButton>Previous</TableActionButton>
              <span className="px-1 text-[11px] text-white/42">Page 1</span>
              <TableActionButton>Next</TableActionButton>
              <TableActionButton tone="primary">+ Add node</TableActionButton>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/7">
              <tr>
                {[
                  "Name",
                  "Status",
                  "Team",
                  "Last seen",
                  "OS / Arch",
                  "Agent",
                  "Latest CPU",
                  "Latest Temp",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-3.5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nodeInventoryRows.map((row) => (
                <tr key={row.name} className="border-b border-white/7">
                  <td className="px-3.5 py-3.5">
                    <div>
                      <p className="font-medium text-white">{row.name}</p>
                      <p className="text-xs text-white/42">{row.host}</p>
                    </div>
                  </td>
                  <td className="px-3.5 py-3.5">
                    <SmallBadge className="border-emerald-400/16 bg-emerald-400/8 text-emerald-300">
                      {row.status}
                    </SmallBadge>
                  </td>
                  <td className="px-3.5 py-3.5 text-white/62">{row.team}</td>
                  <td className="px-3.5 py-3.5 text-white/46">{row.lastSeen}</td>
                  <td className="px-3.5 py-3.5 text-white/62">{row.os}</td>
                  <td className="px-3.5 py-3.5 text-white/62">{row.agent}</td>
                  <td className="px-3.5 py-3.5 text-emerald-300">{row.cpu}</td>
                  <td className="px-3.5 py-3.5 text-emerald-300">{row.temp}</td>
                  <td className="px-3.5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <TableActionButton>Inspect</TableActionButton>
                      <TableActionButton>
                        Terminal
                        <SquareTerminal className="h-3.5 w-3.5" />
                      </TableActionButton>
                      <TableActionButton>
                        <MoreVertical className="h-3.5 w-3.5" />
                        Actions
                      </TableActionButton>
                      <TableActionButton tone="danger">Delete</TableActionButton>
                      <TableActionButton>
                        Open
                        <ExternalLink className="h-3.5 w-3.5" />
                      </TableActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

function TasksScene() {
  return (
    <div className="flex h-full flex-col gap-3.5">
      <div className="grid gap-3.5 xl:grid-cols-4">
        {taskStatCards.map((card) => (
          <SnapshotCard key={card.label} {...card} />
        ))}
      </div>

      <SurfaceCard className="min-h-0 overflow-hidden">
        <div className="border-b border-white/7 px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
                Ledger
              </p>
              <p className="mt-1.5 text-[0.98rem] font-medium text-white">Task list</p>
              <p className="mt-1 text-[0.82rem] text-white/46">
                Filter current execution work and open full task detail.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ControlPill label="all" />
              <ControlPill label="All nodes" />
              <ControlPill label="All teams" />
              <TableActionButton>Previous</TableActionButton>
              <span className="px-1 text-[11px] text-white/42">Page 1</span>
              <TableActionButton>Next</TableActionButton>
              <TableActionButton tone="primary">+ Create task</TableActionButton>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/7">
              <tr>
                {["Status", "Task", "Node", "Created", "Latest output", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-3.5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {taskRows.map((row, index) => (
                <tr key={`${row.name}-${index}`} className="border-b border-white/7">
                  <td className="px-3.5 py-3.5">
                    <SmallBadge className={taskStatusClasses(row.status)}>
                      {row.status}
                    </SmallBadge>
                  </td>
                  <td className="px-3.5 py-3.5">
                    <div>
                      <p className="font-medium text-white">{row.name}</p>
                      <p className="text-xs text-white/42">{row.subtitle}</p>
                    </div>
                  </td>
                  <td className="px-3.5 py-3.5 text-white/62">{row.node}</td>
                  <td className="px-3.5 py-3.5 text-white/46">{row.created}</td>
                  <td className="max-w-[22rem] px-3.5 py-3.5 text-[0.82rem] text-white/46">
                    <span className="line-clamp-2 font-mono">{row.output}</span>
                  </td>
                  <td className="px-3.5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <TableActionButton>Stop</TableActionButton>
                      <TableActionButton>Details</TableActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

function EventsScene() {
  return (
    <SurfaceCard className="min-h-full overflow-hidden">
      <div className="border-b border-white/7 px-4 py-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
              Ledger
            </p>
            <p className="mt-1.5 text-[0.98rem] font-medium text-white">Event stream</p>
            <p className="mt-1 text-[0.82rem] text-white/46">
              Severity-aware operational events ordered by recency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ControlPill label="all" />
            <ControlPill label="All nodes" />
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-xl border border-white/8 bg-white/[0.03] px-3 text-[0.82rem] text-white/42"
            >
              Filter type
            </button>
            <ControlPill label="50" />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-white/56"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/7">
            <tr>
              {["Severity", "Title", "Source", "Type", "Created"].map((head) => (
                <th
                  key={head}
                  className="px-3.5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={`${event.title}-${event.createdAt}`} className="border-b border-white/7">
                <td className="px-3.5 py-3.5">
                  <SmallBadge className={eventSeverityClasses(event.severity)}>
                    {event.severity}
                  </SmallBadge>
                </td>
                <td className="max-w-[30rem] px-3.5 py-3.5">
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-[0.82rem] text-white/46">{event.message}</p>
                  </div>
                </td>
                <td className="px-3.5 py-3.5 text-white/62">{event.source}</td>
                <td className="px-3.5 py-3.5 text-white/46">{event.type}</td>
                <td className="px-3.5 py-3.5 text-white/46">{event.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

function SummaryScene({ activeView }: { activeView: Exclude<ViewKey, "dashboard"> }) {
  const summary = summaryCopy[activeView];

  return (
    <div className="grid h-full gap-4 xl:grid-cols-[1.08fr_0.92fr]">
      <SurfaceCard className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
          demo summary
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {summary.title}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/48">
          {summary.description}
        </p>

        <div className="mt-6 grid gap-3">
          {summary.bullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-2xl border border-white/7 bg-[#0f0f11] px-4 py-3 text-sm leading-7 text-white/72"
            >
              {bullet}
            </div>
          ))}
        </div>
      </SurfaceCard>

      <div className="grid gap-4">
        <SurfaceCard className="p-5">
          <p className="text-sm font-medium text-white">Why it exists in the hero</p>
          <p className="mt-3 text-sm leading-7 text-white/52">
            The dashboard preview stays faithful to the real Noderax shell, while these
            sections summarize the adjacent surfaces operators move through after the
            dashboard.
          </p>
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <p className="text-sm font-medium text-white">Linked product surface</p>
          <div className="mt-4 grid gap-3">
            {[
              "Workspace-aware navigation with the same left rail structure",
              "Dark operational shell reused across nodes, tasks, settings, and updates",
              "Summary cards here are intentionally smaller so the dashboard remains the hero focus",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/7 bg-[#0f0f11] px-4 py-3 text-sm leading-7 text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

export function HeroArchitecture() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className="relative h-[40.5rem] overflow-hidden rounded-[2rem] border border-white/7 bg-[#09090a] text-white lg:h-[38.5rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(255,94,66,0.06),transparent_22%),radial-gradient(circle_at_84%_4%,rgba(255,255,255,0.05),transparent_18%)]" />

      <div className="relative grid h-full grid-cols-[11rem_1fr]">
        <aside className="flex min-h-0 flex-col border-r border-white/7 bg-[#0d0d0e]">
          <div className="flex h-14 items-center gap-2.5 border-b border-white/7 px-3.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-primary/12 bg-primary/8">
              <Image
                src="/logo-white.png"
                alt="Noderax"
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[0.9rem] font-semibold tracking-tight text-white">Noderax</p>
              <p className="text-xs text-white/42">Operations center</p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden px-2.5 py-3">
            <div className="space-y-4">
              {sidebarGroups.map((group) => (
                <div key={group.label} className="space-y-1.5">
                  <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/28">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <div key={item.key} className="space-y-1">
                        <SidebarLink
                          item={item}
                          active={activeView === item.key}
                          onSelect={setActiveView}
                        />
                        {item.key === "tasks" && activeView === "tasks" ? (
                          <div className="ml-4 space-y-1 border-l border-white/7 pl-3">
                            <button
                              type="button"
                              className="flex w-full items-center rounded-xl border border-primary/24 bg-primary/12 px-2.5 py-2 text-left text-[0.8rem] text-primary"
                            >
                              Task runs
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center rounded-xl border border-transparent px-2.5 py-2 text-left text-[0.8rem] text-white/56 transition-colors hover:border-white/8 hover:bg-white/[0.03] hover:text-white"
                            >
                              Scheduled tasks
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/7 p-2.5">
            <div className="rounded-[1.1rem] border border-white/8 bg-[#0f0f11] p-2.5">
              <p className="text-xs font-medium text-white">Workspace</p>
              <p className="mt-1 text-base font-semibold tracking-tight text-white">Main</p>
              <p className="mt-1 text-[11px] leading-5 text-white/42">
                Timezone Europe/Istanbul · owner access
              </p>
            </div>

            <button
              type="button"
              className="mt-2.5 flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-sm text-white/68 transition-colors hover:bg-white/[0.03] hover:text-white"
            >
              <span>Collapse</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex h-14 items-center justify-between gap-3 border-b border-white/7 px-4.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[1.02rem] font-semibold tracking-tight text-white">
                  {activeView === "dashboard" ? "Dashboard" : summaryCopy[activeView as Exclude<ViewKey, "dashboard">].title}
                </h3>
                {["dashboard", "nodes", "tasks", "events"].includes(activeView) ? (
                  <SmallBadge className="border-emerald-400/16 bg-emerald-400/8 text-emerald-300">
                    Live · Stream healthy
                  </SmallBadge>
                ) : null}
              </div>
              <p className="mt-0.5 text-[0.82rem] text-white/46">
                {activeView === "dashboard"
                  ? "Monitor node health, workload, and recent activity."
                  : summaryCopy[activeView as Exclude<ViewKey, "dashboard">].description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-1.5 text-left"
              >
                <div>
                  <p className="text-[0.82rem] font-medium text-white">Main</p>
                  <p className="text-[11px] text-white/38">Europe/Istanbul</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/38" />
              </button>

              <div className="hidden items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 lg:flex">
                <Search className="h-4 w-4 text-white/34" />
                <span className="w-[14rem] truncate text-[0.82rem] text-white/40">
                  Search nodes, tasks, schedules, members, anc
                </span>
              </div>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-white/62"
              >
                <Sun className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-1.5"
              >
                <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[11px] text-white/64">
                  GC
                </div>
                <span className="hidden text-[0.82rem] text-white sm:block">Göktuğ Ceyhan</span>
                <ChevronDown className="h-4 w-4 text-white/38" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeView}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {activeView === "dashboard" ? (
                  <DashboardScene
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ) : activeView === "nodes" ? (
                  <NodesScene />
                ) : activeView === "tasks" ? (
                  <TasksScene />
                ) : activeView === "events" ? (
                  <EventsScene />
                ) : (
                  <SummaryScene activeView={activeView as Exclude<ViewKey, "dashboard">} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
