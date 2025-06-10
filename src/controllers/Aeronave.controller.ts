import { Request, Response } from 'express'
import Aeronave from '../models/Aeronave.model'

export const getAeronave = async (req: Request, res: Response) => {

    try {
        const aeronave = await Aeronave.findAll()
        res.json({ data: aeronave })
    } catch (error) {
        console.log(error)
    }

}

export const createAeronave = async (req: Request, res: Response) => {

    try {
        const aeronave = await Aeronave.create(req.body)
        res.json({ data: aeronave })
    } catch (error) {
        console.log(error)
    }
}