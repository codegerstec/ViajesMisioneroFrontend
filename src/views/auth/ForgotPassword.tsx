// src/pages/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/api/AdminAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ForgotPassword } from "@/types/index";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPassword>();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Se ha enviado un enlace de recuperación a tu correo");
      reset();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'response' in error
        ? (error as { response: { data: { message: string } } }).response.data.message
        : "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const onSubmit = (formData: ForgotPassword) => {
    forgotPasswordMutation.mutate(formData.email);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-800 mb-4">
          Recuperar contraseña
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu
          contraseña.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Correo */}
          <div>
            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register("email", { required: "El correo es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Recordaste tu contraseña?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
