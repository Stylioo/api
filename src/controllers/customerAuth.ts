import { generateResponse } from "../utils"
import genarateJWT from "../utils/jwt"

import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

const prisma = new PrismaClient()

dotenv.config()

export const signin = async (req: Request, res: Response) => {
    try {
        console.log(req.body)

        const customer = await prisma.customer.findUnique({
            where: { email: req.body.email },
        })

        if (customer) {
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                customer.password
            )
            if (isPasswordValid) {

                if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined")
                const accessToken = jwt.sign({ id: customer.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })

                if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined")
                const refreshToken = jwt.sign({ id: customer.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

                res.cookie("JWT", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 1000 * 60 * 60 * 24,
                })

                res.status(200).json(
                    generateResponse(true, {
                        id: customer.id,
                        accessToken,
                        refreshToken,
                        first_name: customer.first_name,
                        last_name: customer.last_name,
                        email: customer.email,
                        // image: customer.image
                    })
                )
            } else {
                res.status(400).json(generateResponse(false, null, 'Invalid password'))
            }
        } else {
            res.status(400).json(generateResponse(false, null, 'Invalid email'))
        }

        console.log(customer);

    } catch (err) {
        console.log(err);
        res.status(500).json(generateResponse(false, null, err))
    }
}


export const signup = async (req: Request, res: Response) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: { email: req.body.email },
        })

        if (customer) {
            res.status(200).json(generateResponse(false, null, 'Email already exists'))
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            const user = await prisma.customer.create({
                data: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashPassword,
                }
            })

            if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined")
            const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })

            if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined")
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

            // res.cookie("JWT", refreshToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none",
            //     maxAge: 1000 * 60 * 60 * 24,
            // })

            res.status(200).json(
                generateResponse(true, {
                    id: user.id,
                    accessToken,
                    refreshToken,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    // image: user.image
                })
            )


        }




    } catch (err) {
        console.log(err);
        res.status(500).json(generateResponse(false, null, err))
    }
}