import { Router } from 'express'
import clientRoutes from './clientRoutes.js'
import authRoutes from './authRoutes.js'
import productRoutes from './productRoutes.js'
import transactionRoutes from './transactionRoutes.js'

const router = Router()

router.use('/client', clientRoutes)
router.use('/auth', authRoutes)
router.use('/product', productRoutes)
router.use('/transaction', transactionRoutes)

export default router