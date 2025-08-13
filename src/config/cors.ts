import { FRONTEND_URL } from '../config'
import cors, { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [FRONTEND_URL,undefined]; //NOTA: EN PRODUCCION QUITAR EL undefined

        if (process.argv[2] === '--api') {
            whitelist.push(undefined)
        }

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Origen bloqueado:', origin); 
            callback(new Error('Error de Cors'));
        }
    }
};
