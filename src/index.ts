import { Request, Response } from "express";
import app from "./app";
import connection from "./connection";

app.get('/ping', (req: Request, res: Response)=>{
  res.send('pong')
})