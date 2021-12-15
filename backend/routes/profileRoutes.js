import express from 'express'
import { userProfile, userUpdateProfile, userUploadProfilePic } from '../controllers/profileController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(authenticate, userProfile)

router.route('/update').put(authenticate, userUpdateProfile)

router.route('/upload').post(authenticate, userUploadProfilePic)

export default router