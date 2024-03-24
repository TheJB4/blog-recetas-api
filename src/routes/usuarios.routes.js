import Router from 'express'
import { crearUsuario,login } from '../controllers/usuario.controller.js'
import { check } from 'express-validator'

let router = Router()


router.route('/usuarios').post(
    [
        check("correoElectronico")
            .notEmpty()
            .withMessage("El correo electronico es un dato obligatorio")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .withMessage("El correo electronico es invalido"),
        check("password")
            .notEmpty()
            .withMessage("La contraseña es un dato obligatorio")
            .isLength({min:8, max:100})
            .withMessage("La contraseña debe tener entre 8 y 100 caracteres")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
            .withMessage("La contraseña debe ser Alfanumerica, y contener un caracter especial y una mayuscula")
    ]
    , crearUsuario)

router.route('/usuarios/:email').post(login)

export default router