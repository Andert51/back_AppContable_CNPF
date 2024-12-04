import { db } from '../config/firebase.js'
import transactionModel from '../models/transactionModel.js'

class transactionRepo {
    async addTransaction(data) {
        const transaction = await db.collection('transactions').add({
            clientId: data.clientId,
            productId: data.productId,
            quantity: data.quantity,
            totalPrice: data.totalPrice,
            date: data.date
        })
        return transaction.id
    }

    async updateTransaction(id, data) {
        await db.collection('transactions').doc(id).update(data)
    }

    async deleteTransaction(id) {
        await db.collection('transactions').doc(id).delete()
    }

    async getAllTransactions() {
        const docs = await db.collection('transactions').get()
        const transactions = []
        docs.forEach(doc => {
            const data = doc.data()
            transactions.push(new transactionModel(
                doc.id,
                data.clientId,
                data.productId,
                data.quantity,
                data.totalPrice,
                data.date
            ))
        })
        return transactions
    }

    async getTransactionById(id) {
        const doc = await db.collection('transactions').doc(id).get()
        if (!doc.exists) {
            return null
        }
        const data = doc.data()
        return new transactionModel(
            doc.id,
            data.clientId,
            data.productId,
            data.quantity,
            data.totalPrice,
            data.date
        )
    }
}

export default transactionRepo