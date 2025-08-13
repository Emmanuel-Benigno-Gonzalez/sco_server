import express from "express"
import colors from 'colors'
import opsRoutes from "./routes/opsRoutes"
import aeronaveRoutes from './routes/aeronaveRoutes'
import aeropuertoRoutes from './routes/aeropuertoRoutes'
import authRoutes from './routes/authRoutes'
import companiaRoutes from './routes/companiaRoutes'
import calificadorRoutes from './routes/calificadorRoutes'
import matriculaRoutes from './routes/matriculaRoutes'
import db from "./config/db"
import cors from 'cors'
import { corsOptions } from './config/cors'

async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log( colors.magenta.bold('Conexion Exitosa a la DB') )
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la DB') )
    }
}

connectDB()

const server = express()

// Permitir Conexiones
/*const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(origin === FRONTEND_URL){
            callback(null, true)
        }else {
            callback(new Error('Error de Cors'))
        }
    }
}*/

server.use(cors(corsOptions))
server.use(express.json())

server.get('/', (req, res) => {
  res.json({ status: 'ok' });
});


server.use('/api/ops/operacion', opsRoutes)
server.use('/api/ops/aeronave', aeronaveRoutes)
server.use('/api/ops/aeropuerto', aeropuertoRoutes)
server.use('/api/ops/auth', authRoutes)
server.use('/api/ops/compania', companiaRoutes)
server.use('/api/ops/calificador', calificadorRoutes)
server.use('/api/ops/matricula', matriculaRoutes)

export default server