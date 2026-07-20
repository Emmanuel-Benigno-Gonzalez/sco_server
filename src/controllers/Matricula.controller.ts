import { Request, Response } from 'express'
import Matricula from '../models/Matricula.model'

export const getMatricula = async (req: Request, res: Response) => {

    try {
        const matricula = await Matricula.findAll()
        res.json({ data: matricula })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los datos' })
    }

}

export const getMatriculaById = async (req: Request, res: Response) => {

    try {
        const { id_matricula } = req.params;

        const matricula = await Matricula.findByPk(id_matricula, {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        res.json({ data: matricula })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener la matricula' })
    }

}

export const createMatricula = async (req: Request, res: Response) => {

    try {
        const matricula = await Matricula.create(req.body)
        res.json({ data: matricula })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al registrar la Matricula' })
    }
}