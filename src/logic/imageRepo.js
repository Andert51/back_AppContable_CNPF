import { db } from '../config/firebase.js'
import imageModel from '../models/imageModel.js'

class imageRepo {
    async addImage(data) {
        const image = await db.collection('images').add({
            ownerId: data.ownerId,
            ownerType: data.ownerType,
            imagePath: data.imagePath
        })
        return image.id
    }

    async getImageByOwnerId(ownerId, ownerType) {
        const image = await db.collection('images').where('ownerId', '==', ownerId).where('ownerType', '==', ownerType).get()
        if (image.empty) {
            return null
        }
        const doc = image.docs[0]
        const data = doc.data()
        return new imageModel(doc.id, data.ownerId, data.ownerType, data.imagePath)
    }

    async deleteImage(id) {
        await db.collection('images').doc(id).delete()
    }
}

export default imageRepo