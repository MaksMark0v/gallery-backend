import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default
    function generateJwt(user) {
    const params = {
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName
    };
    return jwt.sign(params, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    });
}