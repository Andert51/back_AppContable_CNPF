import fs from 'fs'
import path from 'path'
import productRepo from '../logic/productRepo.js'
import productModel from '../models/productModel.js'

const ProductRepo = new productRepo()

class productService {
    async addProduct(data, file){
        const existProduct = await ProductRepo.getProductByName(data.name)
        if (existProduct){
            throw new Error ('Product already exists in the database')
        }

        const newProduct = new productModel(
            null,
            data.name,
            data.price,
            data.description,
            data.stock,
            data.category,
            data.image,
        )

        const productId = await ProductRepo.addProduct(newProduct)

        if (file){
            const image = `${productId}_image.png`
            const imagePath = path.join('src', 'productImages', image)
            fs.writeFileSync(imagePath, file.buffer)
            await ProductRepo.updateProduct(productId, {image:image})
        }
    }

    async updateProduct(id, data, file){
        const existProduct = await ProductRepo.getProductById(id)
        if (!existProduct){
            throw new Error('Product not found')
        }

        if (file){
            const image = `${id}_image.png`
            const imagePath = path.join('src', 'productImages', image)
            fs.writeFileSync(imagePath, file.buffer)
            data.image = image
        }

        await ProductRepo.updateProduct(id, data)
    }

    async deleteProduct(id){
        const existProduct = await ProductRepo.getProductById(id)
        if (!existProduct){
            throw new Error('Product not found')
        }
        await ProductRepo.deleteProduct(id)
    }

    async getAllProducts(){
        return await ProductRepo.getAllProducts()
    }

    async getProductById(id){
        return await ProductRepo.getProductById(id)
    }

    async getProductByName(name){
        return await ProductRepo.getProductByName(name)
    }
}

export default productService