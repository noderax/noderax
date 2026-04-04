type ServiceState = {
  service: string;
  status: "ok" | "down";
  endpoint: string;
  note?: string;
  timestamp?: string;
  startedAt?: string;
  bootId?: string;
};

type CloudHealthPayload = {
  service?: string;
  status?: string;
  timestamp?: string;
  startedAt?: string;
  bootId?: string;
};

const CLOUD_ENDPOINT = "https://api.noderax.net/api/v1/health";
const AGENT_ENDPOINT = "https://cdn.noderax.net/";
const REQUEST_TIMEOUT_MS = 6500;

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function downState(
  service: string,
  endpoint: string,
  note: string,
): ServiceState {
  return {
    service,
    status: "down",
    endpoint,
    note,
  };
}

async function getCloudState(): Promise<ServiceState> {
  try {
    const response = await fetchWithTimeout(CLOUD_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return downState(
        "noderax-api",
        CLOUD_ENDPOINT,
        `Health check failed (${response.status})`,
      );
    }

    const payload = (await response.json()) as CloudHealthPayload;
    const resolvedStatus = payload.status === "ok" ? "ok" : "down";

    return {
      service: payload.service ?? "noderax-api",
      status: resolvedStatus,
      endpoint: CLOUD_ENDPOINT,
      note:
        resolvedStatus === "ok"
          ? "Cloud health endpoint reachable"
          : "Cloud health returned non-ok",
      timestamp: payload.timestamp,
      startedAt: payload.startedAt,
      bootId: payload.bootId,
    };
  } catch {
    return downState(
      "noderax-api",
      CLOUD_ENDPOINT,
      "Cloud health request timed out or failed",
    );
  }
}

async function getAgentState(): Promise<ServiceState> {
  try {
    const response = await fetchWithTimeout(AGENT_ENDPOINT, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      return downState(
        "noderax-agent-cdn",
        AGENT_ENDPOINT,
        `CDN check failed (${response.status})`,
      );
    }

    return {
      service: "noderax-agent-cdn",
      status: "ok",
      endpoint: AGENT_ENDPOINT,
      note: "Agent package CDN reachable",
    };
  } catch {
    return downState(
      "noderax-agent-cdn",
      AGENT_ENDPOINT,
      "CDN request timed out or failed",
    );
  }
}

export async function GET() {
  const [cloud, agent] = await Promise.all([getCloudState(), getAgentState()]);
  const overall =
    cloud.status === "ok" && agent.status === "ok" ? "ok" : "degraded";

  return Response.json(
    {
      overall,
      checkedAt: new Date().toISOString(),
      cloud,
      agent,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    },
  );
}
