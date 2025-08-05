import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { crearParticipante } from "@/api/ParticipanteAPI";
import { toast } from "react-toastify";
import type { ParticipanteFormData } from "@/types/index";
import { FiUploadCloud } from "react-icons/fi";
import { useEffect, useState } from "react";
import { obtenerEventoCreadoUltimo } from "@/api/EventoAPI";
import type { Evento } from "@/types/index";

export default function FormInscribirse() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [eventoActual, setEventoActual] = useState<Evento | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ParticipanteFormData>({
    defaultValues: {
      nombres: "",
      apellidos: "",
      email: "",
      telefono: "",
      metodoPago: "",
      evento: "",
      imagen: new File([], ""),
    },
  });

  const metodoPago = watch("metodoPago");

  const { mutate } = useMutation({
    mutationFn: crearParticipante,
    onSuccess: (data) => {
      toast.success(String(data));
      navigate("/");
      reset();
      setPreview(null);
    },
    onError: (error: Error | { response: { data: { message: string } } }) => {
      const message =
        error instanceof Error
          ? error.message
          : error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const evento = await obtenerEventoCreadoUltimo("ultimo");
        setEventoActual(evento);
        setValue("evento", evento._id);
      } catch {
        toast.error("No se pudo obtener el evento actual.");
      }
    };
    fetchEvento();
  }, [setValue]);

  useEffect(() => {
    if (metodoPago === "Efectivo") {
      setValue("imagen", new File([], ""));
      setPreview(null);
      trigger("imagen");
    }
  }, [metodoPago, setValue, trigger]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleComprobanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imagen", file);
      trigger("imagen");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue("imagen", new File([], ""));
      setPreview(null);
    }
  };

  const handleForm = (formData: ParticipanteFormData) => mutate(formData);

  return (
    <section className="bg-[#140f09] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-[#2a2521] p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Inscríbete al Evento</h2>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleForm)}
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="evento" className="block mb-1 font-medium">
                Evento
              </label>
              <select
                id="evento"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                {...register("evento")}
                onBlur={() => trigger("evento")}
              >
                {eventoActual ? (
                  <option value={eventoActual._id}>
                    {eventoActual.titulo}
                  </option>
                ) : (
                  <option>Cargando evento...</option>
                )}
              </select>
              {errors.evento && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.evento.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nombres" className="block mb-1 font-medium">
                Nombres
              </label>
              <input
                type="text"
                id="nombres"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                placeholder="Tu nombres completos"
                {...register("nombres")}
                onBlur={() => trigger("nombres")}
              />
              {errors.nombres && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombres.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="apellidos" className="block mb-1 font-medium">
                Apellidos
              </label>
              <input
                type="text"
                id="apellidos"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                placeholder="Tu apellidos completos"
                {...register("apellidos")}
                onBlur={() => trigger("apellidos")}
              />
              {errors.apellidos && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apellidos.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="telefono" className="block mb-1 font-medium">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                placeholder="Tu número de teléfono"
                {...register("telefono")}
                onBlur={() => trigger("telefono")}
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                placeholder="tucorreo@ejemplo.com"
                {...register("email")}
                onBlur={() => trigger("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="metodoPago" className="block mb-1 font-medium">
                Método de pago
              </label>
              <select
                id="metodoPago"
                className="w-full px-4 py-2 rounded-md bg-[#2a2521] border border-gray-600 text-white focus:outline-none focus:border-[#5928c0]"
                {...register("metodoPago")}
                onBlur={() => trigger("metodoPago")}
              >
                <option value="" disabled>
                  Seleccione un método de pago
                </option>
                <option value="Yape">Yape</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
              </select>
              {errors.metodoPago && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.metodoPago.message}
                </p>
              )}
            </div>

            {(metodoPago === "Yape" || metodoPago === "Transferencia") && (
              <div>
                <label
                  htmlFor="imagen"
                  className="flex items-center gap-4 bg-[#1e1c1a] border border-dashed border-gray-500 p-4 rounded-lg cursor-pointer hover:border-[#5928c0] transition"
                >
                  <FiUploadCloud className="text-white w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">
                      Sube tu comprobante de pago
                    </span>
                    <span className="text-sm text-gray-400">
                      Solo se aceptan imágenes o PDF (máx. 5MB)
                    </span>
                  </div>
                </label>

                <input
                  type="file"
                  id="imagen"
                  accept="image/*,application/pdf"
                  className="hidden"
                  {...register("imagen", {
                    validate: (file) => {
                      if (
                        metodoPago === "Yape" ||
                        metodoPago === "Transferencia"
                      ) {
                        if (!file || file.size === 0) {
                          return "El comprobante es obligatorio";
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          return "El archivo no debe superar los 5MB";
                        }
                      }
                      return true;
                    },
                  })}
                  onChange={handleComprobanteChange}
                  onBlur={() => trigger("imagen")}
                />

                {preview && preview.startsWith("data:image") && (
                  <div className="mt-4">
                    <p className="text-white text-sm mb-2">
                      Vista previa del comprobante:
                    </p>
                    <img
                      src={preview}
                      alt="Comprobante"
                      className="w-full rounded-lg border border-gray-700"
                    />
                  </div>
                )}

                {errors.imagen && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.imagen.message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="bg-[#5928c0] hover:bg-[#6f3de0] text-white font-semibold px-6 py-3 rounded-md transition w-full mt-4"
            >
              Inscribirme
            </button>
          </form>
        </div>

        <div className="relative h-full rounded-xl overflow-hidden group">
          {/* Imagen de fondo */}
          <img
            src={
              typeof eventoActual?.imagen === "string"
                ? eventoActual.imagen
                : eventoActual?.imagen
                ? URL.createObjectURL(eventoActual.imagen)
                : ""
            }
            alt={eventoActual?.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Capa oscura al hacer hover */}
          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Contenido de texto que aparece al hover */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <h3 className="text-2xl font-bold mb-4">
              “Este es el tiempo de tu visitación”
            </h3>
            <p className="text-lg">
              No pierdas la oportunidad de ser parte de lo que Dios está
              haciendo. Regístrate y prepárate para una noche sobrenatural.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
