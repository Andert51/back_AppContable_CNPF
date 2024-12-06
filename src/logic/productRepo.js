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
            image: data.image,
            brand: data.brand,
            weight: data.weight,
            dimensions: data.dimensions,
            color: data.color,
            material: data.material
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
                data.image,
                data.brand,
                data.weight,
                data.dimensions,
                data.color,
                data.material
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
        return new productModel(
            doc.id,
            data.name,
            data.price,
            data.description,
            data.stock,
            data.category,
            data.image,
            data.brand,
            data.weight,
            data.dimensions,
            data.color,
            data.material
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
            data.image,
            data.brand,
            data.weight,
            data.dimensions,
            data.color,
            data.material
        )
    }

    async getProductsByCategory(category){
        const products = await db.collection('products_CNPF').where('category', '==', category).get()
        if(products.empty){
            return []
        }
        return products.docs.map(doc => {
            const data = doc.data()
            return new productModel(
                doc.id,
                data.name,
                data.price,
                data.description,
                data.stock,
                data.category,
                data.image,
                data.brand,
                data.weight,
                data.dimensions,
                data.color,
                data.material
            )
        })
    }

    async getProductsByBrand(brand){
        const products = await db.collection('products_CNPF').where('brand', '==', brand).get()
        if(products.empty){
            return []
        }
        return products.docs.map(doc => {
            const data = doc.data()
            return new productModel(
                doc.id,
                data.name,
                data.price,
                data.description,
                data.stock,
                data.category,
                data.image,
                data.brand,
                data.weight,
                data.dimensions,
                data.color,
                data.material
            )
        })
    }

    async getProductsByPriceRange(minPrice, maxPrice){
        const products = await db.collection('products_CNPF').where('price', '>=', minPrice).where('price', '<=', maxPrice).get()
        if(products.empty){
            return []
        }
        return products.docs.map(doc => {
            const data = doc.data()
            return new productModel(
                doc.id,
                data.name,
                data.price,
                data.description,
                data.stock,
                data.category,
                data.image,
                data.brand,
                data.weight,
                data.dimensions,
                data.color,
                data.material
            )
        })
    }
}

export default productRepo