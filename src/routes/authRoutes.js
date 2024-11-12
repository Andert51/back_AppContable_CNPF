import { Router } from "express";
import { login, logout, getClient } from '../controller/authController'
import { check } from 'express-validator'
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.post(
    '/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty()
    ],
    login
)

router.post('/logout', logout)
router.get('/client', authMiddleware, getClient)

export default router