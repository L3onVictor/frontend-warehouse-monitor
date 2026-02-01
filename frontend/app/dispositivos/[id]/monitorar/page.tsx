"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { buscarDispositivo, buscarTemperaturas, buscarUmidade, buscarUltimaMedicao, type Dispositivo, type Medicao } from "@/services/api";
import { TemperatureReading, converterMedicaoParaTemperatureReading } from "@/app/(private)/dashboard/components/types";
import { TemperatureChart } from "@/app/(private)/dashboard/components/Graficos";
import { UmidadeChart } from "@/app/(private)/dashboard/components/UmidadeChart";
import { SummaryCards } from "@/app/(private)/dashboard/components/SummaryCards";

export default function DeviceMonitorPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [device, setDevice] = useState<Dispositivo | null>(null);
    const [temperatureData, setTemperatureData] = useState<TemperatureReading[]>([]);
    const [umidadeData, setUmidadeData] = useState<TemperatureReading[]>([]);
    const [currentTemp, setCurrentTemp] = useState<Medicao | null>(null);
    const [currentHum, setCurrentHum] = useState<Medicao | null>(null);
    const [loading, setLoading] = useState(true);

    // Separate effect for real-time current status (every 5s) independent of filters
    useEffect(() => {
        const fetchCurrent = async () => {
            if (!device) return;
            try {
                const [t, h] = await Promise.all([
                    buscarUltimaMedicao(device.id, "temperatura"),
                    buscarUltimaMedicao(device.id, "umidade")
                ]);
                if (t) setCurrentTemp(t);
                if (h) setCurrentHum(h);
            } catch (e) {
                console.error("Error fetching current values", e);
            }
        };

        if (device) {
            fetchCurrent();
            const interval = setInterval(fetchCurrent, 5000);
            return () => clearInterval(interval);
        }
    }, [device]);

    // Filters (mock UI for now, fetching all history or implementing simple logic later)
    const [period, setPeriod] = useState<"24h" | "7d" | "30d">("24h");

    useEffect(() => {
        const fetchDeviceAndData = async () => {
            try {
                setLoading(true);
                const dev = await buscarDispositivo(resolvedParams.id);
                setDevice(dev || null);

                if (dev) {
                    // Calculate start date based on period
                    const now = new Date();
                    let start = new Date();

                    if (period === "24h") {
                        start.setHours(now.getHours() - 24);
                    } else if (period === "7d") {
                        start.setDate(now.getDate() - 7);
                    } else if (period === "30d") {
                        start.setDate(now.getDate() - 30);
                    }

                    // For this simple dash, we just get everything from that start date until now.
                    // If period is changed, we refetch.

                    const [temp, hum] = await Promise.all([
                        buscarTemperaturas(undefined, dev.id, start),
                        buscarUmidade(undefined, dev.id, start)
                    ]);

                    const sortByTimestamp = (arr: TemperatureReading[]) =>
                        arr.sort((a, b) => {
                            const dataA = new Date(a.timestamp || a.createdAt || "").getTime();
                            const dataB = new Date(b.timestamp || b.createdAt || "").getTime();
                            return dataA - dataB;
                        });

                    setTemperatureData(sortByTimestamp(temp.map(converterMedicaoParaTemperatureReading)));
                    setUmidadeData(sortByTimestamp(hum.map(converterMedicaoParaTemperatureReading)));
                }
            } catch (error) {
                console.error("Error fetching monitor data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceAndData();

        // Poll every 30s
        const interval = setInterval(fetchDeviceAndData, 30000);
        return () => clearInterval(interval);
    }, [resolvedParams.id, period]); // intended: re-fetch if period supports it (backend needs filter support update first for period)

    if (loading && !device) return <div className="p-8">Carregando monitoramento...</div>;

    if (!device) return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Dispositivo não encontrado no sistema</h2>
            <Link href="/dispositivos" className="text-blue-600 hover:underline mt-4 block">Voltar para lista</Link>
        </div>
    );

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/dispositivos" className="hover:text-gray-700">Dispositivos</Link>
                        <span>/</span>
                        <Link href={`/dispositivos/${device.id}`} className="hover:text-gray-700">{device.nome}</Link>
                        <span>/</span>
                        <span>Monitoramento</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Monitoramento: {device.nome}
                    </h1>
                </div>

                {/* Filter Controls (Top Right) */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-1 flex">
                    {(["24h", "7d", "30d"] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${period === p
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                        >
                            {p === "24h" ? "Últimas 24h" : p === "7d" ? "7 Dias" : "30 Dias"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="space-y-6">

                {/* Current Measurements Highlight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Temperature Card - Softer Gradient */}
                    <div className="relative overflow-hidden group bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-600 dark:to-orange-700 rounded-2xl p-6 shadow-lg text-white">
                        <div className="flex justify-between items-start z-10 relative">
                            <div>
                                <p className="text-amber-50 font-medium text-sm">Temperatura Atual</p>
                                <p className="text-5xl font-bold mt-2 tracking-tight">
                                    {currentTemp ? `${currentTemp.valor}ºC` : "--"}
                                </p>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                                </svg>
                            </div>
                        </div>
                        {currentTemp && (
                            <div className="mt-4 flex items-center gap-2 text-xs text-amber-50/90 font-medium">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    {new Date(currentTemp.createdAt || "").toLocaleString('pt-BR')}
                                </span>
                            </div>
                        )}
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                    </div>

                    {/* Humidity Card */}
                    <div className="relative overflow-hidden group bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-700 rounded-2xl p-6 shadow-lg text-white">
                        <div className="flex justify-between items-start z-10 relative">
                            <div>
                                <p className="text-blue-50 font-medium text-sm">Umidade Atual</p>
                                <p className="text-5xl font-bold mt-2 tracking-tight">
                                    {currentHum ? `${currentHum.valor}%` : "--"}
                                </p>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a6 6 0 0 1-6-6c0-3.3 6-11 6-11s6 7.7 6 11a6 6 0 0 1-6 6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2" />
                                </svg>
                            </div>
                        </div>
                        {currentHum && (
                            <div className="mt-4 flex items-center gap-2 text-xs text-blue-50/90 font-medium">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    {new Date(currentHum.createdAt || "").toLocaleString('pt-BR')}
                                </span>
                            </div>
                        )}
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                    </div>
                </div>

                {/* Reusing Summary Cards */}
                <SummaryCards temperatureData={temperatureData} umidadeData={umidadeData} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Charts */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Temperatura</h3>
                        {temperatureData.length > 0 ? (
                            <TemperatureChart data={temperatureData} />
                        ) : <p className="text-center text-gray-500 py-10">Sem dados de temperatura.</p>}
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Umidade</h3>
                        {umidadeData.length > 0 ? (
                            <UmidadeChart data={umidadeData} />
                        ) : <p className="text-center text-gray-500 py-10">Sem dados de umidade.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
