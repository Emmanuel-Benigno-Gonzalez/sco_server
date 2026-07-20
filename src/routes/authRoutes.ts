import { Router, Request, Response } from 'express'
import { createAccount, login, passwordTemporal } from '../controllers/Auth.controller'
import { authValidators } from '../middleware/authValidation'
import { handleInputErrors, validateEntityExists } from '../middleware/indexValidation'
import Usuario from '../models/Usuario.model'

const router = Router()

router.post('/prueba', (req: Request, res: Response) => {
  res.json({ status: req.body.id_usuario });
});

router.post('/login',
    validateEntityExists(Usuario, 'id_usuario', 'Usuario'),
    login
)

router.post('/create', 
    authValidators,
    handleInputErrors,
    createAccount
)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})


router.patch('/passwordTemporal', 
    passwordTemporal
)

router.patch('/cambioPassword', (req, res)  => {
    res.json('Desde PATCH')
})

export default router