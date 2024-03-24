import Usuario from "../database/models/usuario.js"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import { users } from "moongose/models/index.js"
import { hashPassword } from "../helpers/encryptPassword.js"
import bcrypt from 'bcrypt'

export const crearUsuario = async (req, res) => {
    try {
        const errors = validationResult(req)

        let usuarioNuevo = new Usuario(req.body)

        let usuario = await Usuario.findOne({
            correoElectronico: req.body.correoElectronico
        })

        usuarioNuevo.password = await hashPassword(req.body.password)

        if (usuario) {
            return res.status(400).json({ message: 'El usuario ya existe!' })
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        }

        await usuarioNuevo.save()

        res.status(201).json({
            message: "El usuario fue creado correctamente!"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Ocurrio un error con el servidor. Intente nuevamente'
        })
    }
}

export const login = async (req, res) => {
    try {
        let usuario = await Usuario.findOne({
            correoElectronico: req.params.email
        })

        if (!usuario) {
            res.status(404).json({
                message: 'El usuario no esta registrado'
            })
            return ''
        }

        let passwordValid = await bcrypt.compare(req.body.password, usuario.password)

        
        if (!passwordValid) {
            res.status(400).json({
                message: 'Credenciales invalidas!'
            })
            return ''
        }

        const tokenPayload = {
            _id: usuario._id,
            email: usuario.correoElectronico,
            admin: usuario.isAdmin
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

        res.cookie("jwt", token)

        res.status(200).json({
            message: 'Inicio de sesion exitoso',
            data: tokenPayload
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Ocurrio un error con el servidor. Intente nuevamente'
        })
    }
}