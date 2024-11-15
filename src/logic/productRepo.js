import { db } from '../config/firebase.js'
import productModel from '../models/productModel.js'

class productRepo {
    async addProduct(data){
        const product = await db.collection('products_CNPF').add({
            name: data.name,
            price: data.price,
            description: data.description,
            stock: data.stock,
            category: data.category,
            image: data.image
        })
        return product.id
    }

    async updateProduct(id, data){
        await db.collection('products_CNPF').doc(id).update(data)
    }

    async deleteProduct(id){
        await db.collection('products_CNPF').doc(id).delete()
    }

    async getAllProducts() {
        const docs = await db.collection('products_CNPF').get()
        const products = []
        docs.forEach(doc => {
            const data = doc.data()
            products.push(new productModel(
                doc.id,
                data.name,
                data.price,
                data.description,
                data.stock,
                data.category,
                data.image
            ))
        })
        return products
    }

    async getProductById(id){
        const doc = await db.collection('products_CNPF').doc(id).get()
        if(!doc.exists){
            return null
        }
        const data = doc.data()
        console.log('@data =>', data)
        return new productModel(
            doc.id,
            data.name,
            data.price,
            data.description,
            data.stock,
            data.category,
            data.image
        )
    }

    async getProductByName(name){
        const product = await db.collection('products_CNPF').where('name', '==', name).get()
        if(product.empty){
            return null
        }
        const doc = product.docs[0]
        const data = doc.data()
        return new productModel(
            doc.id,
            data.name,
            data.price,
            data.description,
            data.stock,
            data.category,
            data.image
        )
    }
}

export default productRepo