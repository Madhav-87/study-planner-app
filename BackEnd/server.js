import express from 'express';
import router from './routers/router.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/",router)

app.listen(process.env.SERVER_PORT,()=>{
console.log(`Server is running on port:${7000}`)
})