import express from 'express'
import cors from 'cors'
import { router } from '../route'
import { errorMiddleware } from "../middleware/error-middleware"
import multer from 'multer';


export const createServer = (): express.Application => {
    const port = process.env.PORT
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + '/../..' + '/public'))
    app.use('/storage', express.static(__dirname + '/../..' + '/uploads'))

    app.use(cors())
    router(app)
    app.use(errorMiddleware)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

    return app
}

