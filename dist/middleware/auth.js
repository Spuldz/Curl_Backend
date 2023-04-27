"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const bad_request_1 = require("../errors/bad-request");
const unauthenticated_1 = require("../errors/unauthenticated");
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new bad_request_1.BadRequest("invalid token");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = yield jwt.verify(token, process.env.JWT_KEY);
        req.user = { id: payload._id, name: payload.name };
        next();
    }
    catch (error) {
        throw new unauthenticated_1.Unauthenticated("invalid token");
    }
});
exports.authMiddleware = authMiddleware;
