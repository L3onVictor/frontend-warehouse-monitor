'use client';

import { useEffect, useState } from "react";
import { TemperatureChart } from "./components/Graficos";
import { UmidadeChart } from "./components/UmidadeChart";
import { SummaryCards } from "./components/SummaryCards";
import { TemperatureReading, converterMedicaoParaTemperatureReading } from "./components/types";
import { buscarTemperaturas, buscarUmidade } from "@/services/api";

export default function DashboardPage() {
  const [temperatureData, setTemperatureData] = useState<TemperatureReading[]>([]);
  const [umidadeData, setUmidadeData] = useState<TemperatureReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        setError(null);

        // Buscar ambos os dados em paralelo
        const [medicoeTemp, medicoesUmidade] = await Promise.all([
          buscarTemperaturas(),
          buscarUmidade(),
        ]);

        // Converter dados
        const tempConvertidos = medicoeTemp.map(converterMedicaoParaTemperatureReading);
        const umidadeConvertidos = medicoesUmidade.map(converterMedicaoParaTemperatureReading);

        // Ordenar por timestamp
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

    // Recarregar dados a cada 30 segundos
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

      {temperatureData.length > 0 || umidadeData.length > 0 ? (
        <>
          <SummaryCards 
            temperatureData={temperatureData} 
            umidadeData={umidadeData}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {temperatureData.length > 0 ? (
              <TemperatureChart data={temperatureData} />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg col-span-1">
                <p className="text-gray-500">Nenhum dado de temperatura disponível</p>
              </div>
            )}

            {umidadeData.length > 0 ? (
              <UmidadeChart data={umidadeData} />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg col-span-1">
                <p className="text-gray-500">Nenhum dado de umidade disponível</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Nenhum dado de sensores disponível</p>
        </div>
      )}
    </div>
  );
}