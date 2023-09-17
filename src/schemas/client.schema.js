import { z } from "zod";

export const createClientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .nonempty({
      message: "El nombre debe contener al menos 1 caracter",
    }),
  lastname: z
    .string({
      required_error: "El apellido es requerido",
    })
    .nonempty({
      message: "El apellido debe contener al menos 1 caracter",
    }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .nonempty({ message: "El email debe contener al menos 1 caracter" })
    .email({
      message: "Email invalido",
    }),
  telephone: z
    .string({
      required_error: "El telefono es requerido",
    })
    .nonempty({
      message: "El telefono debe contener al menos 1 caracter",
    }),
  studies: z
    .string({
      required_error: "Los estudios son requeridos",
    })
    .nonempty({
      message: "Los estudios deben contener al menos 1 caracter",
    }),
  comments: z
    .string({
      required_error: "Los comentarios son requeridos",
    })
    .nonempty({
      message: "Los comentarios deben contener al menos 1 caracter",
    }),
});
