import { db } from '../config/firebase.js'
import clientModel from '../models/clientModel.js'

class clientRepo {
    async addClient(data){
        const client = await db.collection('clients_CNPF').add({
            name: data.name,
        })
    }
}