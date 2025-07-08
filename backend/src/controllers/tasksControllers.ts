import { Request, Response } from "express"
import { Task } from "../models/TaskModel"
import { HTTP_STATUS_CODES } from "../utils/statusCode"
import { taskSchema } from "../validators/TaskSchemaValidator"

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODES

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
    res.status(OK).json({ success: true, message: "Éxito al obtener las tareas", data: tasks })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const createTask = async (req: Request, res: Response) => {
  const { text } = req.body
  const validator = taskSchema.safeParse({ text })

  if (!validator.success) {
    res.status(BAD_REQUEST).json({ success: false, message: validator.error.issues })
    return
  }

  try {
    const task = new Task({ text, userId: req.userId })
    await task.save()
    res.status(CREATED).json({ success: true, message: "Tarea registrada", data: task })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params
  const { text } = req.body

  if (!text || !id) {
    res.status(BAD_REQUEST).json({ success: false, message: "Data invalida" })
    return
  }

  try {
    const updated = await Task.findByIdAndUpdate(id, { text }, { new: true })
    if (!updated) {
      res.status(NOT_FOUND).json({ success: false, message: "Tarea no encontrada" })
      return
    }
    res.status(OK).json({ success: true, message: "Actualizada", data: updated })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) {
      res.status(NOT_FOUND).json({ success: false, message: "Tarea no encontrada" })
      return
    }
    res.status(OK).json({ success: true, message: "Borrada", data: deleted._id })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

export { getAllTasks, createTask, updateTask, deleteTask }