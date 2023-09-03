import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { generateResponse } from '../utils'

import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllServices = async (req: Request, res: Response) => {
    try {
        // find all service sort decesding order buy updatedTime

        const services = await prisma.service.findMany({
            orderBy: {
                updated_at: 'desc'
            }
        })
        res.json(generateResponse(true, services))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const getServiceById = async (req: Request, res: Response) => {
    try {
        const service = await prisma.service.findUnique({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, service))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const createService = async (req: Request, res: Response) => {

    try {
        const service = await prisma.service.create({
            data: {
                id: uuidv4(),
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                duration: req.body.duration,
                status: req.body.status,
            }
        })
        res.json(generateResponse(true, service))
    }
    catch (err) {
        console.log(err);
        res.json(generateResponse(false, null, err))
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        const updatedService = await prisma.service.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                duration: req.body.duration,
                status: req.body.status,
            }
        })
        res.json(generateResponse(true, updatedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const deletedService = await prisma.service.delete({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, deletedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try {
        const deletedService = await prisma.service.deleteMany()
        res.json(generateResponse(true, deletedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

