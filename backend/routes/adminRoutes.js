import express from 'express'
import { getAllUsers, deleteUser } from '../controllers/adminController.js'
import { authenticate, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/users').get(authenticate,admin,getAllUsers)

router.route('/delete/:id').delete(authenticate,admin,deleteUser)

export default router