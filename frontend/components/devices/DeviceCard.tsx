"use client";

import Link from "next/link";
import { Device, useDevices } from "@/contexts/DevicesContext";

interface DeviceCardProps {
    device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
    const { toggleDevice } = useDevices();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {/* Icon based on type */}
                    <div className={`p-3 rounded-lg ${device.type === "Sensor" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                            device.type === "ESP32" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" :
                                "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}>
                        {device.type === "Sensor" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{device.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{device.type}</p>
                    </div>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${device.status === "online"
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900"
                        : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                    }`}>
                    {device.status === "online" ? "Online" : "Offline"}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Status:</span>
                    <span className={device.isActive ? "text-green-600 font-medium" : "text-gray-500"}>
                        {device.isActive ? "Ativo" : "Inativo"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleDevice(device.id);
                        }}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${device.isActive ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                        role="switch"
                        aria-checked={device.isActive}
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${device.isActive ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </button>

                    <Link
                        href={`/dispositivos/${device.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        Detalhes →
                    </Link>
                </div>
            </div>
        </div>
    );
}
