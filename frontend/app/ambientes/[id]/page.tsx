"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEnvironments } from "@/contexts/EnvironmentsContext";
import { useDevices } from "@/contexts/DevicesContext";

export default function EnvironmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { getEnvironment, removeEnvironment } = useEnvironments();
    const { devices } = useDevices();

    const [environment, setEnvironment] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundEnv = getEnvironment(resolvedParams.id);
        if (foundEnv) {
            setEnvironment(foundEnv);
        }
        setLoading(false);
    }, [resolvedParams.id, getEnvironment]);

    const handleDelete = () => {
        const linkedDevices = devices.filter(d => d.environmentId === resolvedParams.id);
        if (linkedDevices.length > 0) {
            if (!confirm(`Este ambiente possui ${linkedDevices.length} dispositivos vinculados. Ao excluir, eles ficarão sem ambiente. Deseja continuar?`)) {
                return;
            }
        } else {
            if (!confirm("Tem certeza que deseja excluir este ambiente?")) {
                return;
            }
        }

        removeEnvironment(resolvedParams.id);
        router.push("/ambientes");
    };

    if (loading) return <div className="p-8">Carregando...</div>;
    if (!environment) return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Ambiente não encontrado</h2>
            <Link href="/ambientes" className="text-blue-600 hover:underline mt-4 block">Voltar para lista</Link>
        </div>
    );

    const linkedDevicesCount = devices.filter(d => d.environmentId === environment.id).length;

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/ambientes"
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
                >
                    ← Voltar para lista
                </Link>

                <div className="flex gap-2">
                    <Link
                        href={`/ambientes/${environment.id}/editar`}
                        className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                    >
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-md transition-colors"
                    >
                        Excluir
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{environment.name}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {environment.id}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                            {environment.description || "Sem descrição."}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dispositivos Vinculados</h3>
                        <div className="mt-2 flex items-center gap-4">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{linkedDevicesCount}</span>
                            <Link
                                href={`/dispositivos?env=${environment.id}`}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Ver dispositivos vinculados &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
