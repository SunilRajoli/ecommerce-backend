import { getTokenFromHeader } from "../utils/generateTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";



export const isLoggedin = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser) {
        throw new Error("Invalid/Expired token, Please Login Again!")
    } else {
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}