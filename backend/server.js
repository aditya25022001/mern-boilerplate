import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

// initialise express application
const app = express()

// set port on which the server will listen
const PORT = process.env.PORT || 5000

// set the node environment
const NODE_ENV = process.env.NODE_ENV || 'development'

// to use the environment variables in .env file
dotenv.config()

// to use __dirname in module format of node
const __dirname = path.resolve()

// to communicate in JSON format
app.use(express.json())

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

// listen the server on the given port
app.listen(PORT,`Server running on ${PORT} in ${NODE_ENV} environment`)