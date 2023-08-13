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

export const findCustomerById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.customer.findUnique({
            where: { uid: req.params.id }
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
                uid: uuidv4(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                contact_no: req.body.contact_no,
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
            where: { uid: req.params.id },
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
            where: { uid: req.params.id }
        })
        res.json(generateResponse(true, deletedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}
