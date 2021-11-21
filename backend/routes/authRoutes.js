import express from 'express'
import { login, register, resetPassword, sendOtp } from '../controllers/authController'

const router = express.Router()

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/sendOTP').post(sendOtp)

router.route('/reset/:id').put(resetPassword)

export default router