import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { confirmAdmin } from "@/api/AdminAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export default function VerificarTokenPage() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAdmin,
    onSuccess: () => {
      toast.success("Código verificado exitosamente");
      navigate("/login");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message);
    },
  });

  const handleTokenChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleTokenComplete = (token: ConfirmToken["token"]) => mutate(token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">
          Verifica tu cuenta
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Ingresá el código de 6 dígitos que te enviamos al correo
        </p>

        {/* Inputs del código */}
        <form className="flex justify-between gap-2 mb-6">
          <PinInput
            value={token}
            onChange={handleTokenChange}
            onComplete={handleTokenComplete}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PinInputField
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 md:w-14 md:h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </PinInput>
        </form>

        {/* Reenviar código */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No recibiste el código?{" "}
          <Link
            to="/nuevo-token"
            className="text-indigo-600 font-medium hover:underline"
          >
            Reenviar código
          </Link>
        </p>
      </div>
    </div>
  );
}
