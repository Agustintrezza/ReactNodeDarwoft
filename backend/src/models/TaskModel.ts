import { Schema, model } from "mongoose"

const taskSchema = new Schema({
  text: { type: String, required: true },
  status: {
    type: String,
    enum: ['pendiente', 'hecha'],
    default: 'pendiente',
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { versionKey: false, timestamps: true })

const Task = model("Task", taskSchema)

export { Task }