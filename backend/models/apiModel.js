import mongoose from 'mongoose'

const apiSchema = mongoose.Schema({
    method:{
        type:String,
        required:true
    },
    route:{
        type:String,
        required:true,
        unique:true
    },
    parameters:{
        type:String,
        required:true
    },
    access:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const API = mongoose.model("Api",apiSchema)

export default API