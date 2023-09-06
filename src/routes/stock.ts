import express from 'express'
import { getAllStock, createStock } from '../controllers/stock'


const router = express.Router()

router.get('/', getAllStock)
router.post('/', createStock)

export default router