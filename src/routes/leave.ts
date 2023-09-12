import express from "express"
import { getAllLeaves } from "../controllers/leave"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('leave route is alive and healthy');
})

router.get('/', getAllLeaves)


export default router