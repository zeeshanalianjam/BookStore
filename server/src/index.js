import { DBConnect } from "./db/DBConnection.js";
import {app} from './app.js'
import dotenv from 'dotenv'

// dotenv configuration
dotenv.config({
    path: "./.env"
})
const port = process.env.PORT

DBConnect().then((req, res)=>{
    app.listen(port, ()=>{
        console.log(`Server is Runing on Port : ${port}`);
    })
}).catch((err)=> {
    res.json("Internal Server Error : ", err)
})