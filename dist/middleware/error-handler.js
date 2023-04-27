"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const custom_error_1 = require("../errors/custom-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(err.message);
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
