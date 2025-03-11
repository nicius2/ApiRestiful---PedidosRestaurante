import { Request, Response, NextFunction } from "express";
import {knex} from "@/database/knex";

class TablesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables")
                .select()
                .orderBy("table_number")

            return response.status(200).json(tables);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export { TablesController }