import { Request, Response } from 'express'
import Aeropuerto from '../models/Aeropuerto.model'

export const getAeropuerto = async (req: Request, res: Response) => {

    try {
        const aeropuerto = await Aeropuerto.findAll()
        res.json({ data: aeropuerto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los datos' })
    }

}

export const getAeropuertoById = async (req: Request, res: Response) => {

    try {
        const { iata_aeropuerto } = req.params;

        const aeropuerto = await Aeropuerto.findByPk(iata_aeropuerto, {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        res.json({ data: aeropuerto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener el aeropuerto' })
    }

}

export const createAeropuerto = async (req: Request, res: Response) => {

    try {
        const aeropuerto = await Aeropuerto.create(req.body)
        res.json({ data: aeropuerto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al registrar el Aeropuerto' })
    }
}