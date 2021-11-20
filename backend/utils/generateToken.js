import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (id) => {

    // json web token scret from env file
    const JWTSecret = process.env.JWT_SECRET
    
    // signing the token for authentication
    return jwt.sign(id,JWTSecret,{ expiresIn:"10h" })
}