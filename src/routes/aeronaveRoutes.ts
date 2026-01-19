import { Router } from 'express'
import { createAeronave, getAeronave, getAeronaveById } from '../controllers/Aeronave.controller'

const router = Router()

router.get('/', getAeronave)

router.get('/:id_aeronave', getAeronaveById)

router.post('/', createAeronave)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router