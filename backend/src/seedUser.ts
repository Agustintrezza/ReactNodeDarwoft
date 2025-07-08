import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { User } from "../src/models/UserModel"

dotenv.config()

const URI_DB = process.env.URI_DB!

const createUser = async () => {
  try {
    await mongoose.connect(URI_DB)
    console.log("🔌 Conectado a MongoDB")

    const email = "admin@mail.com"
    const password = "123456"
    const hash = await bcrypt.hash(password, 10)

    const existing = await User.findOne({ email })
    if (existing) {
      console.log("El usuario ya existe")
    } else {
      const user = new User({ email, password: hash })
      await user.save()
      console.log("Usuario creado:", email)
    }

    mongoose.disconnect()
  } catch (err) {
    console.error("Error al crear usuario:", err)
  }
}

createUser()
