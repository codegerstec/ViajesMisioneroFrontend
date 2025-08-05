import { useForm } from "react-hook-form";
import type { RequestNuevoToken } from "@/types/index";
import { requestNewToken } from "@/api/AdminAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RequestNewToken() {
  const initialValues: RequestNuevoToken = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestNewToken,
    onSuccess: () => {
      toast.success("Se ha enviado un enlace de recuperación a tu correo");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const handleRequestCode = (formData: RequestNuevoToken) =>
    mutate(formData.email);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">
            Solicitar nuevo token
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6">
            Ingresa el correo electrónico con el que te registraste
          </p>

          <form
            onSubmit={handleSubmit(handleRequestCode)}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Reenviar código
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
