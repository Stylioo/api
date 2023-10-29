import express from "express"
import { getAllAppointment, GetAppoitmentById, createAppointment, DeleteAppoitnment, updateAppoitnment, searchAppointment } from "../controllers/appointment"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('appointment router is alive and healthy');
})


router.get('/', getAllAppointment)
router.post('/', createAppointment)
router.get('/search/', searchAppointment)
router.get('/:id', GetAppoitmentById)
router.delete('/:id', DeleteAppoitnment)
router.patch('/:id', updateAppoitnment)


export default router