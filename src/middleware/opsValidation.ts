import { RequestHandler } from 'express';
import Operacion from '../models/Operacion.model';

export const validateTipoMov: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, fecha_iniOps, tipo_mov, hora_real } = req.body;

    const ultimoRegistro = await Operacion.findOne({
      where: { id_matricula },
      order: [['fecha_iniOps', 'DESC'], ['hora_real', 'DESC']],
    });

    if (ultimoRegistro && ultimoRegistro.tipo_mov === tipo_mov) {
      res.status(400).json({
        error: `No puede registrarse un movimiento '${tipo_mov}' seguido de otro igual para la matrícula ${id_matricula}`,
      });
      return;
    }

    if (ultimoRegistro) {
      const ultimaFecha = new Date(ultimoRegistro.fecha_iniOps);
      const ultimaHora = ultimoRegistro.hora_real;

      const ultimaFechaHora = new Date(`${ultimaFecha.toISOString().split('T')[0]}T${ultimaHora}`);
      const nuevaFechaHora = new Date(`${fecha_iniOps}T${hora_real}`);

      if (nuevaFechaHora <= ultimaFechaHora) {
        res.status(400).json({
          error: `La fecha y hora deben ser posteriores al último movimiento registrado para la matrícula ${id_matricula}`,
        });
        return;
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando el tipo de movimiento' });
  }
};