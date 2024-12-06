import transactionRepo from '../logic/transactionRepo.js'
import transactionModel from '../models/transactionModel.js'

const TransactionRepo = new transactionRepo()

class transactionService {
    async addTransaction(data) {
        const newTransaction = new transactionModel(
            null,
            data.clientId,
            data.productId,
            data.quantity,
            data.totalPrice,
            data.date,
            data.paymentMethod,
            data.totalAmount,
            data.transactionStatus
        )
        return await TransactionRepo.addTransaction(newTransaction)
    }

    async updateTransaction(id, data) {
        await TransactionRepo.updateTransaction(id, data)
    }

    async deleteTransaction(id) {
        await TransactionRepo.deleteTransaction(id)
    }

    async getAllTransactions() {
        return await TransactionRepo.getAllTransactions()
    }

    async getTransactionById(id) {
        return await TransactionRepo.getTransactionById(id)
    }

    async getTransactionsByClientId(clientId) {
        return await TransactionRepo.getTransactionsByClientId(clientId)
    }

    async getTransactionsByProductId(productId) {
        return await TransactionRepo.getTransactionsByProductId(productId)
    }

    async getTransactionsByStatus(status) {
        return await TransactionRepo.getTransactionsByStatus(status)
    }
}

export default transactionService