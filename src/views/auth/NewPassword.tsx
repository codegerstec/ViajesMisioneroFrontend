// src/pages/NewPassword.tsx
import { useState } from "react";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import type { ConfirmToken } from "@/types/index";

export default function NewPasswordPage() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      {isValidToken ? (
        <NewPasswordForm token={token} />
      ) : (
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
      )}
    </div>
  );
}
