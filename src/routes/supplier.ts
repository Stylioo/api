import express from 'express'
import { createSupplier, getAllSuppliers, getSupplierById } from '../controllers/supplier'

const router = express.Router()

router.get('/', getAllSuppliers)
router.get('/:id', getSupplierById)
router.post('/', createSupplier)

export default router