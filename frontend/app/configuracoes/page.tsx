"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { atualizarUsuario } from '@/services/api';

type Prefs = {
  global: boolean;
  byEnv: Record<string, boolean>;
}

export default function ConfiguracoesPage() {
  const { user, setUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [prefs, setPrefs] = useState<Prefs>({ global: true, byEnv: {} });

  useEffect(() => {
    if (user) {
      const raw = localStorage.getItem(`prefs_${user.id}`);
      if (raw) {
        try { setPrefs(JSON.parse(raw)); } catch { }
      } else {
        // Initialize from backend user value when no local prefs saved
        setPrefs({ global: !!user.receberEmail, byEnv: {} });
      }
    }
  }, [user]);

  if (!user) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 text-center max-w-sm">
        <p className="mb-4 text-gray-700 dark:text-gray-200">Você precisa estar logado para acessar as configurações.</p>
        <Link href="/login" className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium">
          Entrar
        </Link>
      </div>
    </div>
  );

  const toggleGlobal = () => {
    const next = { ...prefs, global: !prefs.global };
    setPrefs(next);
  }

  const savePreferences = async () => {
    if (!user) return;
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      localStorage.setItem(`prefs_${user.id}`, JSON.stringify(prefs));
      // Persist preference to backend
      try {
        await atualizarUsuario(user.id, { receberEmail: prefs.global });
      } catch (apiErr) {
        console.error('Erro ao atualizar usuário no backend', apiErr);
        // continue — still update local UI state
      }

      setUser({ ...user, receberEmail: prefs.global });
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao salvar preferências', err);
      setError('Erro ao salvar preferências');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configurações</h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie suas preferências.</p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex gap-3 animate-in fade-in">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-700 dark:text-green-200">Alterações salvas com sucesso!</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Notifications Content (No Tabs) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Section: Notificações Gerais */}
            <div className="pb-8 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notificações por Email</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receba alertas sobre eventos em seus ambientes.</p>
                </div>
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>

              <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition group">
                <input
                  type="checkbox"
                  checked={prefs.global}
                  onChange={toggleGlobal}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">Receber emails de aviso</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ative para receber notificações gerais sobre alertas em qualquer ambiente.</p>
                </div>
              </label>
            </div>

          </div>

          {/* Footer / Actions */}
          <div className="px-6 md:px-8 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
            <button
              onClick={savePreferences}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                "Salvar Preferências"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
