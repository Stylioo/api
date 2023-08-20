import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { generateResponse } from "../utils"

interface CustomRequest extends Request {
    user?: string
    role?: string
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string || req.headers.Authentication as string

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json(generateResponse(false, null, "Unauthorized"))

    const token = authHeader.split(" ")[1]

    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json(generateResponse(false, null, "Invalid access token"))
        }

        req.user = decoded.uid
        req.role = decoded.role
        next()
    })
}