// components/SummaryCards.tsx
'use client';

import { TemperatureReading } from "./types";

export function SummaryCards({ data }: { data: TemperatureReading[] }) {
  const temperatures = data.map(d => d.temperature);

  const max = Math.max(...temperatures);
  const min = Math.min(...temperatures);
  const avg =
    temperatures.reduce((a, b) => a + b, 0) / temperatures.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Máxima" value={`${max.toFixed(1)} °C`} />
      <Card title="Mínima" value={`${min.toFixed(1)} °C`} />
      <Card title="Média" value={`${avg.toFixed(1)} °C`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
