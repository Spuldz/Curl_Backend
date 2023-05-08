import { Request, Response } from "express"
import { IUser } from "../interfaces/IUser"
import {Model} from 'mongoose'
import { AuthRequest } from "../interfaces/IAuthRequest"
import { BadRequest } from "../errors/bad-request"
import { NotFound } from "../errors/not-found"

const User:Model<IUser> = require("../models/User")

export const getUserById = (req:Request, res:Response) =>{
    const {id} = req.query

    if(!id) {
        throw new BadRequest("please provide a user id")
    }

    const user = User.findOne({_id: id})

    if(!user){
        throw new NotFound("user not found")
    }

    res.json({ user })

}