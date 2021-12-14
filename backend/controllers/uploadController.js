import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import fs from 'fs'
import path from 'path'

const uploadProfilePic = asyncHandler(async(req,res)=>{
    const fileName = req.file.filename
    const user = await User.findById(req.user._id)
    if(user){
        const delFile = user.profilePic
        const filePath = path.join(path.resolve(),`/frontend/public/profilePics/${delFile}`)
        user.name = user.name
        user.email = user.email
        user.password = user.password
        user.isAdmin = user.isAdmin
        user.profilePic = fileName
        user.lastLogin = user.lastLogin
        const updatedUser = await user.save()
        if(delFile!=="" && delFile.split(".")[1]!==fileName.split(".")[1] && fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
        res.status(200).json({
            message:"Uploaded Successfully",
            filename : req.file.filename,
            _id:updatedUser._id,
            success:true
        })
    }
    else{
        res.status(500).json({
            message:"Error while uploading"
        })
    }
})

export { uploadProfilePic }