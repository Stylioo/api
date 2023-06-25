import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { generateResponse } from '../utils'

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany()
        res.json(generateResponse(true, users))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { uid: req.params.id }
        })
        res.json(generateResponse(true, user))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: {
                uid: uuidv4(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_type: req.body.user_type
            }
        })
        res.json(generateResponse(true, user))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { uid: req.params.id },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_type: req.body.user_type
            }
        })
        res.json(generateResponse(true, updatedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { uid: req.params.id }
        })
        res.json(generateResponse(true, deletedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}
