import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { generateResponse } from '../utils'
import generateRandomString from '../utils/randomeString';
import bcrypt from 'bcrypt'
import sendMail, { generateMailForSendPassword } from '../utils/mailer';

const prisma = new PrismaClient()

export const fetchAllEmployees = async (req: Request, res: Response) => {
    try {
        const users = await prisma.employee.findMany()
        res.json(generateResponse(true, users))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const findEmployeeById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.employee.findUnique({
            where: { uid: req.params.id }
        })
        res.json(generateResponse(true, user))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    try {

        const randomPassword = generateRandomString(15)
        const passwordHash = await bcrypt.hash(randomPassword, 10)


        const user = await prisma.employee.create({
            data: {
                uid: uuidv4(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: passwordHash,
                contact_no: req.body.contact_no,
                address_line_1: req.body.address_line_1,
                address_line_2: req.body.address_line_2,
                city: req.body.city,
                district: req.body.district,
                role: req.body.role,
            }
        })

        // console.log(req.body.email);


        // const emailTemplate = generateMailForSendPassword(req.body.email, randomPassword)

        const emailTemplate = "<h1>this is test</h1>"
        const emailResponse = await sendMail(req.body.email, 'Login Credentials for Stylioo', emailTemplate)
        // console.log(emailResponse);

        if (emailResponse) {
            res.json(generateResponse(true, user))
        } else {
            res.json(generateResponse(false, null, 'Failed to send email'))
        }
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const updatedUser = await prisma.employee.update({
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

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deletedUser = await prisma.employee.delete({
            where: { uid: req.params.id }
        })
        res.json(generateResponse(true, deletedUser))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}



export const fetchEmployeesByRole = async (req: Request, res: Response) => {
    try {
        type roleType = 'ADMIN' | 'OWNER' | 'MANAGER' | 'BEAUTICIAN' | 'RECEPTIONIST'

        let employeeRole = req.params.role as string
        employeeRole = employeeRole.toUpperCase();

        const full = req.query.full

        const users = await prisma.employee.findMany({
            where: {
                role: employeeRole as roleType
            },
            select: {
                uid: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true
            }
        })
        res.json(generateResponse(true, users))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

function toUpperCase(employeeRole: string): any {
    throw new Error('Function not implemented.');
}
