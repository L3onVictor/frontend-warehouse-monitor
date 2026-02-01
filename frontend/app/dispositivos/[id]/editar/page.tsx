"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buscarDispositivo, atualizarDispositivo, listarAmbientes, type Dispositivo, type Ambiente } from "@/services/api";

export default function EditDevicePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [device, setDevice] = useState<Dispositivo | null>(null);
    const [environments, setEnvironments] = useState<Ambiente[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [foundDevice, envs] = await Promise.all([
                    buscarDispositivo(resolvedParams.id),
                    listarAmbientes()
                ]);
                setDevice(foundDevice || null);
                setEnvironments(envs);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchData();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const nome = formData.get("name") as string;
        const ambienteId = formData.get("ambienteId") as string;

        try {
            await atualizarDispositivo(
                resolvedParams.id,
                nome,
                ambienteId || undefined // if empty string, pass undefined
            );
            router.push(`/dispositivos/${resolvedParams.id}`);
        } catch (error) {
            console.error("Failed to update device", error);
            // Handle error (maybe show a toast/alert)
            alert("Erro ao atualizar dispositivo.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="p-8">Carregando...</div>;
    if (!device) return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Dispositivo não encontrado</h2>
            <Link href="/dispositivos" className="text-blue-600 hover:underline mt-4 block">Voltar para lista</Link>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-8">
            <div className="mb-8">
                <Link
                    href={`/dispositivos/${resolvedParams.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 transition-colors mb-4"
                >
                    ← Voltar para detalhes
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Editar Dispositivo
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Atualize as informações do dispositivo.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="space-y-6">
                    {/* ID (Read-only) */}
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            ID do Dispositivo
                        </label>
                        <input
                            type="text"
                            id="id"
                            disabled
                            value={device.id}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-gray-400 sm:text-sm cursor-not-allowed"
                        />
                    </div>

                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome do Dispositivo
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={device.nome}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Sensor Temperatura Sala 01"
                        />
                    </div>

                    {/* Ambiente */}
                    <div>
                        <label htmlFor="ambienteId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Ambiente
                        </label>
                        <select
                            id="ambienteId"
                            name="ambienteId"
                            defaultValue={device.ambienteId || ""}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        >
                            <option value="">Selecionar ambiente (opcional)</option>
                            {environments.map((env) => (
                                <option key={env.id} value={env.id}>
                                    {env.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link
                        href={`/dispositivos/${resolvedParams.id}`}
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </div>
    );
}
