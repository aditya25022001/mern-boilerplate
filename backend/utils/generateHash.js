import bcrypt from 'bcryptjs'

export const generateHash = (otp) => {
    
    return bcrypt.hashSync(otp,10)
}