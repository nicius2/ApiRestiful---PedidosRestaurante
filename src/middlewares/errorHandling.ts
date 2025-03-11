import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod"
import { AppError } from "@/utils/AppError";

export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) {
    // Show me the error 400 - client
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message })
    }

    if (error instanceof ZodError) {
        return response
            .status(400)
            .json({ message: "validation error", issues: error.format() })
    }

    // show me the error 500 - Server
    return response.status(500).json({ message: error.message })
}