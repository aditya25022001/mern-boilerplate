import express from 'express'
import { authenticate, admin } from '../middlewares/authMiddleware.js'
import { getApiEndpoints, addApi, editApi, deleteApi } from '../controllers/apiController.js'

const router = express.Router()

router.route('/get').get(getApiEndpoints)

router.route('/add').post(authenticate,admin,addApi)

router.route('/edit').put(authenticate,admin,editApi)

router.route('/delete/:id').delete(authenticate,admin,deleteApi)

export default router