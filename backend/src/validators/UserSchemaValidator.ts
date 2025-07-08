// src/validators/UserSchemaValidator.ts
import { z } from "zod"

export const userSchema = z.object({
  email: z.string().email({ message: "Email no válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
})