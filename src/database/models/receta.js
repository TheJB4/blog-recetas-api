import mongoose, {Schema} from "mongoose";

const recetaSchema = new Schema({
    tituloReceta:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
        unique: true
    },
    autor:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
    },
    descripcion:{
        type:String,
        required:true,
        minLength: 30,
        maxLength: 10000
    },
    ingredientes:{
        type:Array,
        default:[],
        required:true,
    },
    pasos:{
        type:Array,
        default:[],
        required:true
    },
    sugerencias:{
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required:true,
        validate:{
            validator: function(valor){
                //validar el valor con un patron
                return /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(valor)
            },
            message: props => `${props.value} no es una url de imagen valida.`
        }
    },
    categorias:{
        type:Array,
        default:[],
    }
})

const Receta = mongoose.model('receta',recetaSchema)
export default Receta;