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
import Loading from "../Loading";

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

  if (!evento) {
    return <Loading />;
  }


  return (
    <section className="bg-[#150f0a] py-10">
      <div className="text-center mb-2 p-4">
        <h1 className="text-4xl font-black text-gray-200">Nuestro Último Evento</h1>
        <p className="text-xl font-light text-gray-400 mt-3 mb-5">
          Inscribete al evento y se parte de este hermoso momento de bendición para ti y tu familia
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 px-4 items-center">
        {/* Imagen a la izquierda */}
        <div className="md:col-span-6 lg:grid-cols-6 relative h-[600px] md:h-[950px]">
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
        <div className="md:col-span-6 lg:grid-cols-6 -mt-10  relative z-10 lg:-ml-12">
          <div className="bg-[#5928c0] text-white p-6 md:p-10 lg:p-16 shadow-2xl h-full w-full">
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
