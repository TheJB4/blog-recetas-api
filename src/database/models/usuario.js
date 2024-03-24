import mongoose, {Schema} from "mongoose";

let usuarioSchema = new Schema({
    correoElectronico:{
        type:String,
        required: true,
        unique:true,
        validate:{
            validator:function(valor){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor)
            },
            message: props => `${props.value} no es un correo electronico valido!`
        }
    },
    password:{
        type:String,
        required: true,
        minLength:8,
        maxLength:100,
    },
    isAdmin:{
        type:Boolean,
        default: false  
    }
})

const Usuario = mongoose.model('usuario',usuarioSchema)
export default Usuario