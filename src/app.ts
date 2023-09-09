import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/routes";
const app: Application = express();
import cors from "cors";


app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

//global error handler



export default app;
