import Router from 'express';
import { crearReceta,obtenerRecetas,editarReceta, eliminarReceta } from '../controllers/recetas.controller.js';

let router = Router()

router.route('/recetas')
.get(obtenerRecetas)
.post(crearReceta)

router.route('/recetas/:id')
.put(editarReceta)
.delete(eliminarReceta)


export default router