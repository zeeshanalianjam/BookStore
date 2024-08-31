import { apiResponse } from "../utils/apiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signUp api
export const signUpUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (name.length < 4) {
      return res
        .status(400)
        .json(new apiResponse(400, {}, "Name length should be greater than 3"));
    }

    const existingName = await User.findOne({ name });

    if (existingName) {
      return res
        .status(409)
        .json(new apiResponse(409, {}, "Name already exists!"));
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(409)
        .json(new apiResponse(409, {}, "Email already exists!"));
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json(
          new apiResponse(400, {}, "Password's length should be greater than 5")
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });

    const newUser = await user.save();

    res
      .status(200)
      .json(new apiResponse(200, newUser, "User created successfully..."));
  } catch (error) {
    res
      .status(500)
      .json(new apiResponse(500, {}, "Internal Server Error "), error);
  }
});

// signIn api
export const signInUser = asyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      return res
        .status(400)
        .json(new apiResponse(400, {}, "Inavlid Credentials!"));
    }

     await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
      const authClaims = [
         {name: existingUser.name},
         {role: existingUser.role}
      ]
        const token = jwt.sign(
         { authClaims }, 
         process.env.JWT_SECRET_KEY,
         {
            expiresIn : process.env.JWT_EXPIRY_KEY
         }
      );
        res
          .status(200)
          .json(new apiResponse(200, {user: existingUser, token, }, "User login successfully..."));
      } else {
        res.status(400).json(new apiResponse(400, {}, "Inavlid Credentials!"));
      }
    });
  } catch (error) {
    console.log("ERROR in Internal Server in SignIn user error:  ", error);
    
    res
      .status(500)
      .json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// getUserInforamtion api
export const getUserInforamtion = asyncHandler( async(req, res) => {
 try {
  const {id}  = req.headers

  const data = await User.findById(id).select("-password")

  return res.status(200).json(data)
 } catch (error) {
  console.log("ERROR in Internal Server in get user information error:  ", error);
    
    res
      .status(500)
      .json(new apiResponse(500, {}, "Internal Server Error "))
  }
 }
)

// update address
export const updateAddress = asyncHandler( async(req, res) => {
  try {
    const {id} = req.headers;
    const {address} = req.body;

    await User.findByIdAndUpdate(id, {address: address})

    return res.status(200).json(
      new apiResponse(200, {},"Address updated successfully..." )
    )
  } catch (error) {
    console.log("ERROR in Internal Server in update address error:  ", error);
    
    res
      .status(500)
      .json(new apiResponse(500, {}, "Internal Server Error "))
  }
})
 
