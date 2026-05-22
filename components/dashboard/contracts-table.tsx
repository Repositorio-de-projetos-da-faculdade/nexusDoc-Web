"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, Loader2, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { contractsService } from "@/lib/services/contracts.service";

const STATUSES: { value: string; label: string }[] = [
  { value: "all", label: "Todos status" },
  { value: "active", label: "Ativo" },
  { value: "pending", label: "Pendente" },
  { value: "expired", label: "Expirado" },
  { value: "draft", label: "Rascunho" },
];

function SortIcon({ field, currentField, isAsc }: { field: string; currentField: string; isAsc: boolean }) {
  return (
    <span className={cn("ml-1 text-[10px]", currentField === field ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]")}>
      {currentField === field ? (isAsc ? "↑" : "↓") : "↕"}
    </span>
  );
}

export function ContractsTable() {
  const router = useRouter();

  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTitle);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTitle]);

  const isSearching = debouncedSearch.trim().length >= 3;

  // Query de listagem geral — carrega ao abrir a página
  const { data: listResponse, isLoading: isListLoading } = useQuery({
    queryKey: ["contracts-list"],
    queryFn: () => contractsService.listContracts(1, 50),
    enabled: !isSearching,
  });

  // Query de busca semântica — só dispara com 3+ caracteres
  const { data: searchResponse, isLoading: isSearchLoading } = useQuery({
    queryKey: ["contracts-search", debouncedSearch],
    queryFn: () => contractsService.searchContracts(debouncedSearch, 50),
    enabled: isSearching,
  });

  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const results = isSearching
    ? (searchResponse?.results ?? [])
    : (listResponse?.results ?? []);


  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Busca semântica avançada (Ex: 'Contratos com multa por atraso'...)"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            icon={
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            }
          />
        </div>
        <span className="text-xs text-[var(--muted-foreground)] ml-auto flex items-center gap-2">
          {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)] flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                  ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                  Título do Documento
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden md:table-cell w-1/3">
                  Trecho Extraído
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden sm:table-cell">
                  Relevância
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[var(--primary)]" />
                    Buscando contratos...
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                    Nenhum contrato encontrado.
                  </td>
                </tr>
              ) : (
                results.map((contract, idx) => (
                  <tr
                    key={contract.contract_id}
                    onClick={() => router.push(`/contratos/${contract.contract_id}`)}
                    className={cn(
                      "border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent)]/40 transition-colors duration-150 cursor-pointer group",
                      idx % 2 === 0 ? "" : "bg-[var(--muted)]/20"
                    )}
                  >
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono font-bold text-[var(--foreground)] opacity-70">
                        {contract.contract_id.split('-')[0]}...
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[var(--foreground)] truncate max-w-[200px] lg:max-w-[300px]">
                        {contract.title}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={contract.status as any} />
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 italic border-l-2 border-[var(--border)] pl-2">
                        "{contract.snippet}"
                      </p>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="inline-flex items-center justify-center bg-[var(--accent)] text-[var(--primary)] text-xs font-bold px-2 py-1 rounded-md">
                        {Math.round(contract.similarity * 100)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <Eye size={14} className="mr-1" />
                        Ver
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
