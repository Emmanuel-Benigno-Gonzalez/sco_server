import { Router } from 'express'
import { createOperacion, getOperacion, updateOperacionById } from '../controllers/Operacion.controller'
import { handleInputErrors, validateEntityExists } from '../middleware/indexValidation'
import { body } from 'express-validator'
import { authenticate } from '../middleware/authValidation'
import { validateTipoMov } from '../middleware/opsValidation'
import Matricula from '../models/Matricula.model'
import Aeropuerto from '../models/Aeropuerto.model'
import Compania from '../models/Compania.model'
import Calificador from '../models/Calificador.model'

const router = Router()

router.get('/', getOperacion)

router.post('/',
    body('id_matricula')
    .notEmpty().withMessage("El campo matricula es obligatorio"),
    body('fecha_iniOps')
    .notEmpty().withMessage("El campo fecha de inicio de operacion es obligatorio"),
    body('iata_aeropuerto')
    .notEmpty().withMessage("El campo aeropuerto es obligatorio"),
    body('tipo_mov')
    .notEmpty().withMessage("El campo tipo de movimiento es obligatorio"),
    body('hora_iti')
    .notEmpty().withMessage("El campo hora de itinerario es obligatorio"),
    body('hora_real')
    .notEmpty().withMessage("El campo hora real es obligatorio"),
    body('id_compania')
    .notEmpty().withMessage("El campo aerolinea/fbo es obligatorio"),
    body('vuelo')
    .notEmpty().withMessage("El campo vuelo es obligatorio"),
    body('pista')
    .notEmpty().withMessage("El campo pista es obligatorio"),
    body('id_calificador')
    .notEmpty().withMessage("El campo calificador es obligatorio"),
    authenticate,
    handleInputErrors,
    validateEntityExists(Matricula, 'id_matricula', 'Matrícula'),
    validateEntityExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),
    validateEntityExists(Compania, 'id_compania', 'Aerolinea/FBO'),
    validateEntityExists(Calificador, 'id_calificador', 'Calificador'),
    validateTipoMov,
    createOperacion
)

router.put('/:id_ops', 

)

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router