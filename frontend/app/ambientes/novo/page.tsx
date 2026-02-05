"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { criarAmbiente } from "@/services/api";

export default function NewEnvironmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const nome = formData.get("name") as string;
        const descricao = formData.get("description") as string;
        const tipo = formData.get("type") as "frio" | "arejado";
        const temperatura_minima = parseFloat(formData.get("temperatura_minima") as string);
        const temperatura_maxima = parseFloat(formData.get("temperatura_maxima") as string);
        const umidade_minima = parseFloat(formData.get("umidade_minima") as string);
        const umidade_maxima = parseFloat(formData.get("umidade_maxima") as string);

        try {
            await criarAmbiente({
                nome,
                descricao,
                tipo,
                temperatura_minima,
                temperatura_maxima,
                umidade_minima,
                umidade_maxima,
            });
            router.push("/ambientes");
        } catch (error) {
            console.error("Failed to create environment", error);
            alert("Erro ao criar ambiente. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-8">
            <div className="mb-8">
                <Link
                    href="/ambientes"
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 mb-2"
                >
                    ← Voltar para lista
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Novo Ambiente
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Adicione um novo ambiente para organizar seus dispositivos.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome do Ambiente
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Galpão B"
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Tipo
                        </label>
                        <select
                            name="type"
                            id="type"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        >
                            <option value="arejado">Arejado</option>
                            <option value="frio">Refrigerado (Frio)</option>
                        </select>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Descrição (Opcional)
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Área de armazenamento secundária..."
                        />
                    </div>

                    {/* Range de Temperatura */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="temperatura_minima" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Temperatura Mínima (°C)
                            </label>
                            <input
                                type="number"
                                name="temperatura_minima"
                                id="temperatura_minima"
                                required
                                step="0.1"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                                placeholder="Ex: 10"
                            />
                        </div>
                        <div>
                            <label htmlFor="temperatura_maxima" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Temperatura Máxima (°C)
                            </label>
                            <input
                                type="number"
                                name="temperatura_maxima"
                                id="temperatura_maxima"
                                required
                                step="0.1"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                                placeholder="Ex: 25"
                            />
                        </div>
                    </div>

                    {/* Range de Umidade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="umidade_minima" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Umidade Mínima (%)
                            </label>
                            <input
                                type="number"
                                name="umidade_minima"
                                id="umidade_minima"
                                required
                                step="0.1"
                                min="0"
                                max="100"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                                placeholder="Ex: 30"
                            />
                        </div>
                        <div>
                            <label htmlFor="umidade_maxima" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Umidade Máxima (%)
                            </label>
                            <input
                                type="number"
                                name="umidade_maxima"
                                id="umidade_maxima"
                                required
                                step="0.1"
                                min="0"
                                max="100"
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                                placeholder="Ex: 70"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link
                        href="/ambientes"
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Salvando..." : "Adicionar Ambiente"}
                    </button>
                </div>
            </form>
        </div>
    );
}
