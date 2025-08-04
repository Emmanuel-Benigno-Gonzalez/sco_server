import { Request, Response } from 'express'
import Usuario from '../models/Usuario.model'
import { checkpassword, hashpassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const getUsuario = async (req: Request, res: Response) => {

    try {
        const usuario = await Usuario.findAll()
        res.json({ data: usuario })
    } catch (error) {
        console.log(error)
    }

}

export const createAccount = async (req: Request, res: Response) => {

    try {
        const { password, id_usuario } = req.body
        const usuario = new Usuario(req.body)

        // Prevenir Usuarios Duplicados
        const userExists = await Usuario.findByPk(id_usuario)
        if (userExists) {
            const error = new Error ('El usuario ya esta registrado')
            return res.status(409).json({ message: error.message })
        }
        
        // Hash Password
        usuario.password = await hashpassword(password)
        await usuario.save()

        res.status(200).json({ message: "Cuenta creada existosamente" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { id_usuario, password } = req.body

        const user = await Usuario.findByPk(id_usuario)

        const isPasswordCorrect = await checkpassword(password, user.password)

        if (!isPasswordCorrect) {
            const error = new Error ('Password Incorrecto')
            return res.status(401).json({ message: error.message })
        }

        const token = generateJWT({
            id_usuario: user.id_usuario,
            tipo_usuario: user.tipo_usuario 
        })

        console.log(token)

        res.status(200).json(token);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error' })
    }
}