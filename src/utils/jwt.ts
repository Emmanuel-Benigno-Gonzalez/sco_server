import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

type JWTPayload = {
    id_usuario: number
    tipo_usuario: number
};

export const generateJWT = (payload: JWTPayload) => {
    //const token = jwt.sign(payload, JWT_SECRET!, {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '2min'
    });
    return token;
};
