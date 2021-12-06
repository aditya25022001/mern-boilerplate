import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { authenticate } from '../middlewares/authMiddleware.js'
import { uploadProfilePic } from '../controllers/uploadController.js'

const router = express.Router()

const __dirname = path.resolve()
const relativePath = 'frontend/public/profilePics'

const storage = multer.diskStorage({
    destination(req,file,callBack){
        const pathToCheck = path.join(__dirname,`/${relativePath}`)
        if(!fs.existsSync(pathToCheck)){
            fs.mkdirSync(pathToCheck)
        }
        callBack(null, `${relativePath}/`)
    },
    filename(req,file,callBack){
        const fileName = `${req.user._id}${path.extname(file.originalname)}`
        callBack(null, fileName)
    }
})

function checkFileType(file, callBack){
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if(extName && mimeType){
        return callBack(null,true)
    }
    else{
        return callBack(Error('Images only!'))
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,file,callBack){
        checkFileType(file, callBack)
    }
})

router.route('/').post(authenticate,upload.single('application'),uploadProfilePic)

export default router