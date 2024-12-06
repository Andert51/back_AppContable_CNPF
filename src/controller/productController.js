import productService from "../services/productService.js"

const ProductService = new productService()

const addProduct = async (req, res) => {
    console.log('@body ', req)
    try {
        const id = await ProductService.addProduct(req.body, req.file)
        res.status(201).json({ 
            success: true,
            productId: id
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        await ProductService.updateProduct(id, req.body, req.file)
        res.status(201).json({
            success: true
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await ProductService.deleteProduct(id)
        res.status(201).json({
            success: true
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts()
        res.status(201).json({
            success: true,
            products: products
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        console.log('@id', id)
        const product = await ProductService.getProductById(id)
        if(!product){
            res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(201).json({
            success: true,
            product: product
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductByName = async (req, res) => {
    try {
        const name = req.params.name
        const product = await ProductService.getProductByName(name)
        if(!product){
            res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(201).json({
            success: true,
            product: product
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const products = await ProductService.getProductsByCategory(category)
        res.status(201).json({
            success: true,
            products: products
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductsByBrand = async (req, res) => {
    try {
        const brand = req.params.brand
        const products = await ProductService.getProductsByBrand(brand)
        res.status(201).json({
            success: true,
            products: products
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductsByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query
        const products = await ProductService.getProductsByPriceRange(Number(minPrice), Number(maxPrice))
        res.status(201).json({
            success: true,
            products: products
        })
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsByCategory,
    getProductsByBrand,
    getProductsByPriceRange
}