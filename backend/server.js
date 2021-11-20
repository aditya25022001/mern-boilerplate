import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT,`Server running on ${PORT} in ${NODE_ENV} environment`)