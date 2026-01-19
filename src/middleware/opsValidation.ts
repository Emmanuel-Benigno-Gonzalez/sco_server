import { RequestHandler, RequestParamHandler } from 'express';
import Operacion from '../models/Operacion.model';
import { Op, WhereOptions } from 'sequelize';
import { body } from 'express-validator';

/**
 * Validación de que no se pueden registrar dos movimientos iguales seguidos
 */
export const validateTipoMov: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, fecha_iniOps, tipo_mov } = req.body;
    const { id_ops } = req.params; // <- ID del registro en caso de update

    const whereClause: WhereOptions<Operacion> = { id_matricula };

    if (id_ops) {
      // Excluir el registro actual si es un update
      whereClause.id_ops = { [Op.ne]: id_ops };
    }

    const ultimoRegistro = await Operacion.findOne({
      where: whereClause,
      order: [['fecha_iniOps', 'DESC']],
    });

    if (ultimoRegistro && ultimoRegistro.tipo_mov === tipo_mov) {
      return res.status(400).json({
        message: `No puede registrarse un movimiento '${tipo_mov}' seguido de otro igual para la matrícula ${id_matricula}`,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando el tipo de movimiento' });
  }
};

/**
 * Validación Tiempo Minimo despues del ultimo movimiento de cada matricula
 * para los calificadores RP, FP, RC, FC
 * Evitar que registros nuevos sean mas viejo que los ya registrados
 */
export const validateTiempoMinimo: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, fecha_iniOps} = req.body;
    
    const whereClause: WhereOptions<Operacion> = { id_matricula };
    
    const ultimoRegistro = await Operacion.findOne({
      where: whereClause,
      order: [['fecha_iniOps', 'DESC']],
    });

    if (ultimoRegistro) {
      const ultimaFechaHora = new Date(ultimoRegistro.fecha_iniOps);
      const nuevaFechaHora = new Date(fecha_iniOps);
      
      // Calcular la fecha mínima permitida (20 minutos después del último movimiento)
      const fechaMinimaPermitida = new Date(ultimaFechaHora);
      fechaMinimaPermitida.setMinutes(fechaMinimaPermitida.getMinutes() + 20);

      if (nuevaFechaHora <= fechaMinimaPermitida) {
        //const minutosRestantes = Math.ceil((fechaMinimaPermitida.getTime() - nuevaFechaHora.getTime()) / (1000 * 60));
        const diferenciaMs = fechaMinimaPermitida.getTime() - nuevaFechaHora.getTime();
        const minutosRestantes = Math.floor(diferenciaMs / (1000 * 60) + 1);
        
        return res.status(400).json({
          message: `La fecha y hora de inicio deben ser al menos 20 minutos después del último movimiento. ` +
                   `Tiempo requerido: ${minutosRestantes} minutos más tarde.`
        });
      }
    }
    next();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando el middleware tipo de minimo' });
  }
};

/**
 * Validación de que no se puede registrar una salida sin llegada previa
 * para los calificadores RP, FP, RC, FC
 */
