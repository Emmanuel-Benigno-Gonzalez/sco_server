import { Router } from 'express'
import { createAeronave } from '../controllers/Aeronave.controller'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/', createAeronave)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router