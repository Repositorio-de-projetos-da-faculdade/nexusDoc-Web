/**
 * Mapeia o `PartyType` do backend (Prisma enum) para labels PT-BR usados
 * pela UI. O backend modela apenas dois papéis estritamente jurídicos
 * (`CONTRACTOR` = quem contrata, `HIRED` = quem é contratado).
 *
 * Os tipos comerciais usados nos mocks (`Cliente | Fornecedor | Parceiro
 * | Interno`) NÃO existem no backend — não tente derivá-los de `PartyType`.
 */

export type BackendPartyType = "CONTRACTOR" | "HIRED";

const PARTY_LABEL_PT: Record<BackendPartyType, string> = {
  CONTRACTOR: "Contratante",
  HIRED: "Contratada",
};

export function getPartyLabel(type: string | null | undefined): string {
  if (!type) return "Parte";
  const upper = type.toUpperCase() as BackendPartyType;
  return PARTY_LABEL_PT[upper] ?? type;
}

export function isBackendPartyType(value: string): value is BackendPartyType {
  return value === "CONTRACTOR" || value === "HIRED";
}
