"use client";

import Link from "next/link";
import { Dispositivo, buscarUltimaMedicao } from "@/services/api";
import { useState, useEffect } from "react";

interface DeviceCardProps {
    device: Dispositivo;
}

export function DeviceCard({ device }: DeviceCardProps) {
    // Toggle functionality temporarily disabled during migration
    // const { toggleDevice } = useDevices(); 

    const [temp, setTemp] = useState<number | null>(null);
    const [hum, setHum] = useState<number | null>(null);

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                // Fetch both concurrently
                const [lastTemp, lastHum] = await Promise.all([
                    buscarUltimaMedicao(device.id, "temperatura"),
                    buscarUltimaMedicao(device.id, "umidade")
                ]);

                if (lastTemp) setTemp(lastTemp.valor);
                if (lastHum) setHum(lastHum.valor);
            } catch (error) {
                // Silently fail or log debug
                // console.debug("Error fetching device measurements", error);
            }
        };

        // Initial fetch
        fetchMeasurements();

        // Poll every 5 seconds
        const interval = setInterval(fetchMeasurements, 5000);

        return () => clearInterval(interval);
    }, [device.id]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {/* Icon based on type */}
                    <div className={`p-3 rounded-lg ${device.nome?.includes("Sensor") ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}>
                        {/* Simple icon logic based on name for now as 'type' is not in backend entity yet */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{device.nome || "Sem Nome"}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{device.id}</p>
                    </div>
                </div>
                {/* Status is not yet in backend entity, stubbing */}
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`}>
                    Offline
                </div>
            </div>

            <div className="space-y-4">
                {/* IsActive and Toggle removed/hidden until backend supports it */}
                {/* 
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Status:</span>
                    <span className={device.isActive ? "text-green-600 font-medium" : "text-gray-500"}>
                        {device.isActive ? "Ativo" : "Inativo"}
                    </span>
                </div>
                */}

                <div className="flex items-center justify-end">
                    {/* Measurements Display */}
                    <div className="flex-1 flex gap-4 mr-4">
                        {/* Temp */}
                        <div className="flex items-center gap-1.5 text-sm">
                            <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {/* Classic Thermometer Shape */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                                {temp ? `${temp}ºC` : "--"}
                            </span>
                        </div>
                        {/* Humidity */}
                        <div className="flex items-center gap-1.5 text-sm">
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a6 6 0 0 1-6-6c0-3.3 6-11 6-11s6 7.7 6 11a6 6 0 0 1-6 6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2" /> {/* Little drop detail */}
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                                {hum ? `${hum}%` : "--"}
                            </span>
                        </div>
                    </div>

                    {/* Toggle button removed */}
                    <Link
                        href={`/dispositivos/${device.id}/monitorar`}
                        className="px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40 mr-2"
                    >
                        Monitorar
                    </Link>
                    <Link
                        href={`/dispositivos/${device.id}`}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                    >
                        Detalhes →
                    </Link>
                </div>
            </div>
        </div>
    );
}
