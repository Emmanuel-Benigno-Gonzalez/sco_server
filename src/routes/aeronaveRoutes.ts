import { Router } from 'express'
import { createAeronave, getAeronave, getAeronaveById } from '../controllers/Aeronave.controller'
import { authenticate } from '../middleware/authValidation'

const router = Router()

router.get('/', getAeronave)

router.get('/:id_aeronave',     
    getAeronaveById
)

router.post('/', 
    authenticate,
    createAeronave)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router