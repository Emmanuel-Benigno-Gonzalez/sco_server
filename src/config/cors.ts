import { FRONTEND_URL } from '../config'
import cors, { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [FRONTEND_URL];

        if (process.argv[2] === '--api') {
            whitelist.push(undefined)
        }

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'));
        }
    }
};
