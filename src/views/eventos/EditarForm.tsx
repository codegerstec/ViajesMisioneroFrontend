import ErrorMessage from "@/components/ErrorMessage";
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import type { EventoFormData } from "@/types/index";
import { useEffect, useRef, useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

interface EventoFormProps {
  register: UseFormRegister<EventoFormData>;
  errors: FieldErrors<EventoFormData>;
  setValue: UseFormSetValue<EventoFormData>;
  trigger: UseFormTrigger<EventoFormData>;  
  initialData: EventoFormData;
}

export default function EventoForm({ register, errors, setValue, trigger, initialData }: EventoFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue("titulo", initialData.titulo);
    setValue("lugar", initialData.lugar);
    setValue("descripcion", initialData.descripcion);
    setValue("fecha", initialData.fecha);
    setValue("hora", initialData.hora);
    setValue("precio", initialData.precio);
    setValue("ticketsDisponibles", initialData.ticketsDisponibles);
    setValue("imagen", initialData.imagen);
    setValue("participantes", initialData.participantes);
    trigger();
  }, [initialData, setValue, trigger]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const urlTemporal = URL.createObjectURL(file);
      setPreview(urlTemporal);
      setValue("imagen", file);
      trigger("imagen");
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      {/* Titulo */}
      <div className="mb-5 space-y-3">
        <label htmlFor="titulo" className="text-sm uppercase font-bold mb-1 block">
          Titulo del Evento
        </label>
        <input
          id="titulo"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("titulo", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.titulo && <ErrorMessage>{errors.titulo.message}</ErrorMessage>}
      </div>

      {/* Lugar */}
      <div className="mb-5 space-y-3">
        <label htmlFor="lugar" className="text-sm uppercase font-bold mb-1 block">
          Lugar
        </label>
        <input
          id="lugar"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Lugar del Evento"
          {...register("lugar", {
            required: "El Lugar del Evento es obligatorio",
          })}
        />

        {errors.lugar && <ErrorMessage>{errors.lugar.message}</ErrorMessage>}
      </div>

      {/* Descripción */}
      <div className="mb-5 space-y-3">
        <label htmlFor="descripcion" className="text-sm uppercase font-bold mb-1 block">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="w-full p-3  border border-gray-200"
          placeholder="Descripción del Proyecto"
          {...register("descripcion", {
            required: "Una descripción del evento es obligatoria",
          })}
        />

        {errors.descripcion && (
          <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
        )}
      </div>

      {/* Fecha y Hora */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="mb-5 space-y-3 w-full">
          <label htmlFor="fecha" className="text-sm uppercase font-bold mb-1 block">
            Fecha
          </label>
          <input
            id="fecha"
            className="w-full p-3  border border-gray-200"
            type="date"
            placeholder="Fecha del Evento"
            {...register("fecha", {
              required: "Una fecha del evento es obligatoria",
            })}
          />

          {errors.fecha && <ErrorMessage>{errors.fecha.message}</ErrorMessage>}
        </div>

        <div className="mb-5 space-y-3 w-full">
          <label htmlFor="hora" className="text-sm uppercase font-bold mb-1 block">
            Hora
          </label>
          <input
            id="hora"
            className="w-full p-3  border border-gray-200"
            type="time"
            placeholder="Hora del Evento"
            {...register("hora", {
              required: "Una hora del evento es obligatoria",
            })}
          />

          {errors.hora && <ErrorMessage>{errors.hora.message}</ErrorMessage>}
        </div>
      </div>

      {/* Tickets Disponibles y Precio */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="mb-5 space-y-3 w-full">
          <label
            htmlFor="ticketsDisponibles"
            className="text-sm uppercase font-bold mb-1 block"
          >
            Tickets Disponibles (Asientos)
          </label>
          <input
            id="ticketsDisponibles"
            className="w-full p-3  border border-gray-200"
            type="number"
            placeholder="Tickets Disponibles"
            {...register("ticketsDisponibles", {
              required: "El número de tickets disponibles es obligatorio",
            })}
          />

          {errors.ticketsDisponibles && (
            <ErrorMessage>{errors.ticketsDisponibles.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3 w-full">
          <label htmlFor="precio" className="text-sm uppercase font-bold mb-1 block">
            Precio de Pasaje
          </label>
          <input
            id="precio"
            className="w-full p-3  border border-gray-200"
            type="number"
            placeholder="Precio"
            {...register("precio", {
              required: "El precio es obligatorio",
            })}
          />

          {errors.precio && (
            <ErrorMessage>{errors.precio.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Imagen y Vista Previa */}
      <div className="mb-5 flex flex-col md:flex-row gap-4 items-start">
        {/* Columna: Input de imagen */}
        <div className="w-full h-48 md:w-1/2 border border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-blue-400 transition-all duration-200">
          <label
            htmlFor="imagen"
            className="cursor-pointer flex flex-col items-center text-gray-600"
          >
            <PhotoIcon className="w-8 h-8 mb-2 text-blue-500" />
            <span className="text-sm font-medium">
              Haz clic para subir una imagen
            </span>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImagenChange}
            />
          </label>
          {errors.imagen && (
            <p className="text-sm text-red-500">{errors.imagen.message}</p>
          )}
        </div>

        {/* Columna: Vista previa */}
        <div className="w-full md:w-1/2 h-48 border border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt="Vista previa"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-gray-400 text-sm">
              Aquí se mostrará la imagen previa
            </span>
          )}
        </div>
      </div>
    </>
  );
}
