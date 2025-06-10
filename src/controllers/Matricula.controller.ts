import { Request, Response } from 'express'
import Matricula from '../models/Matricula.model'

export const getMatricula = async (req: Request, res: Response) => {

    try {
        const matricula = await Matricula.findAll()
        res.json({ data: matricula })
    } catch (error) {
        console.log(error)
    }

}

export const createMatricula = async (req: Request, res: Response) => {

    try {
        const matricula = await Matricula.create(req.body)
        res.json({ data: matricula })
    } catch (error) {
        console.log(error)
    }
}