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
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("./middleware/error-handler");
const not_found_1 = require("./middleware/not-found");
require("express-async-errors");
const connect_1 = require("./db/connect");
const dotenv = require('dotenv');
dotenv.config();
const app = (0, express_1.default)();
const port = 8080 || process.env.PORT;
const authRouter = require("./routes/auth");
app.use(express_1.default.json());
//routes
app.use("/api/v1/auth", authRouter);
//error middleware
app.use(error_handler_1.errorHandlerMiddleware);
app.use(not_found_1.notFound);
const start = () => {
    try {
        app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, connect_1.connectDB)(process.env.MONGO_URI);
            console.log(`[server]: Server is running at http://localhost:${port}`);
        }));
    }
    catch (error) {
        console.log(error);
    }
};
start();
