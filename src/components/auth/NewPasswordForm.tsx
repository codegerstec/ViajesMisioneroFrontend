import { useForm } from "react-hook-form";
import type { ConfirmToken, NewPassword } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/AdminAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPassword = {
    password: "",
    confirmPassword: "",
    token,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPassword>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data: string | { message: string }) => {
      toast.success(data instanceof Object ? data.message : data);
      reset();
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const onSubmit = (formData: NewPassword) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center text-indigo-800 mb-1">
        Nueva Contraseña
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Establece una nueva contraseña segura para tu cuenta.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nueva contraseña</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold mt-4"
        >
          Guardar contraseña
        </button>
      </form>
    </div>
  );
}
