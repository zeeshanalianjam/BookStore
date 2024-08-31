import mongoose from 'mongoose'
import { DB_Name } from '../constants.js';


export const DBConnect = async(req, res) => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        console.log(`\n Congratulations MongoDB Connected Successfully... || Connection Host : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Error in MongoDB Connection : ${error}`);
        res.json("MongoDB Connection Error!")
    }
}