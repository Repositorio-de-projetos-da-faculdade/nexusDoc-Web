"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";

export default function DocumentosPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(search.toLowerCase()) || 
    doc.contractId?.toLowerCase().includes(search.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Documentos"
        subtitle="Gerencie os arquivos e anexos do sistema"
        action={
          <Button size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Documento
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex gap-3 items-center">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Buscar documento..."
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
            {filtered.length} documento(s)
          </span>
        </div>

        <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Nome</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Contrato Relacionado</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Enviado por</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Data</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Tamanho</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                      Nenhum documento encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((doc, idx) => (
                    <tr
                      key={doc.id}
                      className={`border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-100 ${
                        idx % 2 === 0 ? "" : "bg-[var(--muted)]/20"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-[var(--muted-foreground)]">{doc.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                          </svg>
                          <p className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{doc.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)] text-xs bg-[var(--muted)] px-2 py-1 rounded-md">{doc.contractId || "-"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{doc.uploadedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{new Date(doc.uploadDate).toLocaleDateString('pt-BR')}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs text-[var(--muted-foreground)]">{doc.size}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Baixar</Button>
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
