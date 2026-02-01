export interface TemperatureReading {
  _id?: string;
  id?: string;
  temperature?: number;
  valor?: number;
  timestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  tipo?: string;
  dispositivoId?: string;
  ambienteId?: string;
}

// Helper para converter dados da API para o formato do gráfico
export function converterMedicaoParaTemperatureReading(medicao: any): TemperatureReading {
  return {
    _id: medicao.id || medicao._id,
    id: medicao.id || medicao._id,
    temperature: medicao.valor,
    valor: medicao.valor,
    timestamp: medicao.createdAt || medicao.timestamp,
    createdAt: medicao.createdAt,
  };
}
