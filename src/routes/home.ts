import express from "express"
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/health', (req, res) => {
    res.status(200).json('home router is alive and healthy');
})


router.get('/', async (req, res) => {
    res.send('home');
})


export default router