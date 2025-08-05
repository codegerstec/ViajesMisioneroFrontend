import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EventoForm from "./EventoForm";
import type { EventoFormData } from "@/types/index";
import { crearEvento } from "@/api/EventoAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateEventoView() {
  const navigate = useNavigate();
  const initialValues: EventoFormData = {
    _id: "",
    titulo: "",
    lugar: "",
    descripcion: "",
    fecha: "",
    hora: "",
    precio: 0,
    ticketsDisponibles: 0,
    participantes: [],
    imagen: new File([], ""),
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EventoFormData>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: crearEvento,
    onSuccess: () => {
      toast.success(`Evento creado exitosamente`);
      navigate("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const handleRegister = (formData: EventoFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900">Nuevo Evento</h1>
        <p className="text-2xl font-light text-gray-600 mt-3">
          Rellene los campos para crear un nuevo evento
        </p>
        <Link
          to="/dashboard"
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors rounded-lg block mt-5 w-fit"
        >
          Volver al Dashboard
        </Link>
        <form
          encType="multipart/form-data"
          className="mt-10 bg-white shadow rounded-lg p-6 md:p-10"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <EventoForm
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
          />
          <input
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors rounded-lg block mt-5 w-full"
            value="Crear Evento"
          />
        </form>
      </div>
    </>
  );
}