export const validateLlegadaConSalida: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_mov, id_calificador } = req.body;

    const calificadoresRestringidos = ['RP', 'FP', 'RC', 'FC'];

    if (tipo_mov === 'S' && calificadoresRestringidos.includes(id_calificador)) {
      // Buscar si existe alguna llegada previa para la misma matrícula
      const llegadaPrevia = await Operacion.findOne({
        where: {
          id_matricula,
          tipo_mov: 'LL',
        },
      });

      if (!llegadaPrevia) {
        return res.status(400).json({
          message: `No se puede registrar una salida para la matrícula ${id_matricula} sin una llegada previa`,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
};


/**
 * Validación de que no se puede registrar una salida sin haber actualizado fecha_calzos
 * para los calificadores RP, FP, RC, FC
 */
/*export const validateHoraCalzos: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_mov, id_calificador } = req.body;

    const calificadoresRestringidos = ['RP', 'FP', 'RC', 'FC'];

    if (tipo_mov === 'S' && calificadoresRestringidos.includes(id_calificador)) {
      // Buscar si existe alguna llegada previa para la misma matrícula
      const calzosActualizado = await Operacion.findOne({
        where: {
          id_matricula,
          tipo_mov: 'LL',
        },
      });

      if (calzosActualizado.token_calzos === 0) {
        return res.status(400).json({
          message: `No se puede registrar una salida para la matrícula ${id_matricula} sin actualizar la fecha de calzos`,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
};
*/

/**
 * Validación de que no se puede registrar una salida sin haber actualizado fecha_finOps
 * para los calificadores RP, FP, RC, FC
 */
/*export const validateHoraFinOps: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_mov, id_calificador } = req.body;

    const calificadoresRestringidos = ['RP', 'FP', 'RC', 'FC'];

    if (tipo_mov === 'S' && calificadoresRestringidos.includes(id_calificador)) {
      // Buscar si existe alguna llegada previa para la misma matrícula
      const finOpsActualizado = await Operacion.findOne({
        where: {
          id_matricula,
          //tipo_mov: 'LL',
        },
      });

      //if (finOpsActualizado.token_finOps === 0) {
      if (finOpsActualizado.tipo_mov === "LL") {
        return res.status(400).json({
          message: `No se puede registrar una salida para la matrícula ${id_matricula} sin actualizar la fecha de Fin de Operacion`,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
};*/

/**
 * Validacion Tipo de Plataforma
 * Metrica para rellenar Hora de Fin de Operacion respecto al tipo de plataforma
 * Antes de Registrar una Salida en la DB
 */
export const validateSalidaPernocta: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_plataforma, tipo_mov } = req.body;

    if (tipo_plataforma === "RN" && tipo_mov === "S") {
      const whereClause: WhereOptions<Operacion> = { id_matricula };
      
      const ultimoRegistro = await Operacion.findOne({
        where: whereClause,
        order: [['fecha_iniOps', 'DESC']],
      });

      if (ultimoRegistro.token_finOps === 0 ) {
        return res.status(400).json({
          message: `No se puede registrar el movimiento de ${tipo_mov} para la matrícula ${id_matricula} sin actualizar la Fecha de Fin de Operación de su ultimo movimiento de ${ultimoRegistro.tipo_mov}`,
        });
      }

    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
}

/** 
 * Validacion Actualizar la Fecha Fin Ops TA
 * Asignar el valor de fecha Ini Ops de la salida a la Fecha Fin Ops de la Llegada
*/

export const validateLlegadaTA: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_plataforma, fecha_iniOps, tipo_mov } = req.body;

    if (tipo_plataforma === "TA" && tipo_mov === "S") {
      const whereClause: WhereOptions<Operacion> = { id_matricula };
      
      const llegadaRegistro = await Operacion.findOne({
        where: whereClause,
        order: [['fecha_iniOps', 'DESC']],
      });

      if (!llegadaRegistro) {
        return res.status(404).json({
          message: `No se puede actualizar la fecha Fin Ops para la matrícula ${id_matricula}`,
        });
      }

      llegadaRegistro.fecha_finOps = fecha_iniOps
      llegadaRegistro.token_finOps = 1

      await llegadaRegistro.save();

    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
}

/** 
 * Validacion Fecha Fin Ops mayor a Fecha Ini Ops 
 * Validacion para Actualizar
*/
export const validateFechaFinOps: RequestHandler = async (req, res, next) => {
  try {

    const { fecha_finOps } = req.body;
    const { id_ops } = req.params;

    const whereClause: WhereOptions<Operacion> = { id_ops };
      
    const registro = await Operacion.findOne({
      where: whereClause,
    });

    const fechaFin = new Date(fecha_finOps);
    const fechaInicio = new Date(registro.fecha_iniOps);

    if (fechaInicio >= fechaFin ) {
      return res.status(404).json({
        message: `La Fecha de Fin Ops debe ser mayor a la Fecha de Ini Ops`,
      });
    }

    next();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando Fecha Fin Ops' });
  }
}

/**  
 * Validacion: Validar Fecha Fin Ops en Salida
 * La fecha Fin Ops debe estar actualoizada en el ultimo movimiento de salida
*/
export const validateTokenFechaFinOps: RequestHandler = async (req, res, next) => {
  try {
    const { id_matricula, tipo_mov } = req.body;

    // Solo valida para LL
    if (tipo_mov !== "LL") {
      return next();
    }

    const ultimoRegistro = await Operacion.findOne({
      where: { id_matricula },
      order: [['fecha_iniOps', 'DESC']],
    });

    // 🟢 Caso matrícula nueva (sin registros)
    if (!ultimoRegistro) {
      return next();
    }

    // 🔴 Caso existe registro previo sin cierre
    if (ultimoRegistro.token_finOps === 0) {
      return res.status(400).json({
        message: `No se puede registrar el movimiento de ${tipo_mov} para la matrícula ${id_matricula} sin actualizar la Fecha de Fin de Operación de su último movimiento (${ultimoRegistro.tipo_mov}).`,
      });
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando TokenFechaFinOps' });
  }
}


export const validateCalficadorComercial: RequestHandler = async (req, res, next) => {
  try {
    
    const { id_calificador } = req.body;

    const calificadoresRestringidos = ['RP', 'FP', 'RC', 'FC'];

    if (!calificadoresRestringidos.includes(id_calificador)) {
      return res.status(400).json({
          message: `Calificador Invalido [Regular, Fletamento]`,
      });
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando calificador comercial [Regular, Fletamento]' });
  }
}

export const validateCicloTipoMov: RequestHandler = async (req, res, next) => {
  try {
    
    const { tipo_mov } = req.body;
  
    if (tipo_mov == "S") {
      const { id_iti } = req.params;
      console.log("Id Iti: ",id_iti)
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error validando salida con llegada previa' });
  }
}



export const operacionValidators = [
  body('id_matricula').notEmpty().withMessage("El campo matrícula es obligatorio"),
  body('fecha_iniOps').notEmpty().withMessage("El campo fecha/hora de inicio es obligatorio"),
  body('iata_aeropuerto').notEmpty().withMessage("El campo aeropuerto es obligatorio"),
  body('tipo_mov')
    .notEmpty().withMessage("El campo tipo de movimiento es obligatorio")
    .isIn(['LL', 'S']).withMessage("El tipo de movimiento solo puede ser 'LL' (Llegada) o 'S' (Salida)"),
  body('fecha_iti').notEmpty().withMessage("El campo fecha/hora de itinerario es obligatorio"),
  body('id_compania').notEmpty().withMessage("El campo aerolínea/FBO es obligatorio"),
  body('vuelo').notEmpty().withMessage("El campo vuelo es obligatorio"),
  body('pista').notEmpty().withMessage("El campo pista es obligatorio"),
  body('id_calificador').notEmpty().withMessage("El campo calificador es obligatorio")
];

export const ValidatorsFechaFinOps = [
  body('fecha_finOps').notEmpty().withMessage("El campo Fecha Fin OPS es obligatorio"),
  body('token_finOps').notEmpty().withMessage("El token Fin Ops es obligatorio"),
];
