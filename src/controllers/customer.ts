import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { generateResponse } from '../utils'

const prisma = new PrismaClient()

export const fetchAllCustomers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.customer.findMany()
        res.json(generateResponse(true, users))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}


export const searchCustomer = async (req: Request, res: Response) => {

    try {
        if (req.body.q === undefined) {
            res.json(generateResponse(false, null, 'Search query is required'))
        }
        else {
            const searchQuery = req.body.q.toString()

            const customers = await prisma.customer.findMany({
                where: {
                    OR: [
                        {
                            first_name: {
                                contains: searchQuery,
                                // mode: 'insensitive'
                            }
                        },
                        {
                            last_name: {
                                contains: searchQuery,
                                // mode: 'insensitive'
                            }
                        },
                        {
                            contact_no: {
                                contains: searchQuery,
                                // mode: 'insensitive'
                            }
                        }
                    ]
                },
                orderBy: {
                    first_name: 'asc'
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    contact_no: true,
                    address_line_1: true,
                    address_line_2: true,
                    city: true,
                }
            }


            )
            res.json(generateResponse(true, customers))
        }

    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const findCustomerById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.customer.findUnique({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, user))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const createCustomer = async (req: Request, res: Response) => {
    try {

        const user = await prisma.customer.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: uuidv4() + '@stylioo.com',
                password: "Pass1234#",
                contact_no: req.body.contact_no,
                address_line_1: req.body.address_line_1,
                address_line_2: req.body.address_line_2,
            }
        })
        res.json(generateResponse(true, user))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const updatedUser = await prisma.customer.update({
            where: { id: req.params.id },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                contact_no: req.body.contact_no,
            }
        })
        res.json(generateResponse(true, updatedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const deletedUser = await prisma.customer.delete({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, deletedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}
