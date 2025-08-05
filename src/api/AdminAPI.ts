import type {
  AdminFormData,
  ConfirmToken,
  ForgotPassword,
  NewPassword,
  RequestNuevoToken,
  LoginData,
} from "@/types/index";
import api from "@/lib/axios";

// crear admin usuario
export async function crearAdmin(admin: AdminFormData) {
  try {
    const { data } = await api.post("/api/admin/register", admin);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// login admin usuario
export async function loginAdmin(loginData: LoginData) {
  try {
    const url = "/api/admin/login";
    const { data } = await api.post<string>(url, loginData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// verificar token confirmar cuenta
export async function confirmAdmin(token: ConfirmToken["token"]) {
  try {
    const { data } = await api.post("/api/admin/verificar-token", { token });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// nuevo token
export async function requestNewToken(email: RequestNuevoToken["email"]) {
  try {
    const { data } = await api.post("/api/admin/nuevo-token", { email });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// forgot password
export async function forgotPassword(email: ForgotPassword["email"]) {
  try {
    const { data } = await api.post("/api/admin/forgot-password", { email });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// new password
export async function newPassword(
  token: NewPassword["token"],
  password: NewPassword["password"]
) {
  try {
    const { data } = await api.post("/api/admin/new-password", {
      token,
      password,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// validate token para nuevo password
export async function validarToken(token: ConfirmToken["token"]): Promise<string | { message: string }> {
  try {
    const { data } = await api.post<string | { message: string }>("/api/admin/validate-token", { token });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error desconocido");
  }
}

// update password
export async function updatePassword({
  token,
  formData,
}: {
  token: NewPassword["token"];
  formData: NewPassword;
}): Promise<string | { message: string }> {
  try {
    const { data } = await api.post(
      `/api/admin/update-password/${token}`,
      formData
    );
    return data as string;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error desconocido");
  }
  return { message: "Error desconocido" };
}
