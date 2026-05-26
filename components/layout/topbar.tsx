"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Topbar({ title, subtitle, action }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const { user, activeWorkspace, switchWorkspace } = useAuth();
  const activeWorkspaceId = activeWorkspace?.id;

  return (
    <header className="flex items-center gap-4 px-6 py-4 border-b border-[var(--border)] bg-[var(--card)] shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-[var(--foreground)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>



      <div className="flex items-center gap-3">
        {user && user.workspaces && user.workspaces.length > 0 && (
          <div className="hidden md:flex items-center">
            <select
              className="text-xs font-medium bg-[var(--accent)]/50 hover:bg-[var(--accent)] text-[var(--foreground)] rounded-lg border border-[var(--border)] px-3 py-1.5 focus:ring-1 focus:ring-[var(--primary)] cursor-pointer outline-none transition-colors"
              value={activeWorkspaceId || ""}
              onChange={(e) => switchWorkspace(e.target.value)}
            >
              {user.workspaces.map((w) => (
                <option key={w.id} value={w.id}>{w.name} ({w.role})</option>
              ))}
            </select>
            <div className="w-px h-6 bg-[var(--border)] mx-3"></div>
          </div>
        )}
        
        {action}
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full w-9 h-9"
          suppressHydrationWarning
        >
          {theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </Button>
      </div>
    </header>
  );
}
