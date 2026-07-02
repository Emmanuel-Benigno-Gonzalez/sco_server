import { Router } from 'express'
import { createAeropuerto } from '../controllers/Aeropuerto.controller'
import { authenticate } from '../middleware/authValidation'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/',
    authenticate,    
    createAeropuerto
)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router