"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDevices, DeviceType } from "@/contexts/DevicesContext";

export default function NewDevicePage() {
    const router = useRouter();
    const { addDevice } = useDevices();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const type = formData.get("type") as DeviceType;
        const macAddress = formData.get("macAddress") as string;
        const location = formData.get("location") as string;

        // Simulate API delay
        setTimeout(() => {
            addDevice({
                name,
                type,
                macAddress,
                location,
                lastSeen: "Nunca",
            });
            router.push("/dispositivos");
        }, 1000);
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
                    Preencha as informações abaixo para adicionar um novo dispositivo.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome do Dispositivo
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Sensor de Umidade 01"
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Tipo
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                        >
                            <option value="ESP32">ESP32</option>
                            <option value="Sensor">Sensor</option>
                            <option value="Atuador">Atuador</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    {/* MAC Address */}
                    <div>
                        <label htmlFor="macAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Endereço MAC / ID
                        </label>
                        <input
                            type="text"
                            name="macAddress"
                            id="macAddress"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="00:00:00:00:00:00"
                        />
                    </div>

                    {/* Localização */}
                    <div className="md:col-span-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Localização (Opcional)
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                            placeholder="Ex: Armazém 3, Prateleira B"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link
                        href="/dispositivos"
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Salvando..." : "Adicionar Dispositivo"}
                    </button>
                </div>
            </form>
        </div>
    );
}
