import express from "express"
import { getAllProducts, getProductById, searchProducts, createProduct } from "../controllers/product"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('product route is alive and healthy');
})

router.get('/', getAllProducts)
router.get('/search', searchProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)


export default router