import { Request } from "express";
import { IJWTUser, IUser } from "./IUser";

export interface AuthRequest extends Request{
    user: IJWTUser
}