import { Router } from 'express'
import { createMatricula, getMatricula, getMatriculaById } from '../controllers/Matricula.controller'
import { authenticate } from '../middleware/authValidation'
import Matricula from '../models/Matricula.model'
import { validateEntityExists, validateEntityNotExists } from '../middleware/indexValidation'
import Aeronave from '../models/Aeronave.model'
import Calificador from '../models/Calificador.model'
import Compania from '../models/Compania.model'

const router = Router()

router.get('/', 
    authenticate,
    getMatricula)

router.get('/:id_matricula',
    authenticate,
    validateEntityExists(Matricula, 'id_matricula', 'Matrícula'), 
    getMatriculaById
)

router.post('/', 
    validateEntityNotExists(Matricula, 'id_matricula', 'Matrícula'),
    validateEntityExists(Aeronave, 'icao_aeronave', 'Aeronave'),
    validateEntityExists(Calificador, 'id_calificador', 'Calificador'),
    validateEntityExists(Compania, 'id_compania', 'Compania'),
    createMatricula
)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router