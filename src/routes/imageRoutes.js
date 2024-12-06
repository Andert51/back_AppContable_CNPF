import express from 'express'
import multer from 'multer'
import { uploadImage, getImageByOwnerId, deleteImage } from '../controller/imageController.js'

const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

router.post('/upload', upload.single('image'), uploadImage)
router.get('/:ownerType/:ownerId', getImageByOwnerId)
router.delete('/:ownerType/:ownerId', deleteImage)

export default router