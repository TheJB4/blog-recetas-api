import Receta from '../database/models/receta.js'

export const obtenerRecetas = async (req,res) => {
    try{
        let recetas = await Receta.find()

        res.status(200).json(recetas)
    }catch(err){
        res.status(400).json({
            message: "Ocurrio un error con el servidor"
        })
    }
}

export const crearReceta = async (req, res) => {
    try {
        let recetaNueva = new Receta(req.body)
        await recetaNueva.save()

        res.status(201).json({
            mensaje: "El producto fue creado correctamente"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            mensaje: "El producto no pudo ser dado de alta"
        })
    }

}

export const editarReceta = async (req,res) => {
    try{
        let {id} = req.params
        console.log(req.body)
        let receta = await Receta.findById(id)

        if(!receta){
            res.status(400).json({message: 'El producto no fue encontrado'})
        }

        await Receta.findByIdAndUpdate(id,req.body)

        res.status(200).json({
            message: 'El producto se actualizo correctamente'
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:'Ocurrio un error con el servidor'
        })
    }
}

export const eliminarReceta = async (req,res) => {
    try{
        let {id} = req.params

        let receta = await Receta.findById(id)

        if(!receta){
            res.status(400).json({message: 'El producto no fue encontrado'})
        }

        await Receta.findByIdAndDelete(id)

        res.status(200).json({
            message: 'El producto se actualizo correctamente'
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:'Ocurrio un error con el servidor'
        })
    }
}
