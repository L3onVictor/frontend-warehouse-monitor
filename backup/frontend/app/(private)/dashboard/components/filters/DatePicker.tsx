'use client';

import { PeriodoFiltro } from "./types";

interface Props {
  periodo: PeriodoFiltro;
  data: { start: Date; end: Date };
  onChange: (range: { start: Date; end: Date }) => void;
}

export function DatePicker({ periodo, data, onChange }: Props) {
  // Utility to format date to yyyy-mm-dd
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  if (periodo === 'ano') {
    return (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input
          type="number"
          value={data.start.getFullYear()}
          onChange={(e) => onChange({ start: new Date(Number(e.target.value), 0, 1), end: data.end })}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Início"
        />
        <span className="text-gray-400">—</span>
        <input
          type="number"
          value={data.end.getFullYear()}
          onChange={(e) => onChange({ start: data.start, end: new Date(Number(e.target.value), 11, 31) })}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Fim"
        />
      </div>
    );
  }

  if (periodo === 'mes') {
    return (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input
          type="month"
          value={`${data.start.getFullYear()}-${String(data.start.getMonth() + 1).padStart(2, '0')}`}
          onChange={(e) => {
            const [ano, mes] = e.target.value.split('-');
            onChange({ start: new Date(Number(ano), Number(mes) - 1, 1), end: data.end });
          }}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <span className="text-gray-400">—</span>
        <input
          type="month"
          value={`${data.end.getFullYear()}-${String(data.end.getMonth() + 1).padStart(2, '0')}`}
          onChange={(e) => {
            const [ano, mes] = e.target.value.split('-');
            const next = new Date(Number(ano), Number(mes) - 1, 1);
            // set end to last day of month
            const last = new Date(next.getFullYear(), next.getMonth() + 1, 0, 23, 59, 59, 999);
            onChange({ start: data.start, end: last });
          }}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    );
  }

  // dia
  return (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <input
        type="date"
        value={formatDate(data.start)}
        onChange={(e) => onChange({ start: new Date(e.target.value), end: data.end })}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <span className="text-gray-400">—</span>
      <input
        type="date"
        value={formatDate(data.end)}
        onChange={(e) => onChange({ start: data.start, end: new Date(e.target.value) })}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
