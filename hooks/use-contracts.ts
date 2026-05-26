"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MOCK_CONTRACTS } from "@/lib/mock-data";
import type { Contract } from "@/types";
import { contractsService } from "@/lib/services/contracts.service";

// Simulação de delay para API
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function useContracts() {
  const queryClient = useQueryClient();

  // Buscar todos os contratos
  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      // Aqui entraria o fetch real: const res = await fetch('/api/contracts'); return res.json();
      await delay(800);
      return [...MOCK_CONTRACTS];
    },
  });

  // Mutação para upload e análise por IA
  const uploadContract = useMutation({
    mutationFn: async (file: File) => {
      // Faz o upload real do PDF para o Backend
      toast.info("Enviando documento...", {
        description: "A IA iniciará a extração de dados automaticamente.",
      });

      const response = await contractsService.uploadContract(file);
      const contractData = response.data.contract as Partial<Contract>;

      // O backend retorna os dados extraídos. Mapeamos para o tipo Contract do frontend.
      return { 
        id: contractData.id || Math.random().toString(), 
        title: contractData.title || file.name.replace(".pdf", ""),
        counterparty: contractData.counterparty || "Extraído pela IA", 
        status: contractData.status || "pending",
        value: contractData.value || 0,
        startDate: contractData.startDate || new Date().toISOString().split('T')[0],
        owner: contractData.owner || "Usuário Logado",
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

  const addContract = useMutation({
    mutationFn: async (contractData: Omit<Contract, "id" | "lastUpdated">) => {
      await delay(500);
      return { 
        ...contractData, 
        id: Math.random().toString(), 
        lastUpdated: new Date().toISOString().split("T")[0] 
      } as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("Contrato criado!");
    },
    onError: () => {
      toast.error("Erro ao criar contrato");
    },
  });

  return {
    contracts,
    isLoading,
    uploadContract,
    addContract,
  };
}
