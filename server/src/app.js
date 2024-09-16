import express from 'express'
import cors from 'cors' 


export const app = express()

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// get the data form the user in multipel way
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true ,limit: '16kb'}))
app.use(express.static("public"))


// import the routes
import {router} from './routes/user.routes.js'
import {favouriteRouter} from './routes/favourites.routes.js'

// declared the routes
app.use("/api/book-store/", router)
app.use("/api/book-store/", favouriteRouter)

// api sample
// http://localhost:4000/api/book-store/sign-up