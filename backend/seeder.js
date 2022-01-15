import User from './models/userModel.js'
import API from './models/apiModel.js'
import dotenv from 'dotenv'
import { usermernstarter } from './data/usermernstarter.js'
import { endpoints } from './data/apiendpoints.js'
import { connectDB } from './config/db.js'

dotenv.config()

connectDB()

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

const importApiData = async() => {
    try{
        await API.deleteMany()
        await API.insertMany(endpoints)
        console.log("API endpoint(s) added!")
        process.exit(0)
    }
    catch(error){
        console.log(`Error - ${error.message}`)
        process.exit(1)
    }
}

switch(process.argv[2]){
    case "-d":
        destroyData()
        break;
    case "-api":
        importApiData()
        break;
    default:
        importData()
        break;
}
