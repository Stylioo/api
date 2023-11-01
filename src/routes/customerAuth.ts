import express from 'express'
import { signin, signup } from '../controllers/customerAuth';

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('auth route is alive and healthy');
})

router.post('/signup', signup)
router.post('/signin', signin)

export default router