import express from 'express'
import { check } from 'express-validator'

import {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
    getTransactionById,
    getTransactionsByClientId,
    getTransactionsByProductId,
    getTransactionsByStatus
} from '../controller/transactionController.js'

const router = express.Router()

router.post(
    '/add',
    [
        check('clientId').notEmpty().withMessage('Client ID is required'),
        check('productId').notEmpty().withMessage('Product ID is required'),
        check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        check('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
        check('paymentMethod').notEmpty().withMessage('Payment method is required'),
        check('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
        check('transactionStatus').notEmpty().withMessage('Transaction status is required')
    ],
    addTransaction
)

router.put('/update/:id', updateTransaction)
router.delete('/delete/:id', deleteTransaction)
router.get('/all', getAllTransactions)
router.get('/id/:id', getTransactionById)
router.get('/client/:clientId', getTransactionsByClientId)
router.get('/product/:productId', getTransactionsByProductId)
router.get('/status/:status', getTransactionsByStatus)

export default router