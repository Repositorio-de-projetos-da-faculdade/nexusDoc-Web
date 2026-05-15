"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAlerts } from "@/contexts/alerts-context";
import { useSidebar } from "@/contexts/sidebar-context";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Files,
  FolderOpen,
  Building2,
  Bell,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { label: "Contratos", href: "/contratos", icon: <FileText size={20} /> },
  { label: "Modelos", href: "/modelos", icon: <Files size={20} /> },
  { label: "Documentos", href: "/documentos", icon: <FolderOpen size={20} /> },
  { label: "Partes", href: "/partes", icon: <Building2 size={20} /> },
  { label: "Alertas", href: "/alertas", icon: <Bell size={20} /> },
  { label: "Relatórios", href: "/relatorios", icon: <BarChart size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { unreadCount } = useAlerts();
  const { collapsed, toggleSidebar } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  // The sidebar is expanded if it's not persistently collapsed OR if it's currently hovered
  const isExpanded = !collapsed || isHovered;

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex h-full flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] shrink-0 relative transition-all duration-300 ease-in-out z-40",
        collapsed && isHovered && "shadow-2xl ring-1 ring-black/5"
      )}
      style={{ width: isExpanded ? 240 : 68 }}
    >
      {/* Logo & Toggle */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-[var(--sidebar-border)] overflow-hidden min-h-[72px] transition-all duration-300",
          !isExpanded ? "px-2 justify-center" : "px-4"
        )}
      >
        {!isExpanded ? (
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-[var(--primary)]/20">
            <span className="text-[var(--primary-foreground)] text-sm font-bold font-oxanium">G</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-emerald-600 flex items-center justify-center shrink-0">
              <span className="text-[var(--primary-foreground)] text-xs font-bold font-oxanium">G</span>
            </div>
            <span className="font-oxanium font-bold tracking-tight text-lg truncate bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">
              GRACON
            </span>
          </div>
        )}
        
        {isExpanded && !isHovered && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Persistent Toggle Button (only visible when not hovered and collapsed) */}
      {!isExpanded && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-[var(--primary)] text-[var(--primary-foreground)] p-1 rounded-full shadow-lg z-50 hover:scale-110 transition-transform border-2 border-[var(--sidebar-bg)]"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden">
        {isExpanded && (
          <p className="px-2 mb-2 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold transition-opacity duration-200 font-oxanium">
            Principal
          </p>
        )}
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            let displayBadge = item.badge;
            if (item.href === "/alertas") {
              displayBadge = unreadCount > 0 ? unreadCount : undefined;
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={!isExpanded ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm transition-all duration-200 group relative",
                    !isExpanded
                      ? "justify-center px-0 py-2.5 mx-auto w-11 h-11"
                      : "gap-2.5 px-2.5 py-2",
                    "hover:bg-[var(--muted)]",
                    isActive
                      ? "bg-[var(--accent)] text-[var(--primary)] font-semibold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  )}
                >
                  <span
                    className={cn(
                      "leading-none shrink-0 flex items-center justify-center",
                      !isExpanded ? "w-5" : "w-5"
                    )}
                  >
                    {item.icon}
                  </span>

                  {isExpanded && (
                    <span className="flex-1 whitespace-nowrap overflow-hidden font-oxanium font-medium">
                      {item.label}
                    </span>
                  )}

                  {displayBadge !== undefined && (
                    <span
                      className={cn(
                        "text-[10px] bg-[var(--primary)] text-white rounded-full font-bold flex items-center justify-center font-oxanium",
                        !isExpanded
                          ? "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1"
                          : "h-4 min-w-4 px-1"
                      )}
                    >
                      {displayBadge}
                    </span>
                  )}

                  {/* Tooltip for collapsed mode */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 pointer-events-none shadow-lg font-oxanium">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[var(--foreground)] rotate-45" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="py-3 px-2 border-t border-[var(--sidebar-border)] space-y-1">
        <Link
          href="/perfil"
          title={!isExpanded ? "Lucas Ferreira" : undefined}
          className={cn(
            "flex items-center rounded-lg hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer group relative",
            !isExpanded ? "justify-center px-0 py-2.5 mx-auto w-11 h-11" : "gap-2.5 px-2.5 py-2"
          )}
        >
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-emerald-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          {isExpanded && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--foreground)] truncate font-oxanium">
                Lucas Ferreira
              </p>
              <p className="text-[10px] text-[var(--muted-foreground)] truncate font-oxanium">
                Administrador
              </p>
            </div>
          )}

          {/* Tooltip for collapsed mode */}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 pointer-events-none shadow-lg font-oxanium">
              Lucas Ferreira
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[var(--foreground)] rotate-45" />
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
