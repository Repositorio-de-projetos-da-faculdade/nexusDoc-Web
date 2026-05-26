"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Contract, ContractStatus } from "@/types";
import { contractsService } from "@/lib/services/contracts.service";
import { normalizeStatus } from "@/lib/status-mapper";

/**
 * Mapeia o payload enxuto de `GET /contracts` para o tipo `Contract`
 * usado pela UI. Campos que só existem em `ExtractedData` (valor, datas,
 * contraparte) precisam de chamada ao endpoint de detalhe — aqui ficam
 * com defaults sensatos.
 */
function mapListResultToContract(r: {
  contract_id: string;
  title: string;
  status: string;
  status_display?: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}): Contract {
  return {
    id: r.contract_id,
    title: r.title,
    counterparty: "—",
    status: normalizeStatus(r.status_display ?? r.status) as ContractStatus,
    value: 0,
    // Datas reais vivem em ExtractedData; o endpoint de listagem não as devolve.
    // Usamos created_at só como placeholder visual — null em endDate para que
    // a UI mostre "—" via formatDate.
    startDate: r.created_at,
    endDate: null as unknown as string,
    categoryId: "",
    owner: "—",
    tags: [],
    lastUpdated: r.updated_at,
  };
}

export function useContracts() {
  const queryClient = useQueryClient();

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const res = await contractsService.listContracts(1, 100);
      return res.results.map(mapListResultToContract);
    },
  });

  // Upload real de PDF (extração via Gemini no backend)
  const uploadContract = useMutation({
    mutationFn: async (file: File) => {
      toast.info("Enviando documento...", {
        description: "A IA iniciará a extração de dados automaticamente.",
      });

      const response = await contractsService.uploadContract(file);
      const contractData = response.data.contract as Partial<Contract>;

      return {
        id: contractData.id || crypto.randomUUID(),
        title: contractData.title || file.name.replace(".pdf", ""),
        counterparty: contractData.counterparty || "Extraído pela IA",
        status: contractData.status || "processing",
        value: contractData.value || 0,
        startDate: contractData.startDate || new Date().toISOString().split("T")[0],
        endDate: contractData.endDate || "",
        categoryId: contractData.categoryId || "",
        owner: contractData.owner || "—",
        tags: [],
        lastUpdated: new Date().toISOString().split("T")[0],
      } as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("Documento processado!", {
        description: `O contrato "${data.title}" foi analisado e adicionado à fila.`,
      });
    },
    onError: () => {
      toast.error("Erro no processamento", {
        description: "Não foi possível analisar o documento no momento.",
      });
    },
  });

  /**
   * Criação manual sem PDF não é suportada pelo backend hoje (só /contracts/upload).
   * Mantida como stub para a página `/contratos/novo` que ainda existe — o ideal
   * é redirecionar o usuário para o upload.
   */
  const addContract = useMutation({
    mutationFn: async (_contractData: Omit<Contract, "id" | "lastUpdated">) => {
      throw new Error(
        "Cadastro manual ainda não suportado. Use o upload de PDF na tela principal."
      );
    },
    onError: (err: Error) => {
      toast.error("Cadastro manual indisponível", {
        description: err.message,
      });
    },
  });

  return {
    contracts,
    isLoading,
    uploadContract,
    addContract,
  };
}
