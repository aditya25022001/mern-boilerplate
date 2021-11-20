import bcrypt from 'bcryptjs'

export const usermernstarter = [
    {
        name:"Aditya Uday Ubale",
        email:"adityaubale63@gmail.com",
        password:bcrypt.hashSync('AdityaUbale01@#',10),
        isAdmin:true
    },
    {
        name:"Akshat Mishra",
        email:"akshatmishra63@gmail.com",
        password:bcrypt.hashSync('AkshatMishra01@#',10),
        isAdmin:false
    },
    {
        name:"Gaurav Pare",
        email:"gauravpare63@gmail.com",
        password:bcrypt.hashSync('GauravPare01@#',10),
        isAdmin:false
    }
]