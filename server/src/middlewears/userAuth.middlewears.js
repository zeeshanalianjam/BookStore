import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiRespone.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json(new apiResponse(401, null, "Authentication token required!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if(err){
        console.log("ERROR in jwt token is expires and sign-in again : ", err);
        
        return res.status(403).json(
            new apiResponse(403, null, "Token expired. pleae sign-in"))
    }
    req.user = user
    next()
  })
};
