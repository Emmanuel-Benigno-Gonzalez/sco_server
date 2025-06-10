import { request, Request, Response } from 'express'
import { Op } from 'sequelize';
import Operacion from '../models/Operacion.model'

export const getOperacion = async (req: Request, res: Response) => {

    try {
        const operacion = await Operacion.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.json({ data: operacion })
    } catch (error) {
        console.log(error)
    }

}

export const findOpsByDate = async (req: Request, res: Response) => {
    const { fecha_inicial, fecha_final } = req.query;

    try {
        if (!fecha_inicial || !fecha_final) {
            return res.status(400).json({
                error: 'Los parámetros "fecha_inicial" y "fecha_final" son obligatorios.'
            });
        }

        const operacion = await Operacion.findAll({
            where: {
                fecha_iniOps: {
                    [Op.between]: [
                        new Date(fecha_inicial as string),
                        new Date(fecha_final as string)
                    ]
                }
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({ data: operacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export const createOperacion = async (req: Request, res: Response) => {

    try {
        const operacion = await Operacion.create(req.body)
        res.json({ data: operacion })
    } catch (error) {
        console.log(error)
    }
}

export const updateOperacionById = async (req: Request, res: Response) => {

    try {
        const { id_ops } = req.params
        const operacion = await Operacion.findByPk(id_ops)

        if(!operacion){
            return res.status(404).json({
                error: 'Operacion no Encontrada'
            })
        }

        await operacion.update(req.body)
        await operacion.save()

        res.json({ data: operacion })

    } catch (error) {
        console.log(error)
    }
}