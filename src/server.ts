import express from 'express';
import bodyParser from 'body-parser';

import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
})

app.post('/', async (req, res) => {
    console.log(req.body)
    const user = await prisma.user.create({ data: req.body })
    res.json(user)
})

app.listen(5400, () => {
    console.log('Server is running on port 5400.');
})