import { Router } from 'express'
import clientRoutes from './clientRoutes'
import authRoutes from './authRoutes'

const router = Router()

router.use('/client', clientRoutes)
router.use('/auth', authRoutes)

export default router