import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { generateResponse } from "../utils"
import { v4 } from "uuid"

const prisma = new PrismaClient()


export const getAllStock = async (req: Request, res: Response) => {
    try {
        const stock = await prisma.stock.findMany({
            orderBy: {
                created_at: 'asc'
            },
        })

        if (stock?.length > 0)
            res.status(200).json(generateResponse(true, stock))
        else
            res.status(404).json(generateResponse(false, null, 'No stock found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const createStock = async (req: Request, res: Response) => {
    try {

        const stock = await prisma.stock.create({
            data: {
                id: v4().substring(0, 15),
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price,
                manufacturer_date: req.body.manufacturer_date,
                expiry_date: req.body.expiry_date,
                supplier_id: req.body.supplier_id,
            }
        })

        res.status(200).json(generateResponse(true, stock))


    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}