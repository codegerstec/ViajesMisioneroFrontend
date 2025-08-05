import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { AdminFormData } from "@/types/index";
import { crearAdmin } from "@/api/AdminAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
  const navigate = useNavigate();
  const initialValues: AdminFormData = {
    nombres: "",
    apellidos: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdminFormData>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: crearAdmin,
    onSuccess: () => {
      toast.success("Cuenta creada exitosamente");
      navigate("/login");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const handleForm = (formData: AdminFormData) => mutate(formData);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-4">
            Crear cuenta
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Rellena el formulario para registrarte
          </p>

          <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
            {/* Nombres */}
            <div>
              <label className="block text-gray-700 mb-1">
                Nombres completos
              </label>
              <input
                type="text"
                {...register("nombres", {
                  required: "El nombre es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tu nombre"
              />
              {errors.nombres && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombres.message}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                {...register("apellidos", {
                  required: "El apellido es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tu apellidos"
              />
              {errors.apellidos && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apellidos.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                {...register("username", {
                  required: "El username es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tu username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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

            {/* Contraseña */}
            <div>
              <label className="block text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (val) =>
                    val === watch("password") || "Las contraseñas no coinciden",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <input
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
              value="Registrarse"
            />
          </form>

          <div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Inicia sesión
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
    </>
  );
}
