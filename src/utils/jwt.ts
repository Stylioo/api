import { Response } from "express"
import jwt from "jsonwebtoken"
const genarateJWT = (res: Response, id: string) => {

    const token = jwt.sign({ id: id }, "JWT_SECRET", { expiresIn: '30d' })

    res.cookie('styliooJWT', token,
        {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            // secure: process.env.NODE_ENV !== 'development'
        })

    return token
}

export default genarateJWT