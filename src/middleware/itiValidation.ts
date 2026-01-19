import { RequestHandler } from 'express';
import { body } from 'express-validator';
import ItinerarioComercial from '../models/Itinerario.model';

export const validateTipoMovIti: RequestHandler = async (res, req, next) => {
  try {
    
    const operacion = await ItinerarioComercial.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })

  } catch (error) {
    
  }
}

export const itinerarioValidators = [
  body('tipo_mov')
    .notEmpty().withMessage("El campo tipo de movimiento es obligatorio")
    .isIn(['LL', 'S']).withMessage("El tipo de movimiento solo puede ser 'LL' (Llegada) o 'S' (Salida)"),
  body('iata_aeropuerto').notEmpty().withMessage("El campo aeropuerto es obligatorio"),
  body('fecha_iti').notEmpty().withMessage("El campo fecha/hora de itinerario es obligatorio"),
  body('id_compania').notEmpty().withMessage("El campo aerolínea/FBO es obligatorio"),
  body('tipo_plataforma')
    .notEmpty().withMessage("El campo plataforma es obligatorio")
    .isIn(['RN', 'TA']).withMessage("El tipo de plataforma solo permite 'RN' o 'TA'"),
  body('vuelo').notEmpty().withMessage("El campo vuelo es obligatorio"),
  body('puerta').notEmpty().withMessage("El campo puerta es obligatorio"),
  body('banda').notEmpty().withMessage("El campo banda es obligatorio"),
  body('posicion').notEmpty().withMessage("El campo posicion es obligatorio"),
];