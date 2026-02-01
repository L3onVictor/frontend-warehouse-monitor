import { TemperatureReading } from "../types";

export function filtrarPeriodo(
  data: TemperatureReading[],
  periodo: 'ano' | 'mes' | 'semana' | 'dia',
  dataBase: Date
) {
  return data.filter(item => {
    const dataItem = new Date(item.timestamp || item.createdAt || "");

    switch (periodo) {
      case 'ano':
        return dataItem.getFullYear() === dataBase.getFullYear();

      case 'mes':
        return (
          dataItem.getFullYear() === dataBase.getFullYear() &&
          dataItem.getMonth() === dataBase.getMonth()
        );

      case 'semana': {
        const base = new Date(dataBase);
        const diaSemana = base.getDay() || 7;
        const inicioSemana = new Date(base);
        inicioSemana.setDate(base.getDate() - (diaSemana - 1));
        inicioSemana.setHours(0, 0, 0, 0);

        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);
        fimSemana.setHours(23, 59, 59, 999);

        return dataItem >= inicioSemana && dataItem <= fimSemana;
      }

      case 'dia':
        return (
          dataItem.getFullYear() === dataBase.getFullYear() &&
          dataItem.getMonth() === dataBase.getMonth() &&
          dataItem.getDate() === dataBase.getDate()
        );

      default:
        return true;
    }
  });
}
