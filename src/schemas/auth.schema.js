import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  email: z.string({ required_error: "El email es requerido" }).email({
    message: "Email invalido",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "El email es requerido" }).email({
    message: "Email invalido",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});
