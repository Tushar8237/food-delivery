import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import restaurantRoute from './routes/restaurant.routes.js'
import menuItemRoute from './routes/menuItem.routes.js'
import addressRoute from './routes/address.routes.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use('/api/auth', authRoutes)
app.use('/api/restaurant', restaurantRoute)
app.use('/api/restaurant', menuItemRoute)
app.use('/api/restaurant', addressRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
})