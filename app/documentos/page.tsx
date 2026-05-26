"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { documentsService } from "@/lib/services/documents.service";
import { contractsService } from "@/lib/services/contracts.service";
import type { WorkspaceDocumentItem } from "@/types/api";

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function DocumentosPage() {
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: ["documents", "workspace"],
    queryFn: () => documentsService.listAllDocuments(),
  });

  const contractsQuery = useQuery({
    queryKey: ["contracts", "list", 1, 100],
    queryFn: () => contractsService.listContracts(1, 100),
  });

  const docs: WorkspaceDocumentItem[] = documentsQuery.data?.results ?? [];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return docs;
    return docs.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.contract_title.toLowerCase().includes(q) ||
        d.uploaded_by?.name?.toLowerCase().includes(q),
    );
  }, [docs, search]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Documento removido.");
    },
    onError: () => toast.error("Não foi possível remover o documento."),
  });

  async function handleDownload(d: WorkspaceDocumentItem) {
    try {
      await documentsService.downloadDocument(d.id, d.name);
    } catch {
      toast.error("Falha ao baixar o documento.");
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Documentos"
        subtitle="Anexos vinculados aos contratos do workspace"
        action={
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                    Nome
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                    Contrato
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                    Enviado por
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                    Data
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                    Tamanho
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {documentsQuery.isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm"
                    >
                      Carregando documentos...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm"
                    >
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
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-[var(--primary)]"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <p
                            className="font-medium text-[var(--foreground)] truncate max-w-[260px]"
                            title={doc.name}
                          >
                            {doc.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-[var(--muted-foreground)] text-xs bg-[var(--muted)] px-2 py-1 rounded-md"
                          title={doc.contract_id}
                        >
                          {doc.contract_title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">
                          {doc.uploaded_by?.name ?? "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">
                          {new Date(doc.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs text-[var(--muted-foreground)]">
                          {formatBytes(doc.size_bytes)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleDownload(doc)}
                        >
                          Baixar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
                          onClick={() => {
                            if (confirm(`Remover "${doc.name}"?`)) {
                              deleteMutation.mutate(doc.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          Excluir
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

      {uploadOpen ? (
        <UploadDocumentModal
          contracts={
            contractsQuery.data?.results.map((c) => ({
              id: c.contract_id,
              title: c.title,
            })) ?? []
          }
          onClose={() => setUploadOpen(false)}
          onUploaded={() => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            setUploadOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

function UploadDocumentModal({
  contracts,
  onClose,
  onUploaded,
}: {
  contracts: { id: string; title: string }[];
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [contractId, setContractId] = useState<string>(contracts[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!contractId && contracts[0]) setContractId(contracts[0].id);
  }, [contracts, contractId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contractId) {
      toast.error("Selecione um contrato.");
      return;
    }
    if (!file) {
      toast.error("Selecione um arquivo.");
      return;
    }
    setSubmitting(true);
    try {
      await documentsService.uploadDocument(contractId, file);
      toast.success("Documento enviado.");
      onUploaded();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha no upload.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)] p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="text-lg font-semibold">Enviar documento</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            PDF, imagem (PNG/JPG/WEBP/GIF) ou DOC/DOCX. Máx. 25 MB.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium">Contrato</label>
            <select
              className="w-full h-9 px-2 rounded-[var(--radius)] border border-[var(--border)] bg-transparent text-sm"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
            >
              {contracts.length === 0 ? (
                <option value="">Nenhum contrato disponível</option>
              ) : (
                contracts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">Arquivo</label>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/png,image/jpeg,image/webp,image/gif,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" disabled={submitting || contracts.length === 0}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
