// src/context/QueueContext.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type QueueItem = { name: string; addedAt: number };

const QueueContext = createContext<{
  queue: QueueItem[];
  nonce: string;
  refreshQueue: () => Promise<void>;
}>({ queue: [], nonce: "", refreshQueue: async () => {} });

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [nonce, setNonce] = useState<string>("");

  const refreshQueue = useCallback(async () => {
    try {
      const res = await fetch("/api/queue/" + nonce + "/");
      const data = await res.json();
      setQueue(data.queue || []);
    } catch (err) {
      console.error("Failed to refresh queue:", err);
    }
  }, [nonce]);

  const refreshNonce = async () => {
    try {
      const res = await fetch("/api/nonce/");
      const data = await res.json();
      const newNonce = data.nonce || "";
      if (newNonce) {
        setNonce(newNonce);
      } else {
        const fallbackRes = await fetch("/api/nonce/refresh");
        const fallbackData = await fallbackRes.json();
        setNonce(fallbackData.nonce || "");
      }
    } catch (err) {
      console.error("Failed to refresh nonce:", err);
    }
  };

  useEffect(() => {
    refreshNonce();
  }, []);

  useEffect(() => {
    if (!nonce) return;

    refreshQueue();
    const interval = setInterval(refreshQueue, 3000);
    return () => clearInterval(interval);
  }, [nonce, refreshQueue]);

  return (
    <QueueContext.Provider value={{ queue, nonce, refreshQueue }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}
