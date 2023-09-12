import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { generateResponse } from '../utils'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllLeaves = async (req: Request, res: Response) => {
    try {
        const forPage = req.query.forPage as string || await prisma.leaveRequest.count()
        const page = req.query.page as string || "0"

        const leaveRequest = await prisma.leaveRequest.findMany({
            skip: Number(forPage) * Number(page),
            take: Number(forPage),
            orderBy: {
                updated_at: 'desc'
            },
        })

        if (leaveRequest?.length > 0)
            res.status(200).json(generateResponse(true, leaveRequest))
        else
            res.status(404).json(generateResponse(false, null, 'No leave srequest found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}
