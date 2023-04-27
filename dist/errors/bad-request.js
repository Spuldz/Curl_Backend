"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const custom_error_1 = require("./custom-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class BadRequest extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
    }
}
exports.BadRequest = BadRequest;
