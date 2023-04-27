import { NextFunction, Request, Response } from "express"
import { BadRequest } from "../errors/bad-request";
import { Unauthenticated } from "../errors/unauthenticated";

const jwt = require('jsonwebtoken')

export const authMiddleware = async (req:Request | any, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new BadRequest("invalid token")
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = await jwt.verify(token, process.env.JWT_KEY)
        req.user = {id: payload._id, name:payload.name}
        next()
    } catch (error) {
        throw new Unauthenticated("invalid token")
    }
}