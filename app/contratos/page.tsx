import { Topbar } from "@/components/layout/topbar";
import { ContractsTable } from "@/components/dashboard/contracts-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContratosPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Contratos"
        subtitle="Gerencie todos os seus contratos"
        action={
          <div className="flex gap-2">
            <Link href="/categorias/nova">
              <Button variant="outline" size="sm">
                + Categoria
              </Button>
            </Link>
            <Link href="/contratos/novo">
              <Button size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Novo Contrato
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden p-6">
        <ContractsTable />
      </div>
    </div>
  );
}
