import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import { Model, ModelStatic } from 'sequelize';

export const handleInputErrors: RequestHandler = ( req: Request, res: Response, next: NextFunction) => {
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return;
    }

    next()
}

export const validateEntityExists = (
  model: ModelStatic<Model<any, any>>,
  field: string,
  alias?: string
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const id = req.body[field];
      const record = await model.findByPk(id);

      if (!record) {
        res.status(400).json({ message: `${alias || field} no existe` });
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error validando ${alias || field}` });
    }
  };
};

