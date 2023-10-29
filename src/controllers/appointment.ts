import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { generateResponse } from '../utils'

import { v4 as uuidv4 } from 'uuid'
import moment from "moment"


const getSelector = (range: string) => {
    if (range === 'today') {
        return {
            gte: moment().startOf('day').toDate(),
            lt: moment().endOf('day').toDate()
        }
    }
    else if (range === 'upcomming') {
        return {
            gt: moment().startOf('day').toDate(),
        }
    }
    else if (range === 'past') {
        return {
            lt: moment().startOf('day').toDate(),
        }
    }
    else {
        return {}
    }
}

const prisma = new PrismaClient()

export const getAllAppointment = async (req: Request, res: Response) => {
    try {
        // find all service sort decesding order buy updatedTime
        const range = req.query.range as string || ""
        const appointments = await prisma.appointment.findMany({
            orderBy: {
                appointment_date: 'desc'
            },
            where: {
                appointment_date: getSelector(range)
            },
            include: {
                customer: {
                    select: {
                        first_name: true,
                        last_name: true,
                        contact_no: true,
                        address_line_1: true,
                        address_line_2: true,
                        city: true,
                    }
                },
                beautician: {
                    select: {
                        first_name: true,
                        last_name: true,
                        image: true,
                    }
                },
                service: true

            }

        })
        res.json(generateResponse(true, appointments))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const searchAppointment = async (req: Request, res: Response) => {
    try {
        const term = req.query.term as string || ""
        const range = req.query.range as string || ""

        const appointment = await prisma.appointment.findMany({
            where: {
                AND: [
                    {
                        appointment_date: getSelector(range)
                    },
                    {
                        OR: [
                            {
                                customer: {
                                    first_name: {
                                        contains: term,
                                    }
                                }
                            },
                            {
                                customer: {
                                    last_name: {
                                        contains: term,
                                    }
                                }
                            },
                            {
                                customer: {
                                    contact_no: {
                                        contains: term,
                                    }
                                }
                            },
                            {
                                beautician: {
                                    first_name: {
                                        contains: term,
                                    }
                                }
                            },
                            {
                                beautician: {
                                    last_name: {
                                        contains: term,
                                    }
                                }
                            },

                        ]
                    }
                ]
            },
            orderBy: {
                appointment_date: 'desc'
            },
            include: {
                customer: {
                    select: {
                        first_name: true,
                        last_name: true,
                        contact_no: true,
                        address_line_1: true,
                        address_line_2: true,
                        city: true,
                    }
                },
                beautician: {
                    select: {
                        first_name: true,
                        last_name: true,
                        image: true,
                    }
                },
                service: true

            }
        })
        res.json(generateResponse(true, appointment))


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
    try {
        const appointment = await prisma.appointment.create({
            data: {
                appointment_date: new Date(req.body.date),
                status: "pending",
                total_price: req.body.total,
                advanced_payment_amount: req.body.advanced_payment_amount,
                start_time: req.body.startTime,
                duration: req.body.duration,
                service: {
                    connect: req.body.services.map((service: any) => ({ id: service }))
                },
                customer: {
                    connect: { id: req.body.customer_id }
                },
                beautician: {
                    connect: { id: req.body.beautician_id }
                }
            }
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

