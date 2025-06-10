import { Request, Response } from 'express'
import Calificador from '../models/Calificador.model'

export const getCalificador = async (req: Request, res: Response) => {

    try {
        const calificador = await Calificador.findAll()
        res.json({ data: calificador })
    } catch (error) {
        console.log(error)
    }

}

export const createCalificador = async (req: Request, res: Response) => {

    try {
        const calificador = await Calificador.create(req.body)
        res.json({ data: calificador })
    } catch (error) {
        console.log(error)
    }
}