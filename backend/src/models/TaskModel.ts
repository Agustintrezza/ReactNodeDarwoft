import { Schema, model } from "mongoose"

const taskSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { versionKey: false, timestamps: true })

const Task = model("Task", taskSchema)

export { Task }