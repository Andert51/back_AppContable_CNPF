import transactionService from '../services/transactionService.js'

const TransactionService = new transactionService()

const addTransaction = async (req, res) => {
    try {
        const id = await TransactionService.addTransaction(req.body)
        res.status(201).json({
            success: true,
            transactionId: id
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const id = req.params.id
        await TransactionService.updateTransaction(id, req.body)
        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id
        await TransactionService.deleteTransaction(id)
        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionService.getAllTransactions()
        res.status(201).json({
            success: true,
            transactions: transactions
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getTransactionById = async (req, res) => {
    try {
        const id = req.params.id
        const transaction = await TransactionService.getTransactionById(id)
        if (!transaction) {
            res.status(404).json({
                success: false,
                message: 'Transaction not found'
            })
        }
        res.status(201).json({
            success: true,
            transaction: transaction
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
    getTransactionById
}