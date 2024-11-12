import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import clientRepo from '../logic/clientRepo'
const ClientRepo = new clientRepo()

export const login = async (req, res) => {
    const { username, password } = req.body
    console.log('@body => ', username, password)

    try {
        const user = await ClientRepo.getClientByUsername(username)

        if(!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        console.log('@user => ', user)
        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            res.status(401).json({
                success: false,
                message: 'Invalid password'
            })
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
    )
    return res.status(200).json({
        success:true,
        token: token
    })

    } catch (error){
        res.status(401).json({
            success: false,
            message: 'Error: ' + error.message
        })
    }
}

export const getClient = async (req, res) => {
    try {
        const clientId = req.user.clientId
        const user = await ClientRepo.getClientById(clientId)

        if (!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error obtaining user' 
        })
    }
}

export const logout = (req, res) => {
    res.json({
        error: false,
        message: 'Logged out successfully'
    })
}