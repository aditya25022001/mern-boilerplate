import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const __dirname = path.resolve()

//creating the transporter object which is the main instance to send emails
//passing two parameters in createTransport --> 
//service provider ( gmail in this case ) can be anything read here --> https://www.nodemailer.com/usage
//auth object taking in two keys user --> the user email who is sendng the email
//------------------------------ pass --> the password of email provided
const transporter = nodemailer.createTransport({service: 'gmail',auth:{user:EMAIL, pass:PASSWORD}})

//setting the template engine for the email template using the path module
transporter.use('compile',hbs({viewEngine:'nodemailer-express-handlebars', viewPath:path.join(__dirname,'/backend/templates')}))

const sendMail = (mailOptions) => {
    //calling the sendMail method on the transporter object created
    //take sin two parameters mailOptions and a callback function
    //the callback function takes two parameters ( error, info )
    //see console logging each to know more
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

// register email after registration
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

// forgot password otp
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

// if invalid password is entered the user will be notified
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