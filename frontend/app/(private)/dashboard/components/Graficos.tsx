// components/TemperatureChart.tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TemperatureReading } from "./types";

export function TemperatureChart({ data }: { data: TemperatureReading[] }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow">
      <h2 className="mb-4 font-semibold">Variação de Temperatura</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis unit="°C" />
            <Tooltip
              labelFormatter={(value) =>
                new Date(value).toLocaleString("pt-BR")
              }
            />
            <Line
              type="monotone"
              dataKey="temperature"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
