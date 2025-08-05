import type { ParticipanteFormData, Participante } from "@/types/index";
import api from "@/lib/axios";

// crear participante
export async function crearParticipante(participante: ParticipanteFormData) {
  try {
    const { data } = await api.post("/api/participantes", participante, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// obtener participantes
export async function obtenerParticipantes(): Promise<Participante[]> {
  try {
    const { data } = await api.get<Participante[]>("/api/participantes");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}