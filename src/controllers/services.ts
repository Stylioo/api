import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { generateResponse } from '../utils'

import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export const getAllServices = async (req: Request, res: Response) => {



    try {
        // find all service sort decesding order buy updatedTime
        const searchValue = () => req.query.term === "" ? undefined : parseInt(req.query.term as string)
           
        const services = await prisma.service.findMany({
            orderBy: {
                updated_at: 'desc'
            },
            take: searchValue()
            
        })
        // let serviceCount = []
        // for(let i=0; i<searchValue; i++){
        //     serviceCount[i] = services[i]
        //     console.log("for running")


        // }

        // console.log(serviceCount)



        res.json(generateResponse(true, services))
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

// export const searchService = async (req: Request, res: Response) => {
//     try {
//         if (req.body.q === undefined) {
//             res.json(generateResponse(false, null, 'Search query is required'))
//         }
//         else {
//             const searchQuery = req.body.q.toString()
//             const services = await prisma.service.findMany({
//                 where: {
//                     OR: [
//                         {
//                             name: {
//                                 contains: searchQuery,
//                                 // mode: 'insensitive'
//                             }
//                         },
//                         {
//                             category: {
//                                 contains: searchQuery,
//                                 // mode: 'insensitive'
//                             }
//                         }
//                     ]
//                 },
//                 orderBy: {
//                     name: 'asc'
//                 }
//             })
//             res.json(generateResponse(true, services))
//         }
//     } catch (err) {
//         res.json(generateResponse(false, null, err))
//     }
// }

export const searchServicesByCategory = async (req: Request, res: Response) => {
    try {
        if (req.body.q === undefined) {
            res.json(generateResponse(false, null, 'Search query is required'))
        }
        else {
            const searchQuery = req.body.q.toString()

            if (searchQuery === 'all') {
                const services = await prisma.service.findMany({
                    orderBy: {
                        name: 'asc'
                    }
                })
                res.json(generateResponse(true, services))
            }
            else {
                const services = await prisma.service.findMany({
                    where: {
                        category: {
                            contains: searchQuery,
                            // mode: 'insensitive'
                        }
                    },
                    orderBy: {
                        name: 'asc'
                    }
                })
                res.json(generateResponse(true, services))
            }
        }
    } catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const getServiceById = async (req: Request, res: Response) => {
    try {
        const service = await prisma.service.findUnique({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, service))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const createService = async (req: Request, res: Response) => {

    try {
        const service = await prisma.service.create({
            data: {
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                duration: req.body.duration,
                status: req.body.status,
            }
        })
        res.json(generateResponse(true, service))
    }
    catch (err) {
        console.log(err);
        res.json(generateResponse(false, null, err))
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        const updatedService = await prisma.service.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                duration: req.body.duration,
                status: req.body.status,
                category: req.body.category,
            }
        })
        res.json(generateResponse(true, updatedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const deletedService = await prisma.service.delete({
            where: { id: req.params.id }
        })
        res.json(generateResponse(true, deletedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try {
        const deletedService = await prisma.service.deleteMany()
        res.json(generateResponse(true, deletedService))
    }
    catch (err) {
        res.json(generateResponse(false, null, err))
    }
}



export const searchService = async (req: Request, res: Response) => {
    console.log("test");
    try {
        const term = req.query.term as string || ""
        const forPage = req.query.forPage as string || await prisma.service.count()
        const page = req.query.page as string || "0"

        

        // const quantityOnly = req.query.quantityOnly as string || 'false'


        const services = await prisma.service.findMany({
            where: {
                OR: [
                    { name: { contains: term } },
                    { category: { contains: term } },
                    // { brand: { contains: term } },
                    // { type: { contains: term } }
                ]
            },
            skip: Number(forPage) * Number(page),
            take: Number(forPage),
            orderBy: {
                created_at: 'desc'
            },
            // select: {
            //     id: true,
            //     name: true,
            //     // image: true,
            //     // status: true,
            //     category: true,
            //     // brand: true,
            //     // type: true,
            //     // volume: true,
            //     // volume_unit: true,
            //     // low_stock_quantity: true,
            //     // stock: quantityOnly === 'true' ? {
            //     //     select: {
            //     //         quantity: true,
            //     //     }
            //     // } : false
            // }

        })

        console.log(services)



        if (services?.length > 0)
            res.status(200).json(generateResponse(true, services))
        else
            res.status(404).json(generateResponse(false, null, 'No Services found'))

    } catch (err) {
        console.log(err)
        res.status(500).json(generateResponse(false, null, err))

    }
}



