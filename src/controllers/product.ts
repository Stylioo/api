import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { generateResponse } from '../utils'

const prisma = new PrismaClient()

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const forPage = req.query.forPage as string || await prisma.product.count()
        const page = req.query.page as string || "0"


        const products = await prisma.product.findMany({
            skip: Number(forPage) * Number(page),
            take: Number(forPage),
            orderBy: {
                updated_at: 'asc'
            }
        })

        if (products?.length > 0)
            res.status(200).json(generateResponse(true, products))
        else
            res.status(404).json(generateResponse(false, null, 'No products found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const term = req.query.term as string || ""
        const forPage = req.query.forPage as string || await prisma.product.count()
        const page = req.query.page as string || "0"

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: term } },
                    { category: { contains: term } },
                    { brand: { contains: term } },
                    { type: { contains: term } }
                ]
            },
            skip: Number(forPage) * Number(page),
            take: Number(forPage),
            orderBy: {
                created_at: 'asc'
            },
        })



        if (products?.length > 0)
            res.status(200).json(generateResponse(true, products))
        else
            res.status(404).json(generateResponse(false, null, 'No products found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id }
        })

        if (product)
            res.status(200).json(generateResponse(true, product))
        else
            res.status(404).json(generateResponse(false, null, 'No product found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))
    }
}