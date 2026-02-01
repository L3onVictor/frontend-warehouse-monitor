// components/PeriodoFilter.tsx
'use client';

import { PeriodoFiltro } from "./filters/types";

interface Props {
  value: PeriodoFiltro;
  onChange: (value: PeriodoFiltro) => void;
}

export function PeriodoFilter({ value, onChange }: Props) {
  const opcoes: { label: string; value: PeriodoFiltro }[] = [
    { label: "Ano", value: "ano" },
    { label: "Mês", value: "mes" },
    { label: "Semana", value: "semana" },
    { label: "Dia", value: "dia" },
  ];

  return (
    <div className="flex gap-2">
      {opcoes.map(opcao => (
        <button
          key={opcao.value}
          onClick={() => onChange(opcao.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              value === opcao.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-white"
            }
          `}
        >
          {opcao.label}
        </button>
      ))}
    </div>
  );
}
