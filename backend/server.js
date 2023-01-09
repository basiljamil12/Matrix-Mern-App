import express from "express"
import cors from "cors"
import employees from "./api/employees.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/employees", employees)
app.use("*", (req,res) => res.status(404).json({ Error: "Not Found"}))

export default app