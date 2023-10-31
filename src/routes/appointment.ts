import express from "express"
import { getAllAppointment, createAppointment, DeleteAppoitnment, updateAppoitnment, searchAppointment, updateStatus, getAppointmentDateAndTimeByBeautician } from "../controllers/appointment"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('appointment router is alive and healthy');
})


router.get('/', getAllAppointment)
router.post('/', createAppointment)
router.get('/search', searchAppointment)
router.patch('/status/:id', updateStatus)
router.get('/dateAndTime/:id', getAppointmentDateAndTimeByBeautician)
router.delete('/:id', DeleteAppoitnment)
router.patch('/:id', updateAppoitnment)


export default router