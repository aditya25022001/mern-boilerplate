import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './config/db.js'

connectDB()

dotenv.config()

const app = express()

app.use(cors({
    origin:process.env.ALLOWED.split(" "),
    methods:["GET","PUT","POST","DELETE"]
}))

const PORT = process.env.PORT || 5000

const NODE_ENV = process.env.NODE_ENV || 'development'

const __dirname = path.resolve()

app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/profile',profileRoutes)

app.use('/api/upload',uploadRoutes)

app.get('/',(req,res) => res.sendFile(path.resolve(__dirname, 'backend', 'templates', 'index.html')))

app.use(notFound)

app.use(errorHandler)

app.listen(PORT,console.log(`Server running on ${PORT} in ${NODE_ENV} environment`))