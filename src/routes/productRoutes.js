import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { check } from 'express-validator'
import multer from 'multer'

import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllproducts,
    getProductById,
    getProductByName
} from '../controller/productController.js'

const upload = multer ({ storage: multer.memoryStorage() })
const router = express.Router()

router.post(
    '/add',
    //authMiddleware,
    upload.single('image'),
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('price').notEmpty().withMessage('Price is required'),
        check('description').notEmpty().withMessage('Description is required')
    ],
    addProduct
)

router.put('/update/:id', /*authMiddleware,*/ upload.single('image'), updateProduct)
router.delete('/delete/:id', /*authMiddleware,*/ deleteProduct)
router.get('/all', /*authMiddleware,*/ getAllproducts)
router.get('/id/:id', /*authMiddleware,*/ getProductById)
router.get('/name/:name', /*authMiddleware,*/ getProductByName)

export default router

