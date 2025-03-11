import { Router } from "express";
import { OrderController } from "@/controller/orderController"

const orderRoutes = Router()
const orderController = new OrderController()

// Passando as rotas
orderRoutes.post("/", orderController.create)
orderRoutes.get("/table-session/:table_session_id", orderController.index) 
orderRoutes.get("/table-session/:table_session_id/total", orderController.show) 

export { orderRoutes }