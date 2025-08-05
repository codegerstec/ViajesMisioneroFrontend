import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { obtenerEventoCreadoUltimo } from "@/api/EventoAPI";
import { useEffect, useState } from "react";
import type { Evento } from "@/types/index";
import {
  formatearFecha,
  formatearDinero,
  formatearHora,
} from "@/helpers/index";

export default function Hero() {
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    const obtenerEvento = async () => {
      try {
        const evento = await obtenerEventoCreadoUltimo("ultimo");
        setEvento(evento);
      } catch (error) {
        console.error("Error al obtener el evento:", error);
      }
    };
    obtenerEvento();
  }, []);

  return (
    <section className="bg-[#150f0a] py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 px-6 items-center">
        {/* Imagen a la izquierda */}
        <div className="md:col-span-3 relative h-[850px]">
          <img
            src={
              typeof evento?.imagen === "string"
                ? evento.imagen
                : evento?.imagen instanceof File
                ? URL.createObjectURL(evento.imagen)
                : ""
            }
            alt="Evento cristiano"
            className="w-full h-full object-cover shadow-xl"
          />
        </div>

        {/* Información del evento a la derecha */}
        <div className="md:col-span-3 -mt-10 md:-mt-5 relative z-10 md:-ml-16">
          <div className="bg-[#5928c0] text-white p-8 md:p-10 shadow-2xl h-full w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              {evento?.titulo}
            </h1>
            <p className="text-lg mb-6">{evento?.descripcion}</p>

            <div className="space-y-2 text-sm md:text-base text-white/90 mb-6">
              <p className="flex items-center gap-2">
                <FaLocationDot />
                <strong>Lugar:</strong> {evento?.lugar}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendar />
                <strong>Fecha:</strong> {formatearFecha(evento?.fecha || "")}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendar />
                <strong>Tickets (Asientos Disponibles):</strong>{" "}
                {evento?.ticketsDisponibles}
              </p>
              <p className="flex items-center gap-2">
                <FaClock />
                <strong>Hora:</strong> {formatearHora(evento?.hora || "")}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendar />
                <strong>Precio Pasaje Ida y Vuelta:</strong>{" "}
                {formatearDinero(evento?.precio || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
