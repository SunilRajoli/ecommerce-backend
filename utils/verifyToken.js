import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) =>{
        if(err) {
            return "Token expired/Invalid";
        }
        else {
            return decoded;
        }
    })
}