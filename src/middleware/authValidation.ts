// middleware/addUserId.ts
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // ⚠️ Esto es temporal, simula un usuario logueado
  req.body.id_usuario = 440; // Reemplaza con el ID de prueba que prefieras
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