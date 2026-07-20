import { Request, Response } from 'express'
import Calificador from '../models/Calificador.model'

export const getCalificador = async (req: Request, res: Response) => {

    try {
        const calificador = await Calificador.findAll()
        res.json({ data: calificador })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los datos' })
    }

}

export const createCalificador = async (req: Request, res: Response) => {

    try {
        const calificador = await Calificador.create(req.body)
        res.json({ data: calificador })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al crear el calificador' })
    }
}