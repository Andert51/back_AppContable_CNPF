import { db } from '../config/firebase.js'
import clientModel from '../models/clientModel.js'

class clientRepo {
    async addClient(data){
        const client = await db.collection('clients_CNPF').add({
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            info: data.info,
            password: data.password,
            role: data.role,
            image: data.image,
            address: data.address,
            city: data.city
        })
        return client.id
    }

    async updateClient(id, data){
        await db.collection('clients_CNPF').doc(id).update(data)
    }

    async deleteClient(id){
        await db.collection('clients_CNPF').doc(id).delete()
    }

    async getAllClients() {
        const docs = await db.collection('clients_CNPF').get()
        const clients = []
        docs.forEach(doc => {
            const data = doc.data()
            clients.push(new clientModel(
                doc.id,
                data.name,
                data.username,
                data.email,
                data.phone,
                data.info,
                data.password,
                data.role,
                data.image,
                data.address,
                data.city
            ))
        })
        return clients
    }

    async getClientById(id){
        const doc = await db.collection('clients_CNPF').doc(id).get()
        if(!doc.exists){
            return null
        }
        const data = doc.data()
        return new clientModel(
            doc.id,
            data.name,
            data.username,
            data.email,
            data.phone,
            data.info,
            data.password,
            data.role,
            data.image,
            data.address,
            data.city
        )
    }

    async getClientByUsername(username){
        const client = await db.collection('clients_CNPF').where('username', '==', username).get()
        if(client.empty){
            return null
        }
        const doc = client.docs[0]
        const data = doc.data()
        return new clientModel(
            doc.id,
            data.name,
            data.username,
            data.email,
            data.phone,
            data.info,
            data.password,
            data.role,
            data.image,
            data.address,
            data.city
        )
    }

    async getClientsByCity(city){
        const clients = await db.collection('clients_CNPF').where('city', '==', city).get()
        if(clients.empty){
            return []
        }
        return clients.docs.map(doc => {
            const data = doc.data()
            return new clientModel(
                doc.id,
                data.name,
                data.username,
                data.email,
                data.phone,
                data.info,
                data.password,
                data.role,
                data.image,
                data.address,
                data.city
            )
        })
    }

    async getClientsByAddress(address){
        const clients = await db.collection('clients_CNPF').where('address', '==', address).get()
        if(clients.empty){
            return []
        }
        return clients.docs.map(doc => {
            const data = doc.data()
            return new clientModel(
                doc.id,
                data.name,
                data.username,
                data.email,
                data.phone,
                data.info,
                data.password,
                data.role,
                data.image,
                data.address,
                data.city
            )
        })
    }
}

export default clientRepo