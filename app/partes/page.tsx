"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_PARTIES } from "@/lib/mock-data";

export default function PartesPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_PARTIES.filter(party => 
    party.name.toLowerCase().includes(search.toLowerCase()) || 
    party.contact.toLowerCase().includes(search.toLowerCase()) ||
    party.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Partes Envolvidas"
        subtitle="Gerenciamento de clientes, fornecedores e parceiros"
        action={
          <Button size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            Nova Parte
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex gap-3 items-center">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Buscar por nome, contato ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              }
            />
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">
            {filtered.length} registro(s)
          </span>
        </div>

        <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Nome da Empresa/Pessoa</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Tipo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Contato Principal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">E-mail</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                      Nenhuma parte encontrada.
                    </td>
                  </tr>
                ) : (
                  filtered.map((party, idx) => (
                    <tr
                      key={party.id}
                      className={`border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-100 ${
                        idx % 2 === 0 ? "" : "bg-[var(--muted)]/20"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-[var(--muted-foreground)]">{party.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{party.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md px-2 py-0.5">{party.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{party.contact}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{party.email}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          party.status === "Ativo" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        }`}>
                          {party.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Editar</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
