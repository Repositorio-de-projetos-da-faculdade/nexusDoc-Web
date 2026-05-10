"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MOCK_CONTRACTS } from "@/lib/mock-data";
import type { Contract } from "@/types";

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
      // Simulação de upload do PDF
      await delay(1500);
      
      // Simulação da análise da IA do Backend
      toast.info("IA analisando documento...", {
        description: "Extraindo contraparte, datas e valores automaticamente.",
      });
      await delay(2500);

      // Simulação de sucesso
      return { 
        id: Math.random().toString(), 
        title: file.name.replace(".pdf", ""),
        counterparty: "Extraído pela IA...", 
        status: "pending",
        value: 0,
        startDate: new Date().toISOString().split('T')[0],
        owner: "Lucas Ferreira",
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

  return {
    contracts,
    isLoading,
    uploadContract,
  };
}
