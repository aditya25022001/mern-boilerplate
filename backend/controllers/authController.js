import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { welcomeEmail, sendLoginWarningEmail, sendOtpEmail } from './emailController.js'
import { generateToken } from '../utils/generateToken.js'
import { generateHash } from '../utils/generateHash.js'
import { v4 } from 'uuid'

// route        POST/api/auth/register
// access       public
// descripton   User registration
export const register = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400).json({
            message:"User with that email already exists"
        })
    }
    else{
        const user = await User.create({
            name, email, password
        })
        if(user){
            welcomeEmail(name, email)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(400).json({
                message:"Invalid user data"
            })
        }
    }
})

// route        POST/api/auth/login
// access       public
// descripton   User login
export const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists && (await userExists.matchPassword(password))) {
        res.status(200).json({
            _id: userExists._id,
            name:userExists.name,
            email:userExists.email,
            isAdmin:userExists.isAdmin,
            profilePic:userExists.profilePic,
            token: generateToken(userExists._id),
        })
    }
    else{
        sendLoginWarningEmail(userExists.name, email)
        res.status(401).json({
            message:"Bad credentials"
        })
    }
})

// route        POST/api/auth/sendOTP
// access       public
// descripton   Sending OTP to users to recover password
export const sendOtp = asyncHandler(async (req,res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if(user){
        const otp = v4().slice(0,8)
        sendOtpEmail(user.name, email, otp)
        res.status(200).json({
            _id: user._id,
            otp:generateHash(otp),
            email: user.email,
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})

// route        PUT/api/auth/reset/:id
// access       public
// descripton   Reseting password of the user
export const resetPassword = asyncHandler(async (req,res) => {
    const { password, id } = req.body
    const user = await User.findById(id)
    if(user){
        user.name = user.name
        user.email = user.email
        user.password = password
        user.isAdmin = user.isAdmin
        user.profilePic = user.profilePic
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            email: updatedUser.email,
            message:"Password Reset Successful"
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})