import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditarForm from "./EditarForm";
import type { EventoFormData } from "@/types/index";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { obtenerEventoPorId, actualizarEvento } from "@/api/EventoAPI";

export default function EditEventoView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["Actualizar evento", id],
    queryFn: () => obtenerEventoPorId(id!),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EventoFormData>({
    values: data!,
  });

  const { mutate } = useMutation({
    mutationFn: (formData: EventoFormData) =>
      actualizarEvento(id!, formData),
    onSuccess: () => {
      toast.success(`Evento actualizado exitosamente`);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: EventoFormData) => {
    mutate(formData);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900">Editar Evento</h1>
        <p className="text-2xl font-light text-gray-600 mt-3">
          Rellene los campos para editar el evento
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <EditarForm
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            initialData={data!}
          />
          <input
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors rounded-lg block mt-5 w-full"
            value="Actualizar Evento"
          />
        </form>
      </div>
    </>
  );
}
