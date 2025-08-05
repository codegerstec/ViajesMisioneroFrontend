import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  formatearDinero,
  formatearFecha,
  formatearHora,
} from "@/helpers/index";
import type { Evento } from "@/types/index";
import { Link } from "react-router-dom";
import { eliminarEvento } from "@/api/EventoAPI";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function EventoCardInfo({ evento }: { evento: Evento }) {
  const queryClient = useQueryClient();

  const { mutate: eliminar } = useMutation({
    mutationFn: eliminarEvento,
    onSuccess: () => {
      toast.success("Evento eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este evento?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
      }
    });
  };
  return (
    <div
      key={evento._id}
      className="relative bg-white shadow rounded-lg p-4 md:p-6"
    >
      {/* Menú de opciones */}
      <div className="absolute top-4 right-4 z-20">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-30 focus:outline-none max-h-[none] overflow-visible">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active ? "bg-indigo-100 text-indigo-700" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    to={`/eventos/${evento._id}`}
                  >
                    Editar Evento
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleEliminar(evento._id)}
                    className={`${
                      active ? "bg-red-100 text-red-700" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Eliminar Evento
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Contenido en dos columnas */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Info del evento */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-gray-900">
            <span className="text-indigo-600">{evento.titulo}</span>
          </h3>
          <p className="text-sm text-gray-800">
            <strong>Descripción:</strong>{" "}
            <span className="text-slate-600">{evento.descripcion}</span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Fecha:</strong>{" "}
            <span className="text-slate-600">
              {formatearFecha(evento.fecha)}
            </span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Hora:</strong>{" "}
            <span className="text-slate-600">{formatearHora(evento.hora)}</span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Lugar:</strong>{" "}
            <span className="text-slate-600">{evento.lugar}</span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Tickets (Asientos Disponibles):</strong>{" "}
            <span className="text-slate-600">{evento.ticketsDisponibles}</span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Precio de Pasaje Ida y Vuelta:</strong>{" "}
            <span className="text-slate-600">
              {formatearDinero(evento.precio)}
            </span>
          </p>
          <p className="text-sm text-gray-800">
            <strong>Participantes:</strong>{" "}
            <span className="text-slate-600">
              {evento.participantes.length}
            </span>
          </p>
        </div>

        {/* Imagen del evento */}
        <div className="w-full md:w-40 h-60">
          <img
            src={
              typeof evento.imagen === "string"
                ? evento.imagen
                : URL.createObjectURL(evento.imagen)
            }
            alt={evento.titulo}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
