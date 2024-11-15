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

