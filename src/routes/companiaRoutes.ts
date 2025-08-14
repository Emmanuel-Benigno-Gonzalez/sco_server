import { Router } from 'express'
import { createCompania } from '../controllers/Compania.controller'

const router = Router()

router.get('/', (req, res)  => {
    res.json('Desde GET')
})

router.post('/create', createCompania)

router.put('/', (req, res)  => {
    res.json('Desde PUT')
})

router.patch('/', (req, res)  => {
    res.json('Desde PATCH')
})

export default router