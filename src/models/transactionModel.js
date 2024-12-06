class transactionModel {
    constructor(id, clientId, productId, quantity, totalPrice, date, paymentMethod, totalAmount, transactionStatus) {
        this.id = id
        this.clientId = clientId
        this.productId = productId
        this.quantity = quantity
        this.totalPrice = totalPrice
        this.date = date
        this.paymentMethod = paymentMethod
        this.totalAmount = totalAmount
        this.transactionStatus = transactionStatus
    }
}

export default transactionModel