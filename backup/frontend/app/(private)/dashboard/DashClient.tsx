'use client';

import { useEffect, useMemo, useState } from "react";
import { TemperatureChart } from "./components/Graficos";
import { UmidadeChart } from "./components/UmidadeChart";
import { SummaryCards } from "./components/SummaryCards";
import {
  TemperatureReading,
  converterMedicaoParaTemperatureReading,
} from "./components/types";
import { buscarTemperaturas, buscarUmidade, listarAmbientes, type Ambiente } from "@/services/api";
import { PeriodoFiltro } from "./components/filters/types";
import { filtrarPeriodo } from "./components/filters/FiltrarPeriodos";
import { PeriodoFilter } from "./components/PeriodoFilter";
import { DatePicker } from "./components/filters/DatePicker";

export default function DashboardPage() {
  const [temperatureData, setTemperatureData] = useState<TemperatureReading[]>([]);
  const [umidadeData, setUmidadeData] = useState<TemperatureReading[]>([]);
  const [periodo, setPeriodo] = useState<PeriodoFiltro>('mes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<{ start: Date; end: Date }>(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start, end: now };
  });
  const [environments, setEnvironments] = useState<Ambiente[]>([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>(undefined);


  // 🔥 Dados filtrados (derivados)
  const temperatureFiltrada = useMemo(
    () => filtrarPeriodo(temperatureData, periodo, dataSelecionada),
    [temperatureData, periodo, dataSelecionada]
  );

  const umidadeFiltrada = useMemo(
    () => filtrarPeriodo(umidadeData, periodo, dataSelecionada),
    [umidadeData, periodo, dataSelecionada]
  );

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        setError(null);

        // Buscar ambientes uma vez
        try {
          const envs = await listarAmbientes();
          setEnvironments(envs);
        } catch (e) {
          // não bloquear se falhar listar ambientes
          console.warn("Falha ao listar ambientes:", e);
        }

        const [medicoesTemp, medicoesUmidade] = await Promise.all([
          buscarTemperaturas(selectedAmbiente),
          buscarUmidade(selectedAmbiente),
        ]);

        const tempConvertidos = medicoesTemp.map(converterMedicaoParaTemperatureReading);
        const umidadeConvertidos = medicoesUmidade.map(converterMedicaoParaTemperatureReading);

        const sortByTimestamp = (arr: TemperatureReading[]) =>
          arr.sort((a, b) => {
            const dataA = new Date(a.timestamp || a.createdAt || "").getTime();
            const dataB = new Date(b.timestamp || b.createdAt || "").getTime();
            return dataA - dataB;
          });

        setTemperatureData(sortByTimestamp(tempConvertidos));
        setUmidadeData(sortByTimestamp(umidadeConvertidos));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Falha ao carregar dados de sensores");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
    const interval = setInterval(carregarDados, 30000);
    return () => clearInterval(interval);
  }, [selectedAmbiente]);

  if (loading && temperatureData.length === 0 && umidadeData.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard de Sensores</h1>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error && temperatureData.length === 0 && umidadeData.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard de Sensores</h1>
        <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard de Sensores</h1>

      {/* 🎛️ Filtro de período */}
      <div className="flex flex-wrap gap-4 items-center">
        <PeriodoFilter value={periodo} onChange={setPeriodo} />

        <div>
          <label className="sr-only">Ambiente</label>
          <select
            value={selectedAmbiente || ''}
            onChange={(e) => setSelectedAmbiente(e.target.value || undefined)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
          >
            <option value="">Todos os Ambientes</option>
            {environments.map(env => (
              <option key={env.id} value={env.id}>{env.nome}</option>
            ))}
          </select>
        </div>

        <DatePicker
          periodo={periodo}
          data={dataSelecionada}
          onChange={setDataSelecionada}
        />
      </div>
      <SummaryCards
        temperatureData={temperatureFiltrada}
        umidadeData={umidadeFiltrada}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperatureChart data={temperatureFiltrada} />
        <UmidadeChart data={umidadeFiltrada} />
      </div>
    </div>
  );
}
