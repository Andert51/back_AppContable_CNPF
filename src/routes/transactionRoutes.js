import express from 'express'
import { check } from 'express-validator'

import {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
    getTransactionById
} from '../controller/transactionController.js'

const router = express.Router()

router.post(
    '/add',
    [
        check('clientId').notEmpty().withMessage('Client ID is required'),
        check('productId').notEmpty().withMessage('Product ID is required'),
        check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        check('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
    ],
    addTransaction
)

router.put('/update/:id', updateTransaction)
router.delete('/delete/:id', deleteTransaction)
router.get('/all', getAllTransactions)
router.get('/id/:id', getTransactionById)

export default router