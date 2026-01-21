import { Router } from 'express'
import { createOperacion, deleteOperacion, getLlegadasPendientes, getOperacion, getOperacionById, getOperacionTokenL, getOpsByDate, getSalidasPendientes, postUltimaLlegada, updateOperacionById } from '../controllers/Operacion.controller'
import { handleInputErrors, validateEntityExists } from '../middleware/indexValidation'
import { authenticate } from '../middleware/authValidation'
import { operacionValidators, validateCalficadorComercial, validateCicloTipoMov, validateFechaFinOps, validateLlegadaConSalida, validateLlegadaTA, validateSalidaPernocta, validateTiempoMinimo, validateTipoMov, validateTokenFechaFinOps, ValidatorsFechaFinOps } from '../middleware/opsValidation'
import Matricula from '../models/Matricula.model'
import Aeropuerto from '../models/Aeropuerto.model'
import Compania from '../models/Compania.model'
import Calificador from '../models/Calificador.model'
import Operacion from '../models/Operacion.model'
import { createItinerario } from '../controllers/Itinerario.controller'
import { itinerarioValidators } from '../middleware/itiValidation'

const router = Router()

//router.get('/', getOperacion)
//router.get('/:id_ops', getOperacionById)
router.get('/1/llegadasPendientes', getLlegadasPendientes)
router.get('/salidasPendientes', getSalidasPendientes)
router.get('/', getOpsByDate)

router.post('/',
    operacionValidators,
    authenticate,
    handleInputErrors,
    validateEntityExists(Matricula, 'id_matricula', 'Matrícula'),
    validateEntityExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),
    validateEntityExists(Compania, 'id_compania', 'Aerolinea/FBO'),
    validateEntityExists(Calificador, 'id_calificador', 'Calificador'),
    validateTipoMov,
    validateTiempoMinimo,
    validateLlegadaConSalida,
    validateSalidaPernocta,
    validateLlegadaTA,
    validateTokenFechaFinOps,
    createOperacion
)

router.post('/itinerario', 
    itinerarioValidators,
    authenticate,
    handleInputErrors,
    validateEntityExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),
    validateEntityExists(Compania, 'id_compania', 'Aerolinea/FBO'),
    validateCicloTipoMov,
    createItinerario)

router.post('/ultimaLlegada',
    validateEntityExists(Matricula, 'id_matricula', 'Matrícula'),
    postUltimaLlegada
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

router.put('/fecha_finOps/:id_ops', 
    validateEntityExists(Operacion, 'id_ops', 'Operacion'),
    authenticate,
    ValidatorsFechaFinOps,
    handleInputErrors,
    validateFechaFinOps,
    updateOperacionById
)

router.delete('/:id_ops',
    validateEntityExists(Operacion, 'id_ops', 'Operacion'),
    handleInputErrors,
    deleteOperacion
)

export default router