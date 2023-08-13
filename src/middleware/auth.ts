import { generateResponse } from "../utils"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { PrismaClient } from '@prisma/client'

const protect = async (req: Request, res: Response, next: NextFunction) => {

    const prisma = new PrismaClient()

    let token = req.cookies.styliooJWT
    if (token) {
        try {
            const decoded = jwt.verify(token, "JWT_SECRET")

            if (typeof decoded !== "string") {

                const user = await prisma.customer.findUnique({
                    where: { uid: decoded.id }
                })

                if (user) {
                    next()
                } else {
                    res.json(generateResponse(false, null, 'User not found'))
                }

            }

        } catch (err) {
            res.json(generateResponse(false, null, err))
        }
    } else {
        res.json(generateResponse(false, null, 'Not Authorized, No Token'))
    }
}

export default protect