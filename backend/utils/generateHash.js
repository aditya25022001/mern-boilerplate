import bcrypt from 'bcryptjs'

export const generateHash = (otp) => {
    
    // return hashed otp to the user for security 
    return bcrypt.hashSync(otp,10)
}