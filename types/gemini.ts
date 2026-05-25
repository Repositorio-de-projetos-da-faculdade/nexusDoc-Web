/**
 * Tipos espelhando a resposta validada do Gemini no backend.
 *
 * SCHEMA CANÔNICO (single-source-of-truth):
 *   `src/schemas/gemini-extraction.schema.ts` no repositório do backend
 *   (`nexusdoc-api`), validado via Zod no pipeline de upload de contratos.
 *
 * Se você precisar mudar a forma desses dados, comece pelo prompt e pelo
 * schema Zod no backend e só então atualize este arquivo. O backend loga
 * warnings quando a resposta do Gemini diverge — fique de olho.
 */

export type GeminiExtractionStatus = "completo" | "parcial" | "insuficiente";

export interface GeminiPartes {
  contratante: string | null;
  contratado: string | null;
}

export interface GeminiPrazos {
  inicio: string | null;
  termino: string | null;
  vigencia: string | null;
  prazoRelativo: string | null;
  renovacao: string | null;
  renovacaoAutomatica: boolean;
}

export interface GeminiValor {
  total: string | null;
  moeda: string | null;
  formaPagamento: string | null;
  reajuste: string | null;
  dataReajuste: string | null;
}

export interface GeminiPenalidades {
  multaInadimplemento: string | null;
  multaRescisao: string | null;
  juros: string | null;
}

export interface GeminiExtraction {
  titulo: string | null;
  partes: GeminiPartes;
  objeto: string | null;
  prazos: GeminiPrazos;
  valor: GeminiValor;
  penalidades: GeminiPenalidades;
  clausulasRelevantes: string[];
  alertas: string[];
  statusExtracao: GeminiExtractionStatus;
}
