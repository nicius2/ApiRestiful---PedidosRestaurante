import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex"
import { AppError } from "@/utils/AppError";

class ProductsController {

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const name = typeof request.query.name === "string" ? request.query.name : "";

            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name}%`) // Transforma tudo em minúsculas
                .orderBy("name");

            return response.status(200).json(products);
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, reponse: Response, next: NextFunction) {
        try {
            // Validando os dados passados se correspondem
            const bodySchema = z.object({
                name: z.string({ required_error: "é preciso passar um nome" }).trim().min(6),
                price: z.number().gt(0, { message: "preço tem que ser maior que 0" })
            })

            const { name, price } = bodySchema.parse(request.body)

            // Passando type
            await knex<ProductRepository>("products").insert({ name, price })

            return reponse.status(201).json({ name, price })
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            // Validando se id é number e passando para numero
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be much" })
                .parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            })

            const products = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!products) {
                throw new AppError("not found")
            }

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>("products")
                .update({ name, price })
                .where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a much" })
                .parse(request.params.id)

            const products = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!products) {
                throw new AppError("product not found")
            }

            await knex<ProductRepository>("products").delete().where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }

}

export { ProductsController }