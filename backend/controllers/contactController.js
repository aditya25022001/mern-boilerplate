import asyncHandler from 'express-async-handler'
import { sendContactEmail } from './emailController.js'

export const contactUs = asyncHandler(async(req,res) => {
    const { name, message, email } = req.body
    sendContactEmail(name, email, message)
    res.status(200).json({
        message:`Message recieved successfully - ${message}`
    })
})