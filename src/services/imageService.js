import fs from 'fs'
import path from 'path'
import imageRepo from '../logic/imageRepo.js'
import imageModel from '../models/imageModel.js'

const ImageRepo = new imageRepo()

class imageService {
    async uploadImage(ownerId, ownerType, file) {
        const imagePath = path.join('src', 'images', `${ownerId}_${ownerType}.png`)
        fs.writeFileSync(imagePath, file.buffer)

        const newImage = new imageModel(null, ownerId, ownerType, imagePath)
        return await ImageRepo.addImage(newImage)
    }

    async getImageByOwnerId(ownerId, ownerType) {
        return await ImageRepo.getImageByOwnerId(ownerId, ownerType)
    }

    async deleteImage(ownerId, ownerType) {
        const image = await ImageRepo.getImageByOwnerId(ownerId, ownerType)
        if (image) {
            fs.unlinkSync(image.imagePath)
            await ImageRepo.deleteImage(image.id)
        }
    }
}

export default imageService