"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEnvironments } from "@/contexts/EnvironmentsContext";
import { cadastrarDispositivo } from "@/services/api";

export default function NewDevicePage() {
    const router = useRouter();
    const { environments } = useEnvironments();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);
            const id = formData.get("id") as string;
            const nome = formData.get("nome") as string;
            const ambienteId = formData.get("ambienteId") as string;

            // Validações
            if (!id || id.trim().length === 0) {
                throw new Error("ID/MAC Address é obrigatório");
            }

            // Chamar API para cadastrar
            await cadastrarDispositivo(
                id,
                nome || undefined,
                ambienteId || undefined
            );

            setSuccess(true);
            
            // Redirecionar após 1.5 segundos
            setTimeout(() => {
                router.push("/dispositivos");
            }, 1500);
        } catch (err: any) {
            setError(err.message || "Erro ao cadastrar dispositivo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-8">
            <div className="mb-8">
                <Link
                    href="/dispositivos"
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 mb-2"
                >
                    ← Voltar para lista
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Novo Dispositivo
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Registre um novo ESP ou sensor no sistema.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400">
                        Dispositivo cadastrado com sucesso! Redirecionando...
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ID/MAC Address */}
                    <div className="md:col-span-2">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            ID do Dispositivo (MAC/UUID) *
                        </label>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: 30:AE:A4:2A:C4:80 ou seu UUID"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Este ID identificará unicamente seu dispositivo ESP
                        </p>
                    </div>

                    {/* Nome */}
                    <div className="md:col-span-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome do Dispositivo
                        </label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Sensor Temperatura Sala 01"
                        />
                    </div>

                    {/* Ambiente */}
                    <div className="md:col-span-2">
                        <label htmlFor="ambienteId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Ambiente
                        </label>
                        <select
                            id="ambienteId"
                            name="ambienteId"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        >
                            <option value="">Selecionar ambiente (opcional)</option>
                            {environments.map((env) => (
                                <option key={env.id} value={env.id}>
                                    {env.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar Dispositivo"}
                    </button>
                    <Link
                        href="/dispositivos"
                        className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>

            {/* Info */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Dica:</strong> Você pode encontrar o ID do seu ESP nas configurações de rede do dispositivo ou impresso na placa.
                </p>
            </div>
        </div>
    );
}
