import express from "express"

import { signup, signin, refresh, signout } from "../controllers/auth"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('auth route is alive and healthy');
})


router.post('/signup', signup)
router.post('/signin', signin)
router.post('/refresh', refresh)
router.get('/signout', signout)

export default router