import { Schema, model } from "mongoose"

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { versionKey: false })

const User = model("User", userSchema)

export { User }