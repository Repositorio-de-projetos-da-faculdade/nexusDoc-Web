"use client";

import { useState } from "react";
import { STATUS_CONFIG } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { formatDate, formatCurrency, cn } from "@/lib/utils";
import { useData } from "@/contexts/data-context";
import type { ContractStatus } from "@/types";

const STATUSES: { value: string; label: string }[] = [
  { value: "all", label: "Todos status" },
  { value: "active", label: "Ativo" },
  { value: "pending", label: "Pendente" },
  { value: "expired", label: "Expirado" },
  { value: "draft", label: "Rascunho" },
];

export function ContractsTable() {
  const { contracts, categories } = useData();

  const [searchId, setSearchId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState<"id" | "title" | "value" | "endDate">("id");
  const [sortAsc, setSortAsc] = useState(false); // ID desc by default

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setSearchId(val);
    }
  };

  const filtered = contracts
    .filter((c) => {
      const matchId = searchId === "" || c.id.includes(searchId);
      const matchTitle =
        c.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
        c.counterparty.toLowerCase().includes(searchTitle.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchCat = categoryFilter === "all" || c.categoryId === categoryFilter;
      return matchId && matchTitle && matchStatus && matchCat;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "id") cmp = parseInt(a.id) - parseInt(b.id);
      else if (sortField === "value") cmp = a.value - b.value;
      else if (sortField === "endDate") cmp = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      else cmp = a.title.localeCompare(b.title);
      return sortAsc ? cmp : -cmp;
    });

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortAsc((v) => !v);
    else { setSortField(field); setSortAsc(true); }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => (
    <span className={cn("ml-1 text-[10px]", sortField === field ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]")}>
      {sortField === field ? (sortAsc ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="w-24 shrink-0">
          <Input
            placeholder="ID..."
            value={searchId}
            onChange={handleIdChange}
          />
        </div>
        <div className="flex-1 min-w-48">
          <Input
            placeholder="Buscar por título ou parte…"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            }
          />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </Select>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas as Categorias</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <span className="text-xs text-[var(--muted-foreground)] ml-auto">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)] flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                <th 
                  className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide cursor-pointer hover:text-[var(--foreground)] w-16"
                  onClick={() => toggleSort("id")}
                >
                  ID <SortIcon field="id" />
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide cursor-pointer hover:text-[var(--foreground)]"
                  onClick={() => toggleSort("title")}
                >
                  Título <SortIcon field="title" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden md:table-cell">Parte</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Status</th>
                <th
                  className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide cursor-pointer hover:text-[var(--foreground)] hidden lg:table-cell"
                  onClick={() => toggleSort("value")}
                >
                  Valor <SortIcon field="value" />
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide cursor-pointer hover:text-[var(--foreground)] hidden xl:table-cell"
                  onClick={() => toggleSort("endDate")}
                >
                  Vencimento <SortIcon field="endDate" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden xl:table-cell">Categoria</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                    Nenhum contrato encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((contract, idx) => (
                  <tr
                    key={contract.id}
                    className={cn(
                      "border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-100 cursor-pointer",
                      idx % 2 === 0 ? "" : "bg-[var(--muted)]/20"
                    )}
                  >
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-[var(--foreground)]">{contract.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{contract.title}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-[var(--muted-foreground)] truncate max-w-[160px] block">{contract.counterparty}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={contract.status} />
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="font-semibold text-[var(--foreground)]">{formatCurrency(contract.value)}</span>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-[var(--muted-foreground)]">{formatDate(contract.endDate)}</span>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-xs bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md px-2 py-0.5">
                        {categories.find(c => c.id === contract.categoryId)?.name || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100">
                        ···
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
