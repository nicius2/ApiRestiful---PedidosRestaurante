import { Router } from "express";
import { TableSessionController } from "@/controller/tableSessionController"

const tableSessionRouter = Router()
const tableSessionController = new TableSessionController()

tableSessionRouter.post("/", tableSessionController.create)
tableSessionRouter.get("/", tableSessionController.index)
tableSessionRouter.put("/:id", tableSessionController.update)

export { tableSessionRouter }