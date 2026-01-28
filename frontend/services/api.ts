const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Medicao {
  id: string;
  dispositivoId: string;
  ambienteId: string;
  tipo: "temperatura" | "umidade";
  valor: number;
  createdAt: string;
  updatedAt: string;
}

export interface BuscarMedicoesResponse {
  medicoes: Medicao[];
}

export interface Dispositivo {
  id: string;
  nome?: string;
  ambienteId?: string;
}

export async function buscarMedicoes(
  ambienteId?: string,
  tipo?: "temperatura" | "umidade"
): Promise<Medicao[]> {
  try {
    const response = await fetch(`${API_URL}/medicao/buscar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ambienteId,
        tipo,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar medições: ${response.statusText}`);
    }

    const data: BuscarMedicoesResponse = await response.json();
    return data.medicoes;
  } catch (error) {
    console.error("Erro ao buscar medições:", error);
    throw error;
  }
}

// Buscar apenas medições de temperatura
export async function buscarTemperaturas(
  ambienteId?: string
): Promise<Medicao[]> {
  return buscarMedicoes(ambienteId, "temperatura");
}

// Buscar apenas medições de umidade
export async function buscarUmidade(
  ambienteId?: string
): Promise<Medicao[]> {
  return buscarMedicoes(ambienteId, "umidade");
}

// ===== DISPOSITIVOS =====

export async function cadastrarDispositivo(
  id: string,
  nome?: string,
  ambienteId?: string
): Promise<Dispositivo> {
  try {
    const response = await fetch(`${API_URL}/dispositivo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        nome,
        ambienteId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao cadastrar dispositivo: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar dispositivo:", error);
    throw error;
  }
}

export async function listarDispositivos(): Promise<Dispositivo[]> {
  try {
    const response = await fetch(`${API_URL}/dispositivo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao listar dispositivos: ${response.statusText}`);
    }

    const data = await response.json();
    return data.dispositivos || data;
  } catch (error) {
    console.error("Erro ao listar dispositivos:", error);
    throw error;
  }
}

export async function atualizarDispositivo(
  id: string,
  nome?: string,
  ambienteId?: string
): Promise<Dispositivo> {
  try {
    const response = await fetch(`${API_URL}/dispositivo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        ambienteId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar dispositivo: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar dispositivo:", error);
    throw error;
  }
}

export async function removerDispositivo(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/dispositivo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover dispositivo: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao remover dispositivo:", error);
    throw error;
  }
}
