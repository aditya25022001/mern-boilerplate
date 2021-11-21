import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// schema of user the fields and types
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        required:false,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

// used for authetication while login to match the password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

// always before any save of the user ( update or register ) hash the password
userSchema.pre('save', async function(next) {
    if(!this.isModified){
        next()
    }
    else{
        const salt = bcrypt.genSalt(10)
        this.password = bcrypt.hash(this.password, salt)
    }
})

const User = mongoose.model('UserMernStarter', userSchema)

export default User