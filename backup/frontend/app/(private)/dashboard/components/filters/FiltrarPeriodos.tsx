import { TemperatureReading } from "../types";

type DateRange = { start: Date; end: Date };

export function filtrarPeriodo(
  data: TemperatureReading[],
  periodo: 'ano' | 'mes' | 'dia',
  dataBase: Date | DateRange
) {
  // If a range is provided, filter by the inclusive start/end interval
  if (typeof dataBase === 'object' && 'start' in dataBase && 'end' in dataBase) {
    const start = new Date(dataBase.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dataBase.end);
    end.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const dataItem = new Date(item.timestamp || item.createdAt || "");
      return dataItem >= start && dataItem <= end;
    });
  }

  // Single-date behavior (keeps previous semantics)
  const single = dataBase as Date;
  return data.filter(item => {
    const dataItem = new Date(item.timestamp || item.createdAt || "");

    switch (periodo) {
      case 'ano':
        return dataItem.getFullYear() === single.getFullYear();

      case 'mes':
        return (
          dataItem.getFullYear() === single.getFullYear() &&
          dataItem.getMonth() === single.getMonth()
        );

      case 'dia':
        return (
          dataItem.getFullYear() === single.getFullYear() &&
          dataItem.getMonth() === single.getMonth() &&
          dataItem.getDate() === single.getDate()
        );

      default:
        return true;
    }
  });
}
