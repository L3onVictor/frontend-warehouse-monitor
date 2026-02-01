"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listarAmbientes, listarDispositivos, type Ambiente, type Dispositivo } from "@/services/api";

export default function AmbientesPage() {
    const [environments, setEnvironments] = useState<Ambiente[]>([]);
    const [devices, setDevices] = useState<Dispositivo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [envs, allDevices] = await Promise.all([
                    listarAmbientes(),
                    listarDispositivos()
                ]);
                setEnvironments(envs);
                setDevices(allDevices);
            } catch (error) {
                console.error("Failed to fetch environments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-6 md:p-8">Carregando ambientes...</div>;
    }

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Ambientes
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie as áreas da sua empresa.
                    </p>
                </div>
                <Link
                    href="/ambientes/novo"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novo Ambiente
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {environments.map((env) => {
                    const deviceCount = devices.filter(d => d.ambienteId === env.id).length;

                    return (
                        <div key={env.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{env.nome}</h3>
                                    {env.descricao && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{env.descricao}</p>}
                                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300 mt-2 inline-block">
                                        {env.tipo}
                                    </span>
                                </div>
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Total de Dispositivos</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{deviceCount}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <Link
                                    href={`/ambientes/${env.id}`}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 transition-colors"
                                >
                                    Detalhes
                                </Link>
                                <Link
                                    href={`/dispositivos?env=${env.id}`}
                                    className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-transparent rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors"
                                >
                                    Ver dispositivos &rarr;
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
