import mongoose from "mongoose"

export interface IUser{
    _id:mongoose.Types.ObjectId
    name:string,
    roles: string[],
    email:string,
    password:string
}


export interface IJWTUser{
    id: mongoose.Types.ObjectId,
    name: string
}