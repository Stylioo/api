import express from "express"
import { getAllServices, getServiceById, createService, deleteService, updateService } from "../controllers/services"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('service router is alive and healthy');
})


router.get('/', getAllServices)
router.post('/', createService)
router.get('/:id', getServiceById)
router.delete('/:id', deleteService)
router.patch('/:id', updateService)


export default router