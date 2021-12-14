import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'

export const userProfile = asyncHandler(async(req,res) => {
    const id = req.user._id
    const user = await User.findById(id).select('-password')
    if(user){
        res.status(200).json({
            message:"User found",
            user:user
        })
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})

export const userUpdateProfile = asyncHandler(async(req,res) => {
    const { name } = req.body
    const id = req.user._id
    const user = await User.findById(id)
    if(user){
        user.name = name || user.name
        user.email = user.email
        user.isAdmin = user.isAdmin
        user.password = user.password
        user.profilePic = user.profilePic
        const updatedUser = await user.save()
        if(updatedUser){
            res.status(200).json({
                message:"User updated successfully",
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                profilePic:updatedUser.profilePic,
                isadmin:updatedUser.isadmin,
                lastLogin:updatedUser.lastLogin,
                token:generateToken(updatedUser._id)
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})