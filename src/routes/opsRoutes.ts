import { Router } from 'express'
import { createOperacion, deleteOperacion, getOperacion, getOpsByDate, updateOperacionById } from '../controllers/Operacion.controller'
import { handleInputErrors, validateEntityExists } from '../middleware/indexValidation'
import { authenticate } from '../middleware/authValidation'
import { operacionValidators, validateTipoMov } from '../middleware/opsValidation'
import Matricula from '../models/Matricula.model'
import Aeropuerto from '../models/Aeropuerto.model'
import Compania from '../models/Compania.model'
import Calificador from '../models/Calificador.model'
import Operacion from '../models/Operacion.model'

const router = Router()

router.get('/', getOperacion)
//router.get('/', getOpsByDate)

router.post('/',
    operacionValidators,
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
    validateEntityExists(Operacion, 'id_ops', 'Operacion'),
    operacionValidators,
    authenticate,
    handleInputErrors,
    validateEntityExists(Matricula, 'id_matricula', 'Matrícula'),
    validateEntityExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),
    validateEntityExists(Compania, 'id_compania', 'Aerolinea/FBO'),
    validateEntityExists(Calificador, 'id_calificador', 'Calificador'),
    validateTipoMov,
    updateOperacionById
)

router.delete('/:id_ops',
    validateEntityExists(Operacion, 'id_ops', 'Operacion'),
    handleInputErrors,
    deleteOperacion
)

export default router