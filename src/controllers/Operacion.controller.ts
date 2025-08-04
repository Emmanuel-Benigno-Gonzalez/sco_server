import { request, Request, Response } from 'express'
import { Op } from 'sequelize';
import Operacion from '../models/Operacion.model'
import { procesarOperaciones } from '../utils/opsHelper';

export const getOperacion = async (req: Request, res: Response) => {

    try {
        const operacion = await Operacion.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.json(operacion)
        //res.json({ data: operacion })
    } catch (error) {
        console.log(error)
    }

}

export const getOperacionById = async (req: Request, res: Response) => {

    try {
        const { id_ops } = req.params;

        const operacion = await Operacion.findByPk(id_ops, {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        res.json({ data: operacion })

    } catch (error) {
        console.log(error)
    }
    
}

export const getOpsByDate = async (req: Request, res: Response) => {
  const { fecha_inicial, fecha_final } = req.query;

  try {
    if (!fecha_inicial || !fecha_final) {
      return res.status(400).json({
        error: 'Los parámetros "fecha_inicial" y "fecha_final" son obligatorios.',
      });
    }

    const operaciones = await Operacion.findAll({
      where: {
        fecha_iniOps: {
          [Op.between]: [
            new Date(fecha_inicial as string),
            new Date(fecha_final as string),
          ],
        },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const operacionesProcesadas = procesarOperaciones(operaciones);

    res.json( operacionesProcesadas );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const createOperacion = async (req: Request, res: Response) => {

    try {
        const operacion = await Operacion.create(req.body)
        //res.json({ data: operacion })
        res.status(200).json({ message: "Registro creado exitosamente" });
    } catch (error) {
        console.log("Este es el error ",error)
        res.status(404).json({ message: error.message });
    }
}

export const updateOperacionById = async (req: Request, res: Response) => {
  try {
    const { id_ops } = req.params;

    await Operacion.update(req.body, {
      where: { id_ops }
    });

    res.json({ data: 'Operación Actualizada' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la operación' });
  }
};


export const deleteOperacion = async (req: Request, res: Response) => {

  try {
      const { id_ops } = req.params

      await Operacion.destroy({
        where: { id_ops }
      });

      res.json({ data: 'Operación Eliminada' })
    
  } catch (error) {
    console.log(error)
  }

}