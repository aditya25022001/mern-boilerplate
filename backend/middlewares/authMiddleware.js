import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// check the token while accessing the authenticated routes
const authenticate = asyncHandler(async (req,res, next) => {
    let token
    // check for the bearer token in headers authorisation
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)    
        } catch (error) {
            res.status(401).json({ 
                message:"Token failed, try signing in again."
            })
        }
    }
    if(!token){
        res.status(401).json({
            message:"Not authorized"
        })
    }
    next()
})

// check that the user is admin or not to access admin routes
const admin = asyncHandler(async (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(403).json({
            message:"Not and admin"
        })
    }
})

export { authenticate, admin }