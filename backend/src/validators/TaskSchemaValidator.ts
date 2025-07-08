// src/validators/TaskSchemaValidator.ts
import { z } from "zod"

export const taskSchema = z.object({
  text: z.string().min(1, { message: "El texto no puede estar vacío" })
})