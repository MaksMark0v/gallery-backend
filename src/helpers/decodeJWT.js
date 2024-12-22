import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default
    function decodeJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    });
}