"use client";

import { Topbar } from "@/components/layout/topbar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentContracts } from "@/components/dashboard/recent-contracts";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { StatusChart } from "@/components/dashboard/status-chart";
import { UploadContractModal } from "@/components/dashboard/upload-contract-modal";

import { formatCurrency } from "@/lib/utils";
import { useContracts } from "@/hooks/use-contracts";
import type { Contract } from "@/types";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  PlusSquare, 
  Upload, 
  BarChart, 
  Bell
} from "lucide-react";

function getTotalValue(contracts: Contract[]) {
  return contracts.reduce((sum, c) => sum + c.value, 0);
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  const { contracts } = useContracts();
  
  const total = contracts.length;
  const active = contracts.filter((c) => c.status === "active").length;
  const pending = contracts.filter((c) => c.status === "pending").length;
  const totalValue = getTotalValue(contracts);

  const handleQuickAction = (label: string) => {
    toast.info(`Ação iniciada: ${label}`, {
      description: "Esta funcionalidade será implementada em breve.",
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--background)]">
      <Topbar
        title="Dashboard"
        subtitle="Visão geral dos contratos ativos"
        action={
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UploadContractModal />
          </motion.div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <MetricCard
              label="Total de Contratos"
              value={String(total)}
              delta="+2 este mês"
              deltaType="positive"
              icon={<FileText size={20} />}
              accent
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              label="Contratos Ativos"
              value={String(active)}
              delta={`${total > 0 ? Math.round((active / total) * 100) : 0}% do total`}
              deltaType="positive"
              icon={<CheckCircle size={20} />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              label="Pendentes"
              value={String(pending)}
              delta="Aguardando ação"
              deltaType="neutral"
              icon={<Clock size={20} />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              label="Valor Total"
              value={formatCurrency(totalValue)}
              delta="+12% vs. ant."
              deltaType="positive"
              icon={<DollarSign size={20} />}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="glass rounded-[var(--radius)] shadow-xl shadow-black/5 overflow-hidden border border-[var(--border)]">
              <RecentContracts />
            </div>
          </motion.div>
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="glass rounded-[var(--radius)] shadow-xl shadow-black/5 overflow-hidden border border-[var(--border)]">
              <AlertsPanel />
            </div>
            <div className="glass rounded-[var(--radius)] shadow-xl shadow-black/5 overflow-hidden border border-[var(--border)] p-4">
              <StatusChart />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">Ações Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Novo Contrato", icon: <PlusSquare size={24} />, desc: "Criar contrato" },
              { label: "Upload Documento", icon: <Upload size={24} />, desc: "Anexar arquivo" },
              { label: "Gerar Relatório", icon: <BarChart size={24} />, desc: "Exportar dados" },
              { label: "Configurar Alerta", icon: <Bell size={24} />, desc: "Vencimentos" },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => handleQuickAction(action.label)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-[var(--border)] glass hover:border-[var(--primary)]/50 hover:bg-gradient-to-br hover:from-[var(--card)] hover:to-[var(--accent)] transition-all duration-300 cursor-pointer text-left group shadow-sm hover:shadow-md"
              >
                <span className="text-2xl p-2 rounded-xl bg-[var(--accent)] text-[var(--primary)] group-hover:scale-110 transition-transform">{action.icon}</span>
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {action.desc}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
