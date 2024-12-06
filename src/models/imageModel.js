class imageModel {
    constructor(id, ownerId, ownerType, imagePath) {
        this.id = id
        this.ownerId = ownerId
        this.ownerType = ownerType // 'client' or 'product'
        this.imagePath = imagePath
    }
}

export default imageModel