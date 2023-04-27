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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bad_request_1 = require("../errors/bad-request");
const unauthenticated_1 = require("../errors/unauthenticated");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const User = require('../models/User');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const payload = {
        email,
        password
    };
    const user = yield User.create(payload);
    const token = yield user.createJWT();
    res.status(http_status_codes_1.default.CREATED).json({ user: { id: user._id, name: user.name }, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.BadRequest("invalid credentials");
    }
    const user = yield User.findOne({ email });
    if (!user) {
        throw new unauthenticated_1.Unauthenticated("invalid credentials");
    }
    const isPasswordCorrect = yield user.comparePasswords(password);
    if (!isPasswordCorrect) {
        throw new unauthenticated_1.Unauthenticated("invalid credentials");
    }
    const token = yield user.createJWT();
    res.status(http_status_codes_1.default.OK).json({ user: { id: user._id, name: user.name }, token });
});
exports.login = login;
