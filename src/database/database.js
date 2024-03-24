import 'dotenv/config';
import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{
    console.log('BD conectada')
})