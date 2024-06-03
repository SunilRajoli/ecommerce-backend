import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from '../controllers/userCtrl.js';
import { isLoggedin } from '../middlewares/isLoggedin.js';

const userRoutes = express.Router();
userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedin, getUserProfileCtrl);

export default userRoutes;