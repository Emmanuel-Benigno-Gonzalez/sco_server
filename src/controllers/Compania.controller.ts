import { Request, Response } from 'express'
import Compania from '../models/Compania.model'

export const getCompania = async (req: Request, res: Response) => {

    try {
        const compania = await Compania.findAll()
        res.json({ data: compania })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los datos' })
    }

}

export const createCompania = async (req: Request, res: Response) => {

    try {
        const compania = await Compania.create(req.body)
        res.json({ data: compania })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al crear la compañía' })
    }
}