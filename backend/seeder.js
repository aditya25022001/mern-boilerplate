import User from './models/userModel.js'
import dotenv from 'dotenv'
import { usermernstarter } from './data/usermernstarter.js'
import { connectDB } from './config/db.js'

dotenv.config()

// connect to the database
connectDB()

// import data to our database collection
const importData = async() => {
    try {
        await User.deleteMany()
        await User.insertMany(usermernstarter)
        console.log("Data added !")
        process.exit(0)
    } catch (error) {
        console.log(`Error - ${error.message}`)
        process.exit(1)
    }
}

// remove data from our database collections
const destroyData = async() => {
    try {
        await User.deleteMany()
        console.log("Data deleted !")
        process.exit(0)
    } catch (error) {
        console.log(`Error - ${error.message}`)
        process.exit(1)
    }
}

// if passed -d in command run destroyData function
if(process.argv[2]==="-d"){
    destroyData()
}   
else{
    importData()
}