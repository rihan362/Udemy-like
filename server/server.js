import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkwebhooks } from './controllers/webhooks.js';


const app=express();

app.use(cors());

await connectDB

app.get('/',(req,res)=>res.send("API working"));
app.post('/clerk',express.json(),clerkwebhooks)

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


