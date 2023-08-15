import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import protect from "./middleware/auth"

import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import customerRoutes from './routes/customer'
import employeeRoutes from './routes/employee'
import serviceRoutes from './routes/service'
import appointmentRoutes from './routes/appointment'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
    res.status(200).send('I am alive and healthy')
})

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/customer', customerRoutes)
app.use('/employee', employeeRoutes)
app.use('/service', serviceRoutes)
app.use('/appointment', appointmentRoutes)



app.listen(5400, () => {
    console.log('Server is running on port 5400.')
})