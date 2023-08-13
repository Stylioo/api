import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { generateResponse } from '../utils'

import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany()
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
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                duration: req.body.duration,
                status: req.body.status,
            }
        })
        res.json(generateResponse(true, service))
    }
    catch (err) {
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

