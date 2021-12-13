import express from 'express'
import { getAllUsers, deleteUser, editUser } from '../controllers/adminController.js'
import { authenticate, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/users').get(authenticate,admin,getAllUsers)

router.route('/delete/:id').delete(authenticate,admin,deleteUser)

router.route('/update').put(authenticate,admin,editUser)

export default router