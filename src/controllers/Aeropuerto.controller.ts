import { Request, Response } from 'express'
import Aeropuerto from '../models/Aeropuerto.model'

export const getAeropuerto = async (req: Request, res: Response) => {

    try {
        const aeropuerto = await Aeropuerto.findAll()
        res.json({ data: aeropuerto })
    } catch (error) {
        console.log(error)
    }

}

export const createAeropuerto = async (req: Request, res: Response) => {

    try {
        const aeropuerto = await Aeropuerto.create(req.body)
        res.json({ data: aeropuerto })
    } catch (error) {
        console.log(error)
    }
}