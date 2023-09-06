import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { generateResponse } from "../utils"
import { v4 } from "uuid"

const prisma = new PrismaClient()

export const getAllSuppliers = async (req: Request, res: Response) => {
    try {

        const nameAndIdOnly = req.query.nameAndIdOnly as string || 'false'
        
        const suppliers = await prisma.supplier.findMany({
            orderBy: {
                created_at: 'asc'
            },
            select: nameAndIdOnly === 'true' ? {
                id: true,
                name: true
            } : undefined
        })

        if (suppliers?.length > 0)
            res.status(200).json(generateResponse(true, suppliers))
        else
            res.status(404).json(generateResponse(false, null, 'No suppliers found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (supplier)
            res.status(200).json(generateResponse(true, supplier))
        else
            res.status(404).json(generateResponse(false, null, 'Supplier not found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await prisma.supplier.create({
            data: {
                id: v4().substring(0, 15),
                name: req.body.name,
                contact_no: req.body.contact_no,
                address_line_1: req.body.address_line_1,
                address_line_2: req.body.address_line_2,
                email: req.body.email,
            }
        })
        res.status(200).json(generateResponse(true, supplier))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}