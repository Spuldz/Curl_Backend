import express, {Request, Response} from 'express'
import { errorHandlerMiddleware } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import 'express-async-errors'
import { connectDB } from './db/connect';

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 8080 || process.env.PORT;

const authRouter =require("./routes/auth")

app.use(express.json())

//routes
app.use("/api/v1/auth", authRouter)

//error middleware
app.use(errorHandlerMiddleware)
app.use(notFound)

const start =  () => {
    try {
        app.listen(port, async () => {
            await connectDB(process.env.MONGO_URI)
            console.log(`[server]: Server is running at http://localhost:${port}`);
          });
    } catch (error) {
        console.log(error);
        
    }
}

start()