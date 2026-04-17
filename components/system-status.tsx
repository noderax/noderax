"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceState = {
  service: string;
  status: "ok" | "down";
  endpoint: string;
  note?: string;
};

type SystemStatusPayload = {
  overall: "ok" | "degraded";
  checkedAt: string;
  cdn: ServiceState;
};

type SystemStatusProps = {
  mode?: "popover" | "inline";
  placement?: "top" | "bottom";
  className?: string;
};

const POLL_INTERVAL_MS = 10000;

function statusBadgeClasses(status: "ok" | "down") {
  return status === "ok"
    ? "bg-emerald-500/15 text-emerald-500"
    : "bg-red-500/15 text-red-500";
}

function statusDotClasses(status: "ok" | "down") {
  return status === "ok" ? "bg-emerald-500" : "bg-red-500";
}

const fallbackState: SystemStatusPayload = {
  overall: "degraded",
  checkedAt: "",
  cdn: {
    service: "noderax-agent-cdn",
    status: "down",
    endpoint: "https://cdn.noderax.net/",
    note: "Fetching live status...",
  },
};

export function SystemStatus({
  mode = "popover",
  placement = "top",
  className,
}: SystemStatusProps) {
  const [status, setStatus] = useState<SystemStatusPayload>(fallbackState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/system-status", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Status request failed (${response.status})`);
      }

      const payload = (await response.json()) as SystemStatusPayload;
      setStatus(payload);
    } catch {
      setStatus((prev) => ({
        ...prev,
        overall: "degraded",
        checkedAt: new Date().toISOString(),
        cdn: {
          ...prev.cdn,
          status: "down",
          note: "CDN check temporarily unavailable",
        },
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
    const intervalId = window.setInterval(() => {
      void fetchStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchStatus]);

  const indicatorClass = useMemo(
    () => statusDotClasses(status.overall === "ok" ? "ok" : "down"),
    [status.overall],
  );

  const panelContent = (
    <>
      <div className="grid gap-2">
        <a
          href={status.cdn.endpoint}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border/50 bg-card/70 p-3 transition-colors hover:border-primary/30"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/90">
              <Package className="h-3.5 w-3.5 text-primary" />
              CDN
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                statusBadgeClasses(status.cdn.status),
              )}
            >
              {status.cdn.status}
            </span>
          </div>
          <p className="truncate text-[11px] font-semibold text-foreground/90">
            {status.cdn.service}
          </p>
          {status.cdn.note ? (
            <p className="mt-1 truncate text-[10px] text-muted-foreground">
              {status.cdn.note}
            </p>
          ) : null}
          <p className="truncate text-[10px] text-muted-foreground">
            {status.cdn.endpoint}
          </p>
        </a>
      </div>
      {status.checkedAt ? (
        <p className="mt-2 px-1 text-[10px] text-muted-foreground/80">
          Last update: {status.checkedAt}
        </p>
      ) : null}
    </>
  );

  if (mode === "inline") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border/60 bg-background/70 p-3",
          className,
        )}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/90">
          <span
            className={cn(
              "flex h-2 w-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]",
              indicatorClass,
              status.overall === "ok" ? "animate-pulse" : "",
            )}
          />
          System Status {isLoading ? "(loading...)" : ""}
        </div>
        <div className="grid gap-2">{panelContent}</div>
      </div>
    );
  }

  return (
    <div className={cn("group relative", className)}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-muted-foreground/90 transition-colors hover:bg-emerald-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span
          className={cn(
            "flex h-2 w-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]",
            indicatorClass,
            status.overall === "ok" ? "animate-pulse" : "",
          )}
        />
        System Status
      </button>

      <div
        className={cn(
          "pointer-events-none absolute right-0 z-40 w-[min(26rem,calc(100vw-2rem))] translate-y-1 rounded-2xl border border-border/60 bg-background/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
          placement === "top"
            ? "bottom-[calc(100%+10px)]"
            : "top-[calc(100%+10px)]",
        )}
      >
        {panelContent}
      </div>
    </div>
  );
}
