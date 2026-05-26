"use client";

import { use, useState, useEffect } from "react";
import { workspacesService } from "@/lib/services/workspaces.service";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const { isAuthenticated, isLoading } = useAuth();
  const [isAccepting, setIsAccepting] = useState(false);
  const [done, setDone] = useState(false);

  const handleAccept = async () => {
    if (!isAuthenticated) {
      toast.error("Autenticação necessária", {
        description: "Você precisa criar uma conta ou fazer login para aceitar este convite."
      });
      // Salva o token para ser usado pós-registro/login
      localStorage.setItem('pending_invite_token', token);
      window.location.href = `/register`;
      return;
    }

    setIsAccepting(true);
    try {
      await workspacesService.acceptInvite(token);
      toast.success("Bem-vindo à equipe!", {
        description: "O convite foi aceito com sucesso."
      });
      setDone(true);
      setTimeout(() => { 
        window.location.href = '/'; 
      }, 2000);
    } catch(err: any) {
      toast.error("Erro ao processar convite", { description: err.message || "O convite pode estar expirado ou inválido." });
    } finally {
      setIsAccepting(false);
    }
  };

  // Se o usuário acabar de criar a conta e ainda tiver um convite pendente
  useEffect(() => {
    const pendingToken = localStorage.getItem('pending_invite_token');
    if (isAuthenticated && !isLoading && pendingToken === token) {
      localStorage.removeItem('pending_invite_token');
      handleAccept();
    }
  }, [isAuthenticated, isLoading, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin h-12 w-12 text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--background)] p-4">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--background)] p-8 text-center border-b border-[var(--border)]">
          <div className="mx-auto w-16 h-16 bg-[var(--primary)] text-white flex items-center justify-center rounded-2xl shadow-lg mb-6 shadow-[var(--primary)]/20">
            <MailCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Você foi convidado!</h1>
          <p className="text-[var(--muted-foreground)] mt-2 text-sm">
            Uma empresa enviou um convite para você participar do NexusDoc.
          </p>
        </div>

        <div className="p-8">
          {done ? (
            <div className="text-center space-y-4">
              <ShieldCheck size={48} className="text-green-500 mx-auto" />
              <h2 className="text-lg font-bold">Acesso Liberado</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Redirecionando para o seu dashboard...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {!isAuthenticated && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl">
                  <p className="text-xs text-amber-800 dark:text-amber-200 font-medium text-center">
                    Será necessário criar uma senha para o seu acesso caso seja a sua primeira vez na plataforma.
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleAccept} 
                disabled={isAccepting}
                className="w-full h-12 text-base font-bold"
              >
                {isAccepting ? (
                  <><Loader2 className="animate-spin mr-2" size={20}/> Processando...</>
                ) : (
                  <>Aceitar Convite e Entrar <ArrowRight className="ml-2" size={18}/></>
                )}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
