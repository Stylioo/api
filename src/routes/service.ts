import express from "express"
import { getAllServices, getServiceById, createService, deleteService, updateService, searchService, searchServicesByCategory } from "../controllers/services"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('service router is alive and healthy');
})


router.get('/fetch', getAllServices)
router.post('/', createService)
// router.post('/search', searchService)
// router.post('/search/category', searchServicesByCategory)
router.get('/search', searchService)
router.get('/:id', getServiceById)
router.delete('/:id', deleteService)
router.patch('/:id', updateService)


export default router