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
            data.date
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
}

export default transactionService