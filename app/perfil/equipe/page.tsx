"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { workspacesService } from "@/lib/services/workspaces.service";
import { toast } from "sonner";
import { Loader2, Send, Users, ShieldAlert } from "lucide-react";

export default function EquipePage() {
  const { activeWorkspace } = useAuth();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'LEGAL' | 'FINANCE' | 'VIEWER'>('VIEWER');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail) return toast.error("Preencha o e-mail");
    setIsInviting(true);
    try {
      await workspacesService.inviteMember({ email: inviteEmail, role: inviteRole });
      toast.success("Convite enviado via Resend!", { 
        description: `O e-mail foi disparado para ${inviteEmail} contendo o link de acesso seguro.`
      });
      setInviteEmail("");
    } catch(err: any) {
      toast.error("Erro ao enviar convite", { description: err.message || "Verifique se o backend está rodando e com a API KEY do Resend configurada." });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar 
        title="Gestão de Equipe" 
        subtitle={activeWorkspace ? `Membros e convites do workspace: ${activeWorkspace.name}` : "Carregando..."} 
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Card de Convite */}
          <div className="p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--foreground)] mb-2">
              <Send size={22} className="text-[var(--primary)]" /> 
              Convidar Novo Membro
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              Insira o e-mail do colaborador e o nível de acesso. Ele receberá um link na caixa de entrada para se juntar ao Workspace.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Ex: colaborador@empresa.com" 
                  type="email"
                  value={inviteEmail} 
                  onChange={e => setInviteEmail(e.target.value)}
                  className="bg-[var(--background)] h-11"
                />
              </div>
              <div className="w-full md:w-48">
                <select 
                  className="w-full h-11 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-md px-3 text-sm focus:ring-1 focus:ring-[var(--primary)] outline-none" 
                  value={inviteRole} 
                  onChange={e => setInviteRole(e.target.value as any)}
                >
                  <option value="VIEWER">Visualizador</option>
                  <option value="FINANCE">Financeiro</option>
                  <option value="LEGAL">Jurídico</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <Button onClick={handleInvite} disabled={isInviting} className="h-11 px-6 min-w-[150px]">
                {isInviting ? (
                  <><Loader2 className="animate-spin mr-2" size={18}/> Enviando...</>
                ) : (
                  <><Send size={18} className="mr-2"/> Enviar Convite</>
                )}
              </Button>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)] bg-[var(--accent)]/50 p-3 rounded-lg border border-[var(--border)]">
              <ShieldAlert size={16} className="text-amber-500 shrink-0" />
              <span>O cargo <strong>Administrador</strong> dá acesso total às configurações financeiras e controle da equipe.</span>
            </div>
          </div>

          {/* Lista Mockada de Membros */}
          <div className="p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--foreground)] mb-6">
              <Users size={22} className="text-[var(--primary)]" /> 
              Membros Atuais
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold">
                    VC
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--foreground)]">Você (Dono)</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Administrador Supremo</p>
                  </div>
                </div>
                <div className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-md font-bold">
                  ADMIN
                </div>
              </div>
              
              <div className="p-6 border border-dashed border-[var(--border)] rounded-lg text-center text-[var(--muted-foreground)] text-sm">
                Seus convidados aparecerão aqui após aceitarem o e-mail.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
