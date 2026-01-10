"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDevices, DeviceType } from "@/contexts/DevicesContext";

export default function DeviceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { getDevice, removeDevice, toggleDevice } = useDevices();

    const [device, setDevice] = useState<any>(null); // Using any momentarily to avoid TS issues if type isn't perfectly matched yet
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundDevice = getDevice(resolvedParams.id);
        if (foundDevice) {
            setDevice(foundDevice);
        } else {
            // Handle not found
        }
        setLoading(false);
    }, [resolvedParams.id, getDevice]);

    const handleDelete = () => {
        if (confirm("Tem certeza que deseja excluir este dispositivo?")) {
            removeDevice(resolvedParams.id);
            router.push("/dispositivos");
        }
    };

    const handleToggle = () => {
        toggleDevice(resolvedParams.id);
        // Force update local state
        setDevice((prev: any) => ({ ...prev, isActive: !prev.isActive }));
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
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
                >
                    ← Voltar para lista
                </Link>

                <div className="flex gap-2">
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
                        <div className={`p-4 rounded-lg ${device.type === "Sensor" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                                device.type === "ESP32" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" :
                                    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                            }`}>
                            {device.type === "Sensor" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{device.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {device.status === 'online' ? 'Online' : 'Offline'}
                                </span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{device.type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {device.isActive ? "Ligado" : "Desligado"}
                        </span>
                        <button
                            onClick={handleToggle}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${device.isActive ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${device.isActive ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            />
                        </button>
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
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Endereço MAC</h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                            {device.macAddress || "Não informado"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Localização</h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {device.location || "Não definida"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Última Atividade</h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {device.lastSeen || "Desconhecido"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
