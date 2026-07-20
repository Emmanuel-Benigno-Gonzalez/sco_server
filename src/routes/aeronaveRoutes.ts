import { Router } from 'express'
import { createAeronave, getAeronave, getAeronaveById } from '../controllers/Aeronave.controller'
import Aeronave from '../models/Aeronave.model'
import { validateEntityExists, validateEntityNotExists } from '../middleware/indexValidation'
import { authenticate } from '../middleware/authValidation'

const router = Router()

router.get('/', 
    //authenticate,
    getAeronave

)

router.get('/:icao_aeronave', 
    //authenticate,
    validateEntityExists(Aeronave, 'icao_aeronave', 'Aeronave'),
    getAeronaveById
)

router.post('/',
    //authenticate,
    validateEntityNotExists(Aeronave, 'icao_aeronave', 'Aeronave'),
    createAeronave
)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router