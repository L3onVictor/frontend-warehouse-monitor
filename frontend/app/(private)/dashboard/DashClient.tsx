'use client';

import { useEffect, useMemo, useState } from "react";
import { TemperatureChart } from "./components/Graficos";
import { UmidadeChart } from "./components/UmidadeChart";
import { SummaryCards } from "./components/SummaryCards";
import {
  TemperatureReading,
  converterMedicaoParaTemperatureReading,
} from "./components/types";
import { buscarTemperaturas, buscarUmidade } from "@/services/api";
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
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());


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

        const [medicoesTemp, medicoesUmidade] = await Promise.all([
          buscarTemperaturas(),
          buscarUmidade(),
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
  }, []);

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
