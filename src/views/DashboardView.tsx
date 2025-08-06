import { Link } from "react-router-dom";
import { obtenerEventos } from "@/api/EventoAPI";
import { useQuery } from "@tanstack/react-query";
import type { Evento } from "@/types/index";
import EventoCardInfo from "@/views/eventos/EventoCardInfo";
import Loading from "@/components/Loading";
import { FaMoneyBillWave, FaUniversity, FaUsers } from "react-icons/fa";
import { useState } from "react";

export default function DashboardView() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 4;

  const {
    data: eventos,
    isLoading,
    isError,
    error,
  } = useQuery<Evento[]>({
    queryKey: ["eventos"],
    queryFn: obtenerEventos,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const totalPersonas =
    eventos?.reduce(
      (total, evento) => total + evento.participantes.length,
      0
    ) || 0;

  const totalPages = Math.ceil((eventos?.length || 0) / pageSize);

  const paginatedEventos = eventos?.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <>
      <h1 className="text-5xl font-black text-gray-900">Eventos</h1>
      <p className="text-2xl font-light text-gray-600 mt-3 mb-5">
        Maneja y administra tus eventos
      </p>

      {/* Panel de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaUsers className="text-blue-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">
              Total Personas Participantes
            </p>
            <p className="text-xl font-bold">{totalPersonas}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaMoneyBillWave className="text-green-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">Total de Eventos</p>
            <p className="text-xl font-bold">{eventos?.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaUniversity className="text-purple-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">
              Registrados al último evento
            </p>
            <p className="text-xl font-bold">
              {eventos?.[eventos.length - 1]?.participantes.length}
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/eventos/create"
        className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors rounded-lg block mt-5 w-fit"
      >
        Nuevo Evento
      </Link>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedEventos?.map((evento) => (
          <EventoCardInfo key={evento._id} evento={evento} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === totalPages - 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
