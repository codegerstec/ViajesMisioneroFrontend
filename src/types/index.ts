import { z } from "zod";

/* Eventos Schema */
export const eventoSchema = z.object({
  _id: z.string(),
  titulo: z.string().min(20, "El titulo debe tener al menos 20 caracteres"),
  lugar: z.string().min(10, "El lugar debe tener al menos 10 caracteres"),
  descripcion: z
    .string()
    .min(10, "La descripcion debe tener al menos 10 caracteres"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  hora: z.string().min(1, "La hora es obligatoria"),
  precio: z.number().min(1, "El precio es obligatorio"),
  ticketsDisponibles: z
    .number()
    .min(1, "Debe haber al menos 1 ticket disponible"),
  imagen: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size > 0, "La imagen es obligatoria"),
    z.string().url("La imagen debe ser una URL válida"),
  ]),
  participantes: z
    .array(z.string())
    .min(1, "Debe haber al menos 1 participante"),
});

export type Evento = z.infer<typeof eventoSchema>;
export type EventoFormData = Pick<
  Evento,
  | "_id"
  | "titulo"
  | "lugar"
  | "descripcion"
  | "fecha"
  | "hora"
  | "precio"
  | "ticketsDisponibles"
  | "imagen"
  | "participantes"
>;

/* Auth Schema */

export const loginSchema = z.object({
  email: z.string().email("El correo debe ser un correo valido"),
  password: z.string(),
});

export const registerSchema = z
  .object({
    nombres: z.string().min(1, "El nombre es obligatorio"),
    apellidos: z.string().min(1, "El apellido es obligatorio"),
    username: z
      .string()
      .min(6, "El nombre de usuario debe tener al menos 6 caracteres"),
    email: z.string().email("El correo debe ser un correo valido"),
    password: z
      .string()
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    token: z.string().min(6, "El token debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type Admin = z.infer<typeof registerSchema>;

export type AdminFormData = Pick<
  Admin,
  | "nombres"
  | "apellidos"
  | "username"
  | "email"
  | "password"
  | "confirmPassword"
>;

export type ConfirmToken = Pick<Admin, "token">;
export type RequestNuevoToken = Pick<Admin, "email">;
export type ForgotPassword = Pick<Admin, "email">;
export type NewPassword = Pick<Admin, "token" | "password" | "confirmPassword">;
export type LoginData = Pick<Admin, "email" | "password">;

/* Participantes Schema */

export const participanteSchema = z.object({
  nombres: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "El apellido es obligatorio"),
  telefono: z.string().min(1, "El telefono es obligatorio"),
  email: z.string().email("El correo debe ser un correo valido"),
  metodoPago: z.string().min(1, "El metodo de pago es obligatorio"),
  evento: z.string().min(1, "El evento es obligatorio"),
  imagen: z
    .instanceof(File)
    .refine((file) => file.size > 0, "La imagen es obligatoria"),
});

export type Participante = z.infer<typeof participanteSchema>;
export type ParticipanteFormData = Pick<
  Participante,
  "nombres" | "apellidos" | "telefono" | "email" | "metodoPago" | "evento"
> & {
  imagen: File | undefined;
};

export const AdminIdSchema = registerSchema
  .pick({
    nombres: true,
    email: true,
    username: true,
  })
  .extend({
    _id: z.string(),
  });

export type AdminId = z.infer<typeof AdminIdSchema>;
