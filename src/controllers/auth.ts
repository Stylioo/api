import { generateResponse } from "../utils"
import genarateJWT from "../utils/jwt"

import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import asyncHandler from "express-async-handler"

const prisma = new PrismaClient()

dotenv.config()


export const signup = asyncHandler(async (req: Request, res: Response) => {
    const employee = await prisma.employee.findUnique({
        where: { email: req.body.email }
    })

    if (employee) res.status(400).json(generateResponse(false, null, 'Email already exists'))

    const hashPassword = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.employee.create({
        data: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
        }
    })
    res.status(200).json(generateResponse(true, user))

})

export const signin = asyncHandler(async (req: Request, res: Response) => {

    console.log("data", req.body);


    const employee = await prisma.employee.findUnique({
        where: { email: req.body.email },
    })

    if (employee) {
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            employee.password
        )
        if (isPasswordValid) {

            if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined")
            const accessToken = jwt.sign({ id: employee.id, role: employee.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })

            if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined")
            const refreshToken = jwt.sign({ id: employee.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

            res.cookie("JWT", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 1000 * 60 * 60 * 24,
            })

            res.json(
                generateResponse(true, {
                    id: employee.id,
                    accessToken,
                    refreshToken,
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    email: employee.email,
                    role: employee.role,
                    image: employee.image
                })
            )
        } else {
            res.json(generateResponse(false, null, "Invalid email or password"))
        }
    } else {
        res.json(generateResponse(false, null, "Invalid email or password"))
    }
})

export const refresh = (req: Request, res: Response) => {
    const refreshToken = req.cookies.JWT

    if (!refreshToken) {
        return res.json(generateResponse(false, null, "No refresh token provided"))
    }

    if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined")

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err: any, user: any) => {
            if (err) {
                return res.status(403).json(generateResponse(false, null, "Invalid refresh token"))
            }

            try {
                const employee = await prisma.employee.findUnique({
                    where: { id: user.id },
                })

                if (!employee) {
                    return res.status(401).json(generateResponse(false, null, "Unauthorized"))
                }

                if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined")
                const accessToken = jwt.sign({ id: employee.id, role: employee.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })

                res.json(generateResponse(true, { accessToken }))
            }
            catch (err) {
                res.status(500).json(generateResponse(false, null, err))
            }
        }
    )
}

export const signout = (req: Request, res: Response) => {
    const cookie = req.cookies
    if (!cookie?.JWT) return res.status(204).json(generateResponse(true, null, "No cookie found"))
    res.clearCookie("JWT", { httpOnly: true, secure: true, sameSite: "none" })
    res.status(200).json(generateResponse(true, null, "Signout successful"))

}