import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

// connect to the database
connectDB()

// initialise express application
const app = express()

// to use the environment variables in .env file
dotenv.config()

// set port on which the server will listen
const PORT = process.env.PORT || 5000

// set the node environment
const NODE_ENV = process.env.NODE_ENV || 'development'

// to use __dirname in module format of node
const __dirname = path.resolve()

// to communicate in JSON format
app.use(express.json())

// use the routes defined in authRoutes for the pattern /api/auth
app.use('/api/auth',authRoutes)

// use the routes defined in profileRoutes for the pattern /api/profile
app.use('/api/profile',profileRoutes)

if(NODE_ENV==='production'){

    // to specify the API detail of our application in production mode ( optional )
    app.get('/api/detail',(req,res) => res.sendFile(path.resolve(__dirname, 'backend', 'templates', 'index.html')))
    
    // other than the above routes if any route is hit by user point to the frontend build folder
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}
else{
    // to specify the API detail of our application in development mode ( optional )
    app.get('/',(req,res) => res.sendFile(path.resolve(__dirname, 'backend', 'templates', 'index.html')))
}

// use this middleware when any api endpoint is not found
app.use(notFound)

// use this middleware when any error is encountered
app.use(errorHandler)

// listen the server on the given port
app.listen(PORT,console.log(`Server running on ${PORT} in ${NODE_ENV} environment`))