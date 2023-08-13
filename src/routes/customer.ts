import express from "express"
import { fetchAllCustomers, findCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer"
const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('customer route is alive and healthy');
})


router.get('/', fetchAllCustomers)
router.post('/', createCustomer)
router.get('/:id', findCustomerById)
router.delete('/:id', deleteCustomer)
router.patch('/:id', updateCustomer)

export default router