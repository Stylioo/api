import express from "express"
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/customers"

const router = express.Router()

router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

export default router