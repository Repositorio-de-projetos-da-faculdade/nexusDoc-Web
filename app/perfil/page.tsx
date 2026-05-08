"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PerfilPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  const [profile, setProfile] = useState({
    name: "Lucas Ferreira",
    role: "Administrador do Sistema",
    email: "lucas.ferreira@nexusdoc.com.br"
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      setEmailError("Por favor, insira um endereço de e-mail válido.");
      return;
    }
    
    setEmailError("");
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEmailError("");
    setIsEditing(false);
    setEditForm(profile);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Meu Perfil" subtitle="Gerencie suas informações e preferências" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Perfil Header */}
          <div className="flex items-start sm:items-center gap-6 p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] flex-col sm:flex-row">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-400)] to-[var(--brand-700)] flex items-center justify-center shrink-0">
              <span className="text-white text-3xl font-bold">{profile.name.charAt(0)}</span>
            </div>
            
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Nome</label>
                    <Input 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Cargo</label>
                    <Input 
                      value={editForm.role} 
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--muted-foreground)] mb-1 block">E-mail</label>
                    <Input 
                      value={editForm.email} 
                      onChange={(e) => {
                        setEditForm({...editForm, email: e.target.value});
                        if (emailError) setEmailError(""); // limpa erro ao digitar
                      }} 
                    />
                    {emailError && <p className="text-xs text-[var(--destructive)] mt-1">{emailError}</p>}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={handleSave}>Salvar</Button>
                    <Button variant="outline" size="sm" onClick={handleCancel}>Cancelar</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[var(--foreground)]">{profile.name}</h2>
                  <p className="text-[var(--muted-foreground)]">{profile.role}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{profile.email}</p>
                </>
              )}
            </div>

            {!isEditing && (
              <div className="sm:ml-auto w-full sm:w-auto mt-4 sm:mt-0">
                <Button variant="outline" size="sm" className="w-full" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </Button>
              </div>
            )}
          </div>

          {/* Preferências */}
          <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Preferências da Conta</h3>
            <div className="space-y-4">
              
              <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <div>
                  <p className="font-medium text-sm text-[var(--foreground)]">Notificações por Email</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Receber alertas de vencimento no email</p>
                </div>
                <div 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${emailNotif ? 'bg-[var(--primary)]' : 'bg-[var(--muted)] border border-[var(--border)]'}`}
                  onClick={() => setEmailNotif(!emailNotif)}
                >
                  <div className={`w-4 h-4 rounded-full absolute top-0.5 shadow-sm transition-all ${emailNotif ? 'bg-white right-0.5' : 'bg-white dark:bg-gray-400 left-0.5'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <div>
                  <p className="font-medium text-sm text-[var(--foreground)]">Autenticação em Duas Etapas</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Proteger conta com 2FA</p>
                </div>
                <div 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${twoFactor ? 'bg-[var(--primary)]' : 'bg-[var(--muted)] border border-[var(--border)]'}`}
                  onClick={() => setTwoFactor(!twoFactor)}
                >
                  <div className={`w-4 h-4 rounded-full absolute top-0.5 shadow-sm transition-all ${twoFactor ? 'bg-white right-0.5' : 'bg-white dark:bg-gray-400 left-0.5'}`}></div>
                </div>
              </div>

            </div>
            
            <div className="mt-8">
              <Button variant="destructive" size="sm" className="w-full sm:w-auto" onClick={() => alert('Saindo da conta...')}>
                Sair da Conta
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
