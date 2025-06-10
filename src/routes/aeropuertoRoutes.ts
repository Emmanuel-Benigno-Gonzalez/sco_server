import { Router } from 'express'
import { createAeropuerto } from '../controllers/Aeropuerto.controller'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/', createAeropuerto)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router