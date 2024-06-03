import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/generateTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const {fullName, email, password} = req.body;

    //check if user exist or not
    const userExists = await User.findOne({email});
    if(userExists) {
        //throw
        throw new Error("User Already Exists!");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: "success",
        message: "User Register Successfully",
        data: user,
    })
})

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //find the user in db by email only
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound?._id),
        })
    } else {
        throw new Error("Invalid login credentials!");
    }
})

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    //get token from header
    const token = getTokenFromHeader(req);

    //verify Token
    const verified = verifyToken(token);

    console.log(verified);
    res.json({
        msg: "Welcome Profile Page!",
    })
})