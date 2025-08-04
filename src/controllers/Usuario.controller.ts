import { Request, Response } from 'express'
import Usuario from '../models/Usuario.model'

export const getUsuario = async (req: Request, res: Response) => {

    try {
        const usuario = await Usuario.findAll()
        res.json({ data: usuario })
    } catch (error) {
        console.log(error)
    }

}

export const createUsuario = async (req: Request, res: Response) => {

    try {
        const usuario = await Usuario.create(req.body)
        res.json({ data: usuario })
    } catch (error) {
        console.log(error)
    }
}