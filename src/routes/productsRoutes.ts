import { Router } from "express";
import { ProductsController } from "@/controller/productsController";

const productsController = new ProductsController()
const productsRoutes = Router()

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", productsController.create)
productsRoutes.put("/:id", productsController.update)
productsRoutes.delete("/:id", productsController.remove)

export { productsRoutes }