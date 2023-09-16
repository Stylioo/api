import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { generateResponse } from '../utils'

import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllAppointment = async (req: Request, res: Response) => {
    try {
        // find all service sort decesding order buy updatedTime

        const appointments = await prisma.appointment.findMany({
            orderBy: {
                date: 'desc'
            }
        })
        res.json(generateResponse(true, appointments))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const GetAppoitmentById = async (req: Request, res: Response) => {
    // try {
    //     const service = await prisma.appointment.findUnique({
    //         where: { id: req.params.id }
    //     })
    //     res.json(generateResponse(true, service))
    // }
    // catch (err) {
    //     res.json(generateResponse(false, null, err))
    // }
}

export const createAppointment = async (req: Request, res: Response) => {
    const servicesId = req.body.services.map((service: any) => service.uid)
    try {
        const dbData = {
            date: req.body.date,
            status: "pending",
            customer_id: req.body.customer.uid,
            customer: req.body.customer.first_name,
            beautician_id: req.body.beautician.uid,
            beautician: req.body.beautician.first_name,
            start_time: req.body.startTime,
            total_price: req.body.totalPrice,
            services: req.body.services[0].name
        }

        const appointment = await prisma.appointment.create({
            data: dbData
        })

        res.json(generateResponse(true, appointment))
    }
    catch (err) {
        console.log(err);

        res.json(generateResponse(false, null, err))
    }
}

export const updateAppoitnment = async (req: Request, res: Response) => {
    // try {
    //     const updatedService = await prisma.appointment.update({
    //         where: { id: req.params.id },
    //         data: {
    //             name: req.body.name,
    //             description: req.body.description,
    //             price: req.body.price,
    //             duration: req.body.duration,
    //             status: req.body.status,
    //         }
    //     })
    //     res.json(generateResponse(true, updatedService))
    // }
    // catch (err) {
    //     res.json(generateResponse(false, null, err))
    // }
}

export const DeleteAppoitnment = async (req: Request, res: Response) => {
    try {
        const deletedService = await prisma.appointment.delete({
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
        const deletedService = await prisma.appointment.deleteMany()
        res.json(generateResponse(true, deletedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

