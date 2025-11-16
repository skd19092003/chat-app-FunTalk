import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//this is only used for protecting routes which only logged in users can access
//to update their profile or to check auth status 

//next will call the controller function which is updateprofile
export const protectRoute = async (req, res, next) => {
  try {
    //extracted token from cookies fir this we use cookie-parser 
    const token = req.cookies.jwt;
    //if no token found in cookies then user is not logged in
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    //most of the time user will be found but just to be safe we will check if user exists
    //this will not run 99% of the time
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //now we add it to req object so that we can access it in controller function
    //for updateprofile e need the user which we wil take fromhere
    req.user = user;
    
    next();  

     
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
