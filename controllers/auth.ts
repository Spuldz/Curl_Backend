import { Request, Response } from "express"
import { BadRequest } from "../errors/bad-request";
import { Unauthenticated } from "../errors/unauthenticated";
import statusCodes from 'http-status-codes'

const User = require('../models/User')

export const register = async (req:Request, res:Response) => {
    const { email, password} = req.body;

    const payload = {
        email,
        password
    }

   const user = await User.create(payload)
   const token = await user.createJWT();
   res.status(statusCodes.CREATED).json({ user: {id: user._id, name:user.name}, token })
    
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        throw new BadRequest("invalid credentials")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new Unauthenticated("invalid credentials")
    }

    const isPasswordCorrect = await user.comparePasswords(password);

    if(!isPasswordCorrect){
        throw new Unauthenticated("invalid credentials")
    }

    const token = await user.createJWT();
    res.status(statusCodes.OK).json({user: {id: user._id, name:user.name}, token})


}
