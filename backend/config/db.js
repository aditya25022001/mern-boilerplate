import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async() => {
    try {
        const mongoURI = process.env.MONGO_URI
        const connection = await mongoose.connect(mongoURI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Mongo DB connected ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error in connecting to Mongo - ${error.message}`)
        process.exit(1)
    }
}