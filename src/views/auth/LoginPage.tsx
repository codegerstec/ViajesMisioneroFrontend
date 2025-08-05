// src/pages/Login.tsx
import { loginAdmin } from "@/api/AdminAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { mutate } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      reset();
      navigate("/dashboard");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-4">
          Iniciar sesión
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Accede a tu cuenta para continuar
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
              placeholder="tucorreo@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
          >
            Entrar
          </button>
        </form>

        <div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Regístrate
            </a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Olvidaste tu contraseña?{" "}
            <a
              href="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Recupera tu contraseña
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
