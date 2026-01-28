// components/SummaryCards.tsx
'use client';

import { TemperatureReading } from "./types";

interface SummaryCardsProps {
  temperatureData?: TemperatureReading[];
  umidadeData?: TemperatureReading[];
}

export function SummaryCards({ temperatureData = [], umidadeData = [] }: SummaryCardsProps) {
  // Cálculos para temperatura
  const temperatures = temperatureData
    .map(d => d.temperature || d.valor)
    .filter(v => v !== undefined && v !== null) as number[];

  const tempMax = temperatures.length > 0 ? Math.max(...temperatures) : 0;
  const tempMin = temperatures.length > 0 ? Math.min(...temperatures) : 0;
  const tempAvg = temperatures.length > 0
    ? temperatures.reduce((a, b) => a + b, 0) / temperatures.length
    : 0;

  // Cálculos para umidade
  const umidades = umidadeData
    .map(d => d.valor || d.temperature)
    .filter(v => v !== undefined && v !== null) as number[];

  const umidadeMax = umidades.length > 0 ? Math.max(...umidades) : 0;
  const umidadeMin = umidades.length > 0 ? Math.min(...umidades) : 0;
  const umidadeAvg = umidades.length > 0
    ? umidades.reduce((a, b) => a + b, 0) / umidades.length
    : 0;

  return (
    <div className="space-y-4">
      {/* Cards de Temperatura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          title="Temperatura Máxima" 
          value={`${tempMax.toFixed(1)} °C`}
          color="red"
        />
        <Card 
          title="Temperatura Mínima" 
          value={`${tempMin.toFixed(1)} °C`}
          color="red"
        />
        <Card 
          title="Temperatura Média" 
          value={`${tempAvg.toFixed(1)} °C`}
          color="red"
        />
      </div>

      {/* Cards de Umidade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          title="Umidade Máxima" 
          value={`${umidadeMax.toFixed(1)} %`}
          color="blue"
        />
        <Card 
          title="Umidade Mínima" 
          value={`${umidadeMin.toFixed(1)} %`}
          color="blue"
        />
        <Card 
          title="Umidade Média" 
          value={`${umidadeAvg.toFixed(1)} %`}
          color="blue"
        />
      </div>
    </div>
  );
}

function Card({ 
  title, 
  value, 
  color = "gray" 
}: { 
  title: string; 
  value: string;
  color?: "red" | "blue" | "gray";
}) {
  const colorClasses = {
    red: "border-l-4 border-red-500",
    blue: "border-l-4 border-blue-500",
    gray: "border-l-4 border-gray-500",
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-gray-800 p-4 shadow ${colorClasses[color]}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
