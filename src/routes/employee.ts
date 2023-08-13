import express from "express"
import { fetchAllEmployees, findEmployeeById, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('employee route is alive and healthy');
})


router.get('/', fetchAllEmployees)
router.post('/', createEmployee)
router.get('/:id', findEmployeeById)
router.delete('/:id', deleteEmployee)
router.patch('/:id', updateEmployee)

export default router