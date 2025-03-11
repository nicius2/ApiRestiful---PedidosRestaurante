import express from "express"
import { routes } from "./routes"
import { errorHandling } from "./middlewares/errorHandling"

const PORT = 3332
const app = express()

app.use(express.json()) // file type used
app.use(routes) // Passando todas as rotas
app.use(errorHandling) // Passando o middlewares
app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`)
})