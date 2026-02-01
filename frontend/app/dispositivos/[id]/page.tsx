"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buscarDispositivo, removerDispositivo, listarAmbientes, type Dispositivo } from "@/services/api";

export default function DeviceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    const [device, setDevice] = useState<Dispositivo | null>(null);
    const [environmentName, setEnvironmentName] = useState<string>("Carregando...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foundDevice = await buscarDispositivo(resolvedParams.id);
                setDevice(foundDevice || null);

                if (foundDevice && foundDevice.ambienteId) {
                    const envs = await listarAmbientes();
                    const env = envs.find(e => e.id === foundDevice.ambienteId);
                    setEnvironmentName(env ? env.nome : "Desconhecido (ID inválido)");
                } else {
                    setEnvironmentName("Nenhum");
                }
            } catch (error) {
                console.error("Failed to fetch device details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [resolvedParams.id]);

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja excluir este dispositivo?")) {
            try {
                await removerDispositivo(resolvedParams.id);
                router.push("/dispositivos");
            } catch (error) {
                console.error("Error removing device", error);
                alert("Erro ao excluir dispositivo.");
            }
        }
    };

    if (loading) return <div className="p-8">Carregando...</div>;
    if (!device) return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Dispositivo não encontrado</h2>
            <Link href="/dispositivos" className="text-blue-600 hover:underline mt-4 block">Voltar para lista</Link>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/dispositivos"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 transition-colors"
                >
                    ← Voltar para lista
                </Link>

                <div className="flex gap-2">
                    <Link
                        href={`/dispositivos/${resolvedParams.id}/editar`}
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
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{device.nome || "Dispositivo sem nome"}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">{device.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID do Sistema</h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-slate-900 p-2 rounded border border-gray-100 dark:border-slate-700">
                            {device.id}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ambiente Vinculado</h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                            {environmentName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
