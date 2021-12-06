import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const __dirname = path.resolve()

const transporter = nodemailer.createTransport({service: 'gmail',auth:{user:EMAIL, pass:PASSWORD}})

transporter.use('compile',hbs({viewEngine:'nodemailer-express-handlebars', viewPath:path.join(__dirname,'/backend/templates')}))

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions,(err,info) => {
        if(err){
            process.env.NODE_ENV !== 'production' && console.log(err.message)
            return 'Error sending email'
        }
        else{
            process.env.NODE_ENV !== 'production' && console.log(info.response)
            return 'Email Sent'
        }
    })
}

export const welcomeEmail = (name, email) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:'Welcome Email',
        template:'welcomeEmail',
        context:{
            name:name
        }
    }
    sendMail(mailOptions)
}

export const sendOtpEmail = (name, email, otp) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:'OTP | Forgot Password',
        template:'forgotPasswordEmail',
        context:{
            otp:otp,
            name:name
        }
    }
    sendMail(mailOptions)
}

export const sendLoginWarningEmail = (name, email) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:'Suspicious Signin',
        template:'loginWarningEmail',
        context:{
            name:name,
        }
    }
    sendMail(mailOptions)
}