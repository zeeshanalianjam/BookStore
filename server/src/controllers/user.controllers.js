import { apiResponse } from "../utils/apiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import bcrypt from 'bcrypt'


export const signUpUser = asyncHandler( async(req, res)=> {
   try {
      const {name, email, password, address} = req.body
   
      if(name.length < 4){
         return res.status(400).json(new apiResponse(400,{}, 'Name length should be greater than 3'))
      }
   
      const existingName = await User.findOne({name})
   
   
      if(existingName){
         return res.status(409).json(
            new apiResponse(409,{}, "Name already exists!")
         )
      }
      const existingEmail = await User.findOne({email})
   
   
      if(existingEmail){
         return res.status(409).json(
            new apiResponse(409,{}, "Email already exists!")
         )
      }
   
      if(password.length <= 5){
         return res.status(400).json(
            new apiResponse(400,{}, "Password's length should be greater than 5")
         )
      }
   
      const hashedPassword = await bcrypt.hash(password, 10)
   
      const user = new User({
         name,
         email,
         password: hashedPassword,
         address
      })
   
      const newUser = await user.save();
   
   
      res.status(200).json(
         new apiResponse(200,newUser,"User created successfully...")
      )
   } catch (error) {
      res.status(500).json(
         new apiResponse(500, {}, "Internal Server Error "), error
      )
   }

   
})