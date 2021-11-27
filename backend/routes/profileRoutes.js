import express from 'express'
import { userProfile, userUpdateProfile } from '../controllers/profileController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/get/:id').get(authenticate, userProfile)

router.route('/update').put(authenticate, userUpdateProfile)

export default router