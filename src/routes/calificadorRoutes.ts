import { Router } from 'express'
import { createCalificador } from '../controllers/Calificador.controller'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/', createCalificador)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router