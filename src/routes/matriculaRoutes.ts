import { Router } from 'express'
import { createMatricula } from '../controllers/Matricula.controller'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/', createMatricula)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router