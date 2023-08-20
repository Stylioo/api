import express from "express"
import { protect } from "../middleware/verifyJWT"
import { fetchAllEmployees, findEmployeeById, createEmployee, updateEmployee, deleteEmployee, fetchEmployeesByRole } from "../controllers/employee"


const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('employee route is alive and healthy');
})

router.use(protect)

router.get('/', fetchAllEmployees)
router.post('/', createEmployee)
// router.get('/:id', findEmployeeById)
router.delete('/:id', deleteEmployee)
router.patch('/:id', updateEmployee)

router.get('/:role', fetchEmployeesByRole)



export default router