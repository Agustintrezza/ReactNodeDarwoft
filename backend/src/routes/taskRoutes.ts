import { Router } from "express"
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasksControllers"
import { authMiddleware } from "../middlewares/auth"

const taskRouter = Router()

taskRouter.get("/", authMiddleware, getAllTasks)
taskRouter.post("/", authMiddleware, createTask)
taskRouter.patch("/:id", authMiddleware, updateTask)
taskRouter.delete("/:id", authMiddleware, deleteTask)

export { taskRouter }