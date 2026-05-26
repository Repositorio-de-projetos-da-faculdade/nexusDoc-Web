"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { partiesService } from "@/lib/services/parties.service";
import {
  PARTY_KIND_LABEL,
  PARTY_LABEL_TO_KIND,
  PARTY_STATUS_LABEL,
  type CreatePartyRequest,
  type PartyKind,
  type PartyResponse,
  type PartyStatusBackend,
} from "@/types/api";

type KindLabel = "Cliente" | "Fornecedor" | "Parceiro" | "Interno";
type StatusLabel = "Ativo" | "Inativo";

const KIND_OPTIONS: KindLabel[] = ["Cliente", "Fornecedor", "Parceiro", "Interno"];
const STATUS_OPTIONS: StatusLabel[] = ["Ativo", "Inativo"];

interface FormState {
  name: string;
  kindLabel: KindLabel;
  statusLabel: StatusLabel;
  cnpj: string;
  email: string;
  contact: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  kindLabel: "Cliente",
  statusLabel: "Ativo",
  cnpj: "",
  email: "",
  contact: "",
};

function fromParty(p: PartyResponse): FormState {
  return {
    name: p.name,
    kindLabel: PARTY_KIND_LABEL[p.kind],
    statusLabel: PARTY_STATUS_LABEL[p.status],
    cnpj: p.cnpj ?? "",
    email: p.email ?? "",
    contact: p.contact ?? "",
  };
}

function toPayload(form: FormState): CreatePartyRequest {
  const kind: PartyKind = PARTY_LABEL_TO_KIND[form.kindLabel];
  const status: PartyStatusBackend = form.statusLabel === "Ativo" ? "ACTIVE" : "INACTIVE";
  return {
    name: form.name.trim(),
    kind,
    status,
    cnpj: form.cnpj.trim() || null,
    email: form.email.trim() || null,
    contact: form.contact.trim() || null,
  };
}

export default function PartesPage() {
  const [parties, setParties] = useState<PartyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadParties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await partiesService.listParties({ limit: 100 });
      setParties(res.results);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erro ao carregar partes.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadParties();
  }, [loadParties]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return parties;
    return parties.filter((party) => {
      const haystacks = [party.name, party.contact ?? "", party.email ?? "", party.cnpj ?? ""];
      return haystacks.some((s) => s.toLowerCase().includes(q));
    });
  }, [parties, search]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSubmitError(null);
    setDialogOpen(true);
  }

  function openEdit(party: PartyResponse) {
    setEditingId(party.id);
    setForm(fromParty(party));
    setSubmitError(null);
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setSubmitError("Nome é obrigatório.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = toPayload(form);
      if (editingId) {
        await partiesService.updateParty(editingId, payload);
      } else {
        await partiesService.createParty(payload);
      }
      setDialogOpen(false);
      await loadParties();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erro ao salvar parte.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(party: PartyResponse) {
    if (!confirm(`Excluir a parte "${party.name}"?`)) return;
    setDeletingId(party.id);
    try {
      await partiesService.deleteParty(party.id);
      await loadParties();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erro ao excluir parte.";
      alert(message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Partes Envolvidas"
        subtitle="Gerenciamento de clientes, fornecedores e parceiros"
        action={
          <Button size="sm" onClick={openCreate}>
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

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
            {error}
          </div>
        )}

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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                      Carregando...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
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
                        <span className="text-xs font-mono text-[var(--muted-foreground)]" title={party.id}>
                          {party.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{party.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md px-2 py-0.5">
                          {PARTY_KIND_LABEL[party.kind]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{party.contact ?? "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{party.email ?? "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            party.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                              : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {PARTY_STATUS_LABEL[party.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => openEdit(party)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                          disabled={deletingId === party.id}
                          onClick={() => void handleDelete(party)}
                        >
                          {deletingId === party.id ? "..." : "Excluir"}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar parte" : "Nova parte"}</DialogTitle>
            <DialogDescription>
              {editingId
                ? "Atualize os dados da parte."
                : "Cadastre uma nova parte para o workspace."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Nome *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Tipo</label>
                <select
                  className="w-full h-9 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 text-sm"
                  value={form.kindLabel}
                  onChange={(e) => setForm({ ...form, kindLabel: e.target.value as KindLabel })}
                >
                  {KIND_OPTIONS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select
                  className="w-full h-9 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 text-sm"
                  value={form.statusLabel}
                  onChange={(e) => setForm({ ...form, statusLabel: e.target.value as StatusLabel })}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">CNPJ</label>
              <Input
                value={form.cnpj}
                onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Contato principal</label>
              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">E-mail</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {submitError && (
              <div className="text-sm text-red-600 dark:text-red-400">{submitError}</div>
            )}

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)} disabled={submitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : editingId ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
