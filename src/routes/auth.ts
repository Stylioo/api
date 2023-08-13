import express from "express"

import { login, register, logout } from "../controllers/auth"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('auth route is alive and healthy');
})


router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)

export default router