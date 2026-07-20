import { Router } from 'express'
import { createAeropuerto, getAeropuerto, getAeropuertoById } from '../controllers/Aeropuerto.controller'
import { authenticate } from '../middleware/authValidation'
import Aeropuerto from '../models/Aeropuerto.model'
import { validateEntityExists, validateEntityNotExists } from '../middleware/indexValidation'

const router = Router()

router.get('/',
    authenticate,
    getAeropuerto
)

router.get('/:iata_aeropuerto',
    authenticate,
    validateEntityExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),
    getAeropuertoById
)

router.post('/',
    authenticate,
    validateEntityNotExists(Aeropuerto, 'iata_aeropuerto', 'Aeropuerto'),    
    createAeropuerto
)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router