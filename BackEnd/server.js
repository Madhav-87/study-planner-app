import express from 'express';
import router from './routers/router.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/",router)


app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.status || 500).json({message:err.stack || "Internal Server Error", success:false});
})
app.listen(process.env.SERVER_PORT,()=>{
console.log(`Server is running on port:${7000}`)
})