'use client';

import { PeriodoFiltro } from "./types";

interface Props {
  periodo: PeriodoFiltro;
  data: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ periodo, data, onChange }: Props) {
  if (periodo === 'ano') {
    return (
      <input
        type="number"
        value={data.getFullYear()}
        onChange={(e) =>
          onChange(new Date(Number(e.target.value), 0, 1))
        }
        className="border rounded-lg px-3 py-2 w-28"
      />
    );
  }

  if (periodo === 'mes') {
    return (
      <input
        type="month"
        value={`${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`}
        onChange={(e) => {
          const [ano, mes] = e.target.value.split("-");
          onChange(new Date(Number(ano), Number(mes) - 1, 1));
        }}
        className="border rounded-lg px-3 py-2"
      />
    );
  }

  if (periodo === 'dia') {
    return (
      <input
        type="date"
        value={data.toISOString().split("T")[0]}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="border rounded-lg px-3 py-2"
      />
    );
  }

  return null;
}
