import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import z, { number } from "zod"
import { AppError } from "@/utils/AppError";

class TableSessionController {

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })

            const { table_id } = bodySchema.parse(request.body)

            // abrindo a mesa
            const session = await knex<TableSession>("tables_sessions")
                .where({ table_id })
                .orderBy("opened_at") // ordendando apenas mesas ja abertas
                .first()

            // Validação para vê se a mesa ja esta aberta
            if (session && !session.closed_at) {
                throw new AppError("this table is already open")
            }

            await knex<TableSession>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now()
            })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const session = await knex<TableSession>("tables_sessions").select().orderBy("closed_at")

            return response.status(201).json(session)
        } catch (error) {
            next(error)
        }
    }


    async update(request: Request, response: Response, next: NextFunction) {
        try {

            // Validando de id é um number e passando para um number
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a much" })
                .parse(request.params.id)

            const session = await knex<TableSession>("tables_sessions")
                .where({ id })
                .first()
            // Verificando se session existe
            if (!session) {
                throw new AppError("Session not found")
            }

            // Verificando se mesa ja nao foi fechada
            if (session.closed_at) {
                throw new AppError("This session table is already closed")
            }

            await knex<TableSession>("tables_sessions").update({
                closed_at: knex.fn.now()
            }).where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { TableSessionController }