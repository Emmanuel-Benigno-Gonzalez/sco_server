import { RequestHandler } from 'express';
import Operacion from '../models/Operacion.model';
import { Op } from 'sequelize';
import { body } from 'express-validator';
import { WhereOptions } from 'sequelize';

export const validateTipoMov: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, fecha_iniOps, tipo_mov, hora_real } = req.body;
    const { id_ops } = req.params; // <- ID del registro en caso de update

    const whereClause: WhereOptions<Operacion> = {
      id_matricula,
    };

    if (id_ops) {
      // Excluir el registro actual si es un update
      whereClause.id_ops = { [Op.ne]: id_ops };
    }

    const ultimoRegistro = await Operacion.findOne({
      where: whereClause,
      order: [['fecha_iniOps', 'DESC'], ['hora_real', 'DESC']],
    });

    if (ultimoRegistro && ultimoRegistro.tipo_mov === tipo_mov) {
      return res.status(400).json({
        message: `No puede registrarse un movimiento '${tipo_mov}' seguido de otro igual para la matrícula ${id_matricula}`,
      });
    }

    if (ultimoRegistro) {
      const ultimaFecha = new Date(ultimoRegistro.fecha_iniOps);
      const ultimaHora = ultimoRegistro.hora_real;
      const ultimaFechaHora = new Date(`${ultimaFecha.toISOString().split('T')[0]}T${ultimaHora}`);
      const nuevaFechaHora = new Date(`${fecha_iniOps}T${hora_real}`);

      if (nuevaFechaHora <= ultimaFechaHora) {
        return res.status(400).json({
          message: `La fecha y hora deben ser posteriores al último movimiento registrado para la matrícula ${id_matricula}`,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando el tipo de movimiento' });
  }
};


export const operacionValidators = [
  body('id_matricula').notEmpty().withMessage("El campo matrícula es obligatorio"),
  body('fecha_iniOps').notEmpty().withMessage("El campo fecha de inicio es obligatorio"),
  body('iata_aeropuerto').notEmpty().withMessage("El campo aeropuerto es obligatorio"),
  body('tipo_mov').notEmpty().withMessage("El campo tipo de movimiento es obligatorio"),
  body('hora_iti').notEmpty().withMessage("El campo hora de itinerario es obligatorio"),
  body('hora_real').notEmpty().withMessage("El campo hora real es obligatorio"),
  body('id_compania').notEmpty().withMessage("El campo aerolínea/FBO es obligatorio"),
  body('vuelo').notEmpty().withMessage("El campo vuelo es obligatorio"),
  body('pista').notEmpty().withMessage("El campo pista es obligatorio"),
  body('id_calificador').notEmpty().withMessage("El campo calificador es obligatorio")
];