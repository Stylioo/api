import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { generateResponse } from '../utils'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const forPage = req.query.forPage as string || await prisma.product.count()
        const page = req.query.page as string || "0"

        const quantityOnly = req.query.quantityOnly as string || 'false'


        const products = await prisma.product.findMany({
            skip: Number(forPage) * Number(page),
            take: Number(forPage),
            orderBy: {
                updated_at: 'desc'
            },
            select: {
                id: true,
                name: true,
                image: true,
                status: true,
                category: true,
                brand: true,
                type: true,
                volume: true,
                volume_unit: true,
                low_stock_quantity: true,
                stock: quantityOnly === 'true' ? {
                    select: {
                        quantity: true,
                    }
                } : false
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

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const term = req.query.term as string || ""
        const forPage = req.query.forPage as string || await prisma.product.count()
        const page = req.query.page as string || "0"

        const quantityOnly = req.query.quantityOnly as string || 'false'


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
                created_at: 'desc'
            },
            select: {
                id: true,
                name: true,
                image: true,
                status: true,
                category: true,
                brand: true,
                type: true,
                volume: true,
                volume_unit: true,
                low_stock_quantity: true,
                stock: quantityOnly === 'true' ? {
                    select: {
                        quantity: true,
                    }
                } : false
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

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
            include: {
                stock: {
                    include: {
                        supplier: true
                    }
                }
            }
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

export const createProduct = async (req: Request, res: Response) => {
    try {

        const product = await prisma.product.create({
            data: {
                id: v4().substring(0, 15),
                name: req.body.name,
                brand: req.body.brand,
                image: 'beautyProduct.jpg',
                low_stock_quantity: parseInt(req.body.low_stock_quantity),
                category: req.body.category,
                type: req.body.type,
                volume: parseFloat(req.body.volume),
                volume_unit: req.body.volume_unit
            }
        })

        res.status(200).json(generateResponse(true, product))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const productId = req.params.id;

        const deleteStockResult = await prisma.stock.deleteMany({
            where: {
                product_id: productId,
            },
        });

        const deleteProductResult = await prisma.product.delete({
            where: {
                id: productId,
            },
        });

        res.status(200).json(generateResponse(true, {
            product: deleteProductResult,
            deletedStock: deleteStockResult,
        }));

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}