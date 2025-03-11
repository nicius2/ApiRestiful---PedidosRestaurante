import { Router } from "express";
 
import { TablesController } from "@/controller/tablesController"

const tablesRoutes = Router()
const tablesController = new TablesController()

tablesRoutes.get("/", tablesController.index)

export { tablesRoutes }