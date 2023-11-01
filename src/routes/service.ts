import express from "express"
import { getAllServices, getServiceById, createService, deleteService, updateService, searchService, searchServicesByCategory, searchServiceByManager, fetchAllServices } from "../controllers/services"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('service router is alive and healthy');
})


router.get('/', getAllServices)
router.post('/', createService)
router.get('/fetch', fetchAllServices)
router.post('/search', searchService)
router.post('/search/category', searchServicesByCategory)
router.get('/searchServiceByManager', searchServiceByManager)
router.get('/:id', getServiceById)
router.delete('/:id', deleteService)
router.patch('/:id', updateService)


export default router