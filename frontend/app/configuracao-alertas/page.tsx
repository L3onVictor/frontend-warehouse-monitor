"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { listarAmbientes, atualizarAmbiente, type Ambiente } from "@/services/api";

type Prefs = {
    global: boolean;
    byEnv: Record<string, boolean>;
}

export default function ConfiguracaoAlertasPage() {
    const { user } = useAuth();
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [prefs, setPrefs] = useState<Prefs>({ global: true, byEnv: {} });

    // State for environment editing (Environment ID -> Modified Environment)
    const [editedAmbientes, setEditedAmbientes] = useState<Record<string, Ambiente>>({});
    const [savingEnv, setSavingEnv] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const envs = await listarAmbientes();
                setAmbientes(envs);
            } catch (err) {
                console.error('Erro ao carregar ambientes', err);
            } finally {
                setLoading(false);
            }
        }
        load();

        if (user) {
            const raw = localStorage.getItem(`prefs_${user.id}`);
            if (raw) {
                try { setPrefs(JSON.parse(raw)); } catch { }
            }
        }
    }, [user]);

    // ---- Preferences Logic ----
    const savePreferences = (newPrefs: Prefs) => {
        if (!user) return;
        setPrefs(newPrefs);
        localStorage.setItem(`prefs_${user.id}`, JSON.stringify(newPrefs));
    }

    const toggleEnv = (id: string) => {
        const next = { ...prefs, byEnv: { ...prefs.byEnv, [id]: !prefs.byEnv[id] } };
        savePreferences(next);
    }

    // ---- Environment Edit Logic ----
    const handleEnvChange = (id: string, field: keyof Ambiente, value: string | number) => {
        setEditedAmbientes(prev => {
            const original = ambientes.find(a => a.id === id);
            if (!original) return prev;

            // Get current state of this env in edit mode, or start with original
            const current = prev[id] || { ...original };

            return {
                ...prev,
                [id]: { ...current, [field]: value }
            };
        });
    };

    const saveAmbiente = async (id: string) => {
        const toSave = editedAmbientes[id];
        if (!toSave) return;

        setSavingEnv(id);
        try {
            await atualizarAmbiente(id, {
                nome: toSave.nome,
                descricao: toSave.descricao,
                temperatura_minima: Number(toSave.temperatura_minima),
                temperatura_maxima: Number(toSave.temperatura_maxima),
                umidade_minima: Number(toSave.umidade_minima),
                umidade_maxima: Number(toSave.umidade_maxima),
            });

            // Update local main state
            setAmbientes(prev => prev.map(a => a.id === id ? toSave : a));

            // Clear edit state for this env
            setEditedAmbientes(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });

        } catch (error) {
            console.error("Erro ao salvar ambiente", error);
            alert("Erro ao salvar alterações do ambiente.");
        } finally {
            setSavingEnv(null);
        }
    };

    const cancelEdit = (id: string) => {
        setEditedAmbientes(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configuração de Alertas</h1>
                    <p className="text-gray-500 dark:text-gray-400">Defina os limites de temperatura e recebimento de notificações.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : ambientes.length === 0 ? (
                    <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                        <p className="text-gray-500 dark:text-gray-400">Nenhum ambiente encontrado para configurar.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {ambientes.map(ambiente => {
                            const isEditing = !!editedAmbientes[ambiente.id];
                            const currentData = editedAmbientes[ambiente.id] || ambiente;
                            const isSaving = savingEnv === ambiente.id;

                            return (
                                <div key={ambiente.id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12">

                                        {/* Left: Checkbox & Info */}
                                        <div className="md:w-1/3 flex items-start gap-4">
                                            <input
                                                type="checkbox"
                                                checked={!!prefs.byEnv[ambiente.id]}
                                                onChange={() => toggleEnv(ambiente.id)}
                                                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ambiente.nome}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ambiente.descricao || "Sem descrição"}</p>
                                                <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                                                    {ambiente.tipo}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Limits Form */}
                                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">

                                            {/* Temperatura */}
                                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 flex flex-col justify-between">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="p-2 bg-white dark:bg-orange-900/30 rounded-lg shadow-sm">
                                                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-orange-100">Temperatura</h4>
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 ml-auto">
                                                        ºC
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 dark:text-orange-200/70 mb-1.5 ml-1">Mínima</label>
                                                        <input
                                                            type="number"
                                                            value={currentData.temperatura_minima}
                                                            onChange={(e) => handleEnvChange(ambiente.id, 'temperatura_minima', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-900/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-shadow"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 dark:text-orange-200/70 mb-1.5 ml-1">Máxima</label>
                                                        <input
                                                            type="number"
                                                            value={currentData.temperatura_maxima}
                                                            onChange={(e) => handleEnvChange(ambiente.id, 'temperatura_maxima', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-900/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-shadow"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Umidade */}
                                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex flex-col justify-between">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="p-2 bg-white dark:bg-blue-900/30 rounded-lg shadow-sm">
                                                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a6 6 0 0 1-6-6c0-3.3 6-11 6-11s6 7.7 6 11a6 6 0 0 1-6 6z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-blue-100">Umidade</h4>
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 ml-auto">
                                                        %
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 dark:text-blue-200/70 mb-1.5 ml-1">Mínima</label>
                                                        <input
                                                            type="number"
                                                            value={currentData.umidade_minima}
                                                            onChange={(e) => handleEnvChange(ambiente.id, 'umidade_minima', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-shadow"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 dark:text-blue-200/70 mb-1.5 ml-1">Máxima</label>
                                                        <input
                                                            type="number"
                                                            value={currentData.umidade_maxima}
                                                            onChange={(e) => handleEnvChange(ambiente.id, 'umidade_maxima', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-shadow"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Action Bar (Only shows when editing) */}
                                    {isEditing && (
                                        <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-800 flex items-center justify-between animate-in slide-in-from-top-2">
                                            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                                Você tem alterações não salvas neste ambiente.
                                            </span>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => cancelEdit(ambiente.id)}
                                                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={() => saveAmbiente(ambiente.id)}
                                                    disabled={isSaving}
                                                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 disabled:opacity-70"
                                                >
                                                    {isSaving ? "Salvando..." : "Confirmar Alterações"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
