import { Router } from 'express'
import clientRoutes from './clientRoutes.js'
import authRoutes from './authRoutes.js'

const router = Router()

router.use('/client', clientRoutes)
router.use('/auth', authRoutes)

export default router