import { Request, Response } from "express"
import { IJWTUser, IUser } from "../interfaces/IUser"
import {Model} from 'mongoose'
import { AuthRequest } from "../interfaces/IAuthRequest"
import { BadRequest } from "../errors/bad-request"
import { NotFound } from "../errors/not-found"

const User:Model<IUser> = require("../models/User")

export const getUserById = async (req:Request, res:Response) =>{
    const {id} = req.query

    if(!id) {
        throw new BadRequest("please provide a user id")
    }

    const user = await User.findOne({_id: id})

    if(!user){
        throw new NotFound("user not found")
    }

    res.json({ user })

}

export const updateUser = async (req:AuthRequest, res:Response) => {
    const user:IJWTUser = req.user;

    if(!user){
        throw new NotFound("user not found")
    }

    const payload = await User.updateOne(user, req.body);
    res.json({ user: payload })
    

}