import { Router } from 'express'
import clientRoutes from './clientRoutes.js'
import authRoutes from './authRoutes.js'
import productRoutes from './productRoutes.js'
import transactionRoutes from './transactionRoutes.js'
import imageRoutes from './imageRoutes.js'

const router = Router()

router.use('/client', clientRoutes)
router.use('/auth', authRoutes)
router.use('/product', productRoutes)
router.use('/transaction', transactionRoutes)
router.use('/image', imageRoutes)

export default router