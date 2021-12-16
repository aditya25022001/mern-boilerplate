import express from 'express'
import { contactUs } from '../controllers/contactController.js'

const router = express.Router()

router.route('/').post(contactUs)

export default router