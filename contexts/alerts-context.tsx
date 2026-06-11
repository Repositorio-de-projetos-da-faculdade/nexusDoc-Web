"use client";

import React, { createContext, useContext, useState } from "react";
import type { Alert } from "@/types";

interface AlertsContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

/**
 * Estado de alertas. Hoje começa vazio — o backend ainda não expõe
 * `GET /alerts`. A intenção é puxar alertas derivados dos `TimelineEvent`s
 * + `Alert` model (já existem no schema Prisma) assim que esse endpoint
 * estiver no ar.
 */
export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  return (
    <AlertsContext.Provider value={{ alerts, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
}
