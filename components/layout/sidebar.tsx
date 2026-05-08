"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAlerts } from "@/contexts/alerts-context";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "⊞" },
  { label: "Contratos", href: "/contratos", icon: "📄" },
  { label: "Modelos", href: "/modelos", icon: "📑" },
  { label: "Documentos", href: "/documentos", icon: "🗂" },
  { label: "Partes", href: "/partes", icon: "🏢" },
  { label: "Alertas", href: "/alertas", icon: "🔔" },
  { label: "Relatórios", href: "/relatorios", icon: "📊" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { unreadCount } = useAlerts();

  return (
    <aside className="flex h-full flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] w-[220px] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--sidebar-border)]">
        <div className="h-8 w-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <div>
          <span className="font-bold text-sm text-[var(--foreground)]">
            NexusDoc
          </span>
          <p className="text-[10px] text-[var(--muted-foreground)] leading-none">
            Gestão de Contratos
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
          Principal
        </p>
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
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150",
                    "hover:bg-[var(--muted)]",
                    isActive
                      ? "bg-[var(--accent)] text-[var(--primary)] font-semibold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  )}
                >
                  <span className="text-base leading-none w-4 text-center">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {displayBadge !== undefined && (
                    <span className="text-[10px] bg-[var(--primary)] text-white rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-bold">
                      {displayBadge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="py-3 px-3 border-t border-[var(--sidebar-border)]">


        {/* User */}
        <Link href="/perfil" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[var(--muted)] transition-all duration-150 cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--brand-400)] to-[var(--brand-700)] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[var(--foreground)] truncate">
              Lucas Ferreira
            </p>
            <p className="text-[10px] text-[var(--muted-foreground)] truncate">
              Administrador
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
