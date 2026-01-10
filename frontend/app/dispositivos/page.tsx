"use client";

import Link from "next/link";
import { useDevices } from "@/contexts/DevicesContext";
import { DeviceCard } from "@/components/devices/DeviceCard";

export default function DispositivosPage() {
    const { devices } = useDevices();

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dispositivos
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie seus sensores e controladores IoT.
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

            {/* Stats (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Dispositivos</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Online</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.filter(d => d.status === 'online').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Ativos</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.filter(d => d.isActive).length}</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device) => (
                    <DeviceCard key={device.id} device={device} />
                ))}
            </div>

            {devices.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sem dispositivos</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Comece criando um novo dispositivo.</p>
                    <div className="mt-6">
                        <Link
                            href="/dispositivos/novo"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Novo Dispositivo
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
