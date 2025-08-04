// middleware/addUserId.ts
import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // ⚠️ Esto es temporal, simula un usuario logueado
  req.body.id_usuario = 100; // Reemplaza con el ID de prueba que prefieras
  next();
};

/*
// middleware/addUserId.ts (versión futura con JWT)
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const addUserId = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'TU_SECRETO') as { id: number };
    req.body.id_usuario = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};*/

export const authValidators = [
  body('id_usuario').notEmpty().withMessage("El campo id es obligatorio"),
  //body('email').notEmpty().withMessage("El campo email es obligatorio"),
  body('nombre').notEmpty().withMessage("El campo nombre es obligatorio"),
  body('ap_paterno').notEmpty().withMessage("El campo apellido paterno es obligatorio"),
  body('ap_materno').notEmpty().withMessage("El campo apellido materno es obligatorio"),
  body('password').notEmpty().withMessage("El campo password es obligatorio"),
  body('tipo_usuario').notEmpty().withMessage("El campo el tipo de usuario es obligatorio"),
];

export const loginValidators = [
  body('id_usuario').notEmpty().withMessage("El campo id es obligatorio"),
  body('password').notEmpty().withMessage("El campo password es obligatorio")
];