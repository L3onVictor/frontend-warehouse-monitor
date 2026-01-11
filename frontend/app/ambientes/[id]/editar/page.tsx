"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEnvironments } from "@/contexts/EnvironmentsContext";

export default function EditEnvironmentPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { getEnvironment, updateEnvironment } = useEnvironments();

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [environment, setEnvironment] = useState<any>(null);

    useEffect(() => {
        const foundEnv = getEnvironment(resolvedParams.id);
        if (foundEnv) {
            setEnvironment(foundEnv);
        }
        setInitialLoading(false);
    }, [resolvedParams.id, getEnvironment]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        // Simulate API delay
        setTimeout(() => {
            updateEnvironment(resolvedParams.id, {
                name,
                description,
            });
            router.push(`/ambientes/${resolvedParams.id}`);
        }, 1000);
    };

    if (initialLoading) return <div className="p-8">Carregando...</div>;
    if (!environment) return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Ambiente não encontrado</h2>
            <Link href="/ambientes" className="text-blue-600 hover:underline mt-4 block">Voltar para lista</Link>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-8">
            <div className="mb-8">
                <Link
                    href={`/ambientes/${resolvedParams.id}`}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 mb-2"
                >
                    ← Voltar para detalhes
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Editar Ambiente
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Atualize as informações do ambiente.
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
                            defaultValue={environment.name}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        />
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
                            defaultValue={environment.description}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link
                        href={`/ambientes/${resolvedParams.id}`}
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
