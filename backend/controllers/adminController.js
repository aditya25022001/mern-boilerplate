import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import path from 'path'
import fs from 'fs'

export const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
    res.status(200).json({
        message:"Users fetched successfully!",
        users
    })
})

export const deleteUser = asyncHandler(async(req,res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if(user){
        const image = user.profilePic
        if(image!==""){
            fs.unlinkSync(path.join(path.resolve(),`/frontend/public/profilePics/${image}`))
        }
        await user.remove()
        res.status(204).json({ message:"deleted successfully" })
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})

export const editUser = asyncHandler(async(req,res) => {
    const { id, isAdmin } = req.body
    const user = await User.findById(id)
    if(user){
        user.name = user.name
        user.email = user.email
        user.profilePic = user.profilePic
        user.password = user.password
        user.isAdmin = isAdmin
        const updatedUser = await user.save()
        if(updatedUser){
            res.status(200).json({
                message:"User updated successfully",
                id:updatedUser._id,
                isAdmin:updatedUser.isAdmin
            })
        }
        else{
            res.status(500).json({
                message:"Error updating user"
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found!"
        })
    }
})