import type { EventoFormData, Evento } from "@/types/index";
import api from "@/lib/axios";

// crear evento
export async function crearEvento(evento: EventoFormData) {
  try {
    const { data } = await api.post("/api/eventos", evento, {
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

// obtener eventos
export async function obtenerEventos(): Promise<Evento[]> {
  try {
    const { data } = await api.get<Evento[]>("/api/eventos");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// obtener evento por id
export async function obtenerEventoPorId(id: Evento["_id"]): Promise<Evento> {
  try {
    const { data } = await api.get<Evento>(`/api/eventos/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// obtener evento creado ultimo
export async function obtenerEventoCreadoUltimo(id: Evento["_id"]): Promise<Evento> {
  try {
    const { data } = await api.get<Evento>(`/api/eventos/ultimo/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// actualizar evento
export async function actualizarEvento(id: Evento["_id"], evento: EventoFormData) {
  try {
    const { data } = await api.put(`/api/eventos/${id}`, evento, {
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

// eliminar evento
export async function eliminarEvento(id: Evento["_id"]) {
  try {
    const { data } = await api.delete(`/api/eventos/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
