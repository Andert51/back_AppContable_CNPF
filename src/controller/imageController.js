import imageService from '../services/imageService.js'

const ImageService = new imageService()

const uploadImage = async (req, res) => {
    try {
        const { ownerId, ownerType } = req.body
        const id = await ImageService.uploadImage(ownerId, ownerType, req.file)
        res.status(201).json({
            success: true,
            imageId: id
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getImageByOwnerId = async (req, res) => {
    try {
        const { ownerId, ownerType } = req.params
        const image = await ImageService.getImageByOwnerId(ownerId, ownerType)
        if (!image) {
            res.status(404).json({
                success: false,
                message: 'Image not found'
            })
        }
        res.sendFile(image.imagePath)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const { ownerId, ownerType } = req.params
        await ImageService.deleteImage(ownerId, ownerType)
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

export {
    uploadImage,
    getImageByOwnerId,
    deleteImage
}