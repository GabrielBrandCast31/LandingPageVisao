"use client";

import { useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "@/lib/api";

type Status = "loading" | "ok" | "error";

export function HealthBadge() {
  const [status, setStatus] = useState<Status>("loading");
  const [info, setInfo] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setInfo(data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  const dot =
    status === "ok"
      ? "bg-support"
      : status === "error"
        ? "bg-error"
        : "bg-accent animate-pulse";

  const label =
    status === "loading"
      ? "Conectando à API…"
      : status === "error"
        ? "API offline"
        : `API ${info?.status} · ${info?.environment} · ${info?.database}`;

  return (
    <div className="inline-flex items-center gap-2 rounded-pill border border-edge-light bg-card/60 px-4 py-2 text-xs font-medium text-mute backdrop-blur">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span>{label}</span>
    </div>
  );
}
