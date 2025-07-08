import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URI_DB = process.env.URI_DB ?? ""

const connect = async () => {
  try {
    await mongoose.connect(URI_DB)
    console.log("Conectado correctamente con MongoDb")
  } catch (error) {
    console.log("Error al conectarse a MongoDB")
  }
}

export { connect }
