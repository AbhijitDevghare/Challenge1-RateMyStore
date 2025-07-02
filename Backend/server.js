import dotenv from 'dotenv';
dotenv.config();

import  app from './app.js';

const PORT = process.env.PORT || 8081;


app.listen(PORT,(req,resp)=>{
    console.log(`THE SERVER IS RUNNING ON THE PORT ${PORT}`)
})