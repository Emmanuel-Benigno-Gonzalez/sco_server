import { Router } from 'express'
import { createMatricula, getMatricula } from '../controllers/Matricula.controller'

const router = Router()

router.get('/', getMatricula)

router.post('/', createMatricula)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router