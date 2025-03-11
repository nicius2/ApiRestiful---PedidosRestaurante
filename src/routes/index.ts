import { Router } from "express";

import { productsRoutes } from "./productsRoutes";
import { tablesRoutes } from "./tableRoutes";
import { tableSessionRouter } from "./tableSessionRoutes"
import { orderRoutes } from "./orderRoutes"

const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)
routes.use("/tables_sessions", tableSessionRouter)
routes.use("/orders", orderRoutes)

export { routes }