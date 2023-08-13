import { generateResponse } from '../utils'
import genarateJWT from '../utils/jwt'
import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
    try {
        if (req.body.type === 'CUSTOMER') {
            const customer = await prisma.customer.findUnique({
                where: { email: req.body.email }
            })

            if (customer) {
                const isPasswordValid = await bcrypt.compare(req.body.password, customer.password)
                if (isPasswordValid) {
                    genarateJWT(res, customer.uid)
                    res.json(generateResponse(true, {
                        uid: customer.uid,
                        first_name: customer.first_name,
                        last_name: customer.last_name,
                        email: customer.email,
                    }))
                } else {
                    res.json(generateResponse(false, null, 'Invalid Password'))
                }
            } else {
                res.json(generateResponse(false, null, 'Invalid Email'))
            }

        } else if (req.body.type === 'EMPLOYEE') {
            const employee = await prisma.employee.findUnique({
                where: { email: req.body.email }
            })

            if (employee) {
                const isPasswordValid = await bcrypt.compare(req.body.password, employee.password)
                if (isPasswordValid) {
                    genarateJWT(res, employee.uid)
                    res.json(generateResponse(true, {
                        uid: employee.uid,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email: employee.email,
                        role: employee.role,
                    }))
                } else {
                    res.json(generateResponse(false, null, 'Invalid Password'))
                }
            } else {
                res.json(generateResponse(false, null, 'Invalid Email'))
            }
        } else {
            res.json(generateResponse(false, null, 'Invalid User Type'))
        }

    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const register = async (req: Request, res: Response) => {

    try {
        if (req.body.type === 'CUSTOMER') {
            const customer = await prisma.customer.findUnique({
                where: { email: req.body.email }
            })

            if (customer) {
                res.json(generateResponse(false, null, 'Email already exists'))
            }
            else {
                const hashPassword = await bcrypt.hash(req.body.password, 10)

                const user = await prisma.customer.create({
                    data: {
                        uid: uuidv4(),
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hashPassword,
                    }
                })
                res.json(generateResponse(true, user))
            }

        } else if (req.body.type === 'EMPLOYEE') {
            const employee = await prisma.employee.findUnique({
                where: { email: req.body.email }
            })

            if (employee) {
                res.json(generateResponse(false, null, 'Email already exists'))
            } else {

                const hashPassword = await bcrypt.hash(req.body.password, 10)

                const user = await prisma.employee.create({
                    data: {
                        uid: uuidv4(),
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hashPassword,
                        role: req.body.role
                    }
                })
                res.json(generateResponse(true, user))
            }
        } else {
            res.json(generateResponse(false, null, 'Invalid User Type'))
        }

    } catch (err) {
        res.json(generateResponse(false, null, err))
    }

}


export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('styliooJWT')
        res.json(generateResponse(true, null, 'Logout Successfully'))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}