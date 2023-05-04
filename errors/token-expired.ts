import { CustomAPIError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class TokenExpired extends CustomAPIError{
    statusCode: number;
    constructor(msg:string){
        super(msg)
        this.statusCode = StatusCodes.GONE
    }
}