const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers:{
      "Content-Type": "application/json",
      ...(options.headers || {}),
    }
  });
  
if (response.status === 401) {
    // Exemplo:
    // window.location.href = "/login";
    throw new Error("Não autorizado");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || response.statusText);
  }

  return response;
};


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


export interface BuscarMedicoesFilters {
  ambienteId?: string;
  dispositivoId?: string;
  tipo?: "temperatura" | "umidade";
  startData?: Date;
  endData?: Date;
}

export async function buscarMedicoes(
  filters: BuscarMedicoesFilters | string // allowing string for backward compatibility if it was just ambienteId, but better to refactor
): Promise<Medicao[]> {
  try {
    const body: any = {
      ...(filters as any), // Cast to any to avoid strict type checks if we manipulate it
    };

    // TEMPORARY FIX: Backend requires Date objects but receives JSON strings, failing validation.
    // We remove date filters to restore basic communication.
    if (typeof filters !== 'string') {
      delete body.startData;
      delete body.endData;
    }

    const response = await apiFetch(`/medicao/buscar`, {
      method: "POST",
      body: JSON.stringify(body),
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
  ambienteId?: string,
  dispositivoId?: string,
  startData?: Date,
  endData?: Date
): Promise<Medicao[]> {
  return buscarMedicoes({ ambienteId, dispositivoId, tipo: "temperatura", startData, endData });
}

// Buscar apenas medições de umidade
export async function buscarUmidade(
  ambienteId?: string,
  dispositivoId?: string,
  startData?: Date,
  endData?: Date
): Promise<Medicao[]> {
  return buscarMedicoes({ ambienteId, dispositivoId, tipo: "umidade", startData, endData });
}

export async function buscarUltimaMedicao(
  dispositivoId: string,
  tipo: "temperatura" | "umidade"
): Promise<Medicao | null> {
  try {
    // Validação básica do ID
    if (!dispositivoId) {
      console.warn(`ID de dispositivo vazio para tipo ${tipo}`);
      return null;
    }

    const response = await fetch(`${API_URL}/medicao/buscar-ultima`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dispositivoId, tipo }),
    });

    if (response.status === 404) return null;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn(`Erro ao buscar última medição para ${dispositivoId}:`, errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar última medição (${tipo}):`, error);
    return null;
  }
}

// ===== AUTENTICAÇÃO / USUÁRIO =====

export async function logar(email: string, senha: string): Promise<void> {
  try {
    const response = await apiFetch('/autenticacao', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message || `Erro ao autenticar: ${response.statusText}`)
    }

    return
  } catch (error) {
    console.error('Erro ao logar:', error)
    throw error
  }
}

export async function criarUsuario(data: {
  nome: string
  email: string
  senha: string
  receberEmail: boolean
}): Promise<{ id: string }> {
  try {
    const response = await fetch(`${API_URL}/usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message || `Erro ao criar usuário: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

export async function atualizarUsuario(
  id: string,
  data: {
    nome?: string
    email?: string
    receberEmail?: boolean
  }
): Promise<{ id: string }> {
  try {
    const response = await apiFetch(`/usuario`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message || `Erro ao atualizar usuário: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}


// ===== DISPOSITIVOS =====

export interface Dispositivo {
  id: string;
  nome?: string;
  ambienteId?: string;
}

export async function cadastrarDispositivo(
  id: string,
  nome?: string,
  ambienteId?: string
): Promise<Dispositivo> {
  try {
    const response = await apiFetch(`/dispositivo`, {
      method: "POST",
      body: JSON.stringify({ id, nome, ambienteId }),
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
    const response = await apiFetch(`/dispositivo`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      // Log more info if needed
      throw new Error(`Erro ao listar dispositivos: ${response.statusText}`);
    }

    const data = await response.json();
    // Backend returns { dispositivos: [...] }
    return data.dispositivos;
  } catch (error) {
    console.error("Erro ao listar dispositivos:", error);
    throw error;
  }
}

export async function buscarDispositivo(id: string): Promise<Dispositivo | undefined> {
  try {
    const dispositivos = await listarDispositivos();
    // decodeURIComponent is important if the ID comes from URL and contains special chars (like colon)
    const decodedId = decodeURIComponent(id);
    return dispositivos.find((d) => d.id === decodedId);
  } catch (error) {
    console.error(`Erro ao buscar dispositivo ${id}:`, error);
    throw error;
  }
}

export async function atualizarDispositivo(
  id: string,
  nome?: string,
  ambienteId?: string
): Promise<Dispositivo> {
  try {
    const response = await apiFetch(`/dispositivo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ nome, ambienteId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao atualizar dispositivo: ${response.statusText}`);
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
    const response = await apiFetch(`/dispositivo/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao remover dispositivo: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao remover dispositivo:", error);
    throw error;
  }
}

// ===== AMBIENTES =====

export interface Ambiente {
  id: string;
  nome: string;
  tipo: "frio" | "arejado";
  descricao?: string;
  temperatura_minima: number;
  temperatura_maxima: number;
  umidade_minima: number;
  umidade_maxima: number;
}

export interface CriarAmbienteData {
  nome: string;
  tipo: "frio" | "arejado";
  descricao?: string;
  temperatura_minima: number;
  temperatura_maxima: number;
  umidade_minima: number;
  umidade_maxima: number;
}

export interface AtualizarAmbienteData {
  nome?: string;
  descricao?: string;
  temperatura_minima?: number;
  temperatura_maxima?: number;
  umidade_minima?: number;
  umidade_maxima?: number;
}

export async function listarAmbientes(): Promise<Ambiente[]> {
  try {
    const response = await apiFetch(`/ambiente`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erro ao listar ambientes: ${response.statusText}`);
    }


    const data = await response.json();
    // The backend returns an object { ambientes: [...] }
    return data.ambientes;
  } catch (error) {
    console.error("Erro ao listar ambientes:", error);
    throw error;
  }
}

export async function criarAmbiente(data: CriarAmbienteData): Promise<{ id: string }> {
  try {
    const response = await apiFetch(`/ambiente`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao criar ambiente: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar ambiente:", error);
    throw error;
  }
}

export async function atualizarAmbiente(
  id: string,
  data: AtualizarAmbienteData
): Promise<{ id: string }> {
  try {
    const response = await apiFetch(`/ambiente/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao atualizar ambiente: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar ambiente:", error);
    throw error;
  }
}

export async function removerAmbiente(id: string): Promise<void> {
  try {
    const response = await apiFetch(`/ambiente/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro ao remover ambiente: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao remover ambiente:", error);
    throw error;
  }
}
