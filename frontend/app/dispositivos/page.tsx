"use client";

import Link from "next/link";
import { useDevices } from "@/contexts/DevicesContext";
import { useEnvironments } from "@/contexts/EnvironmentsContext";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { useSearchParams } from "next/navigation";

export default function DispositivosPage() {
    const { devices } = useDevices();
    const { environments } = useEnvironments();
    const searchParams = useSearchParams();
    const envFilter = searchParams.get('env');

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dispositivos
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie seus sensores e controladores IoT por ambiente.
                    </p>
                </div>
                <Link
                    href="/dispositivos/novo"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novo Dispositivo
                </Link>
            </div>

            {/* Overall Stats (Optional - kept separate from environment sections) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    {/* ... (Kept stats implementation same as before for visual consistency if desired, or we can simplify) ... */}
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Dispositivos</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Online</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.filter(d => d.status === 'online').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Ativos</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.filter(d => d.isActive).length}</p>
                </div>
            </div>

            {/* Environment Sections */}
            <div className="space-y-10">
                {environments
                    .filter(env => !envFilter || env.id === envFilter)
                    .map(env => {
                        const envDevices = devices.filter(d => d.environmentId === env.id);
                        if (envDevices.length === 0 && envFilter) return null; // If filtering and no devices, maybe show empty state per env or just nothing?
                        // Let's show the section even if empty if it's not filtered, to show structure.

                        return (
                            <div key={env.id} className="space-y-4">
                                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {env.name}
                                    </h2>
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                        {envDevices.length}
                                    </span>
                                </div>

                                {envDevices.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {envDevices.map((device) => (
                                            <DeviceCard key={device.id} device={device} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Nenhum dispositivo neste ambiente.</p>
                                )}
                            </div>
                        );
                    })}

                {/* Unassigned Devices Section (if any) */}
                {devices.filter(d => !d.environmentId).length > 0 && !envFilter && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Sem Ambiente
                            </h2>
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {devices.filter(d => !d.environmentId).length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {devices.filter(d => !d.environmentId).map((device) => (
                                <DeviceCard key={device.id} device={device} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
