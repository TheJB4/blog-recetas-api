import express from "express";
import 'dotenv/config';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import recetasRouter from './src/routes/recetas.routes.js'
import usuariosRouter from './src/routes/usuarios.routes.js'


import './src/database/database.js'

let app = express()

app.use(cors({
    origin:'https://blog-recetas-lake.vercel.app',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const validationRoutes = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const validationPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        console.log(validationPayload)
        next()
    } catch (err) {
        res.status(400).json({
            message: 'Debes loguearte primero para poder usar la API'
        })
    }
}


app.use('/api', recetasRouter)
app.use('/api', usuariosRouter)

app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando en el puerto: ', process.env.PORT)
})