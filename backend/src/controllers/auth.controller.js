import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    //we can access req.user beause we send/added it in protectedroute middleware
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    //otherwise upload to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    //found user and update profile pic
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      //added cloudinary url to profilepic field
      { profilePic: uploadResponse.secure_url },
      /*By default, findOneAndUpdate() returns the document as it was before update was applied. 
      If you set new: true, findOneAndUpdate() will instead give you the object after update was applied. */
      { new: true }
      //means now we got updated user with pic attached
    );

    res.status(200).json(updatedUser); //here we then send updated user as response to frontend

  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//checkauth will return the user data if the user is authenticated
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//we needd checkauth whenever we refresh the page in frontend to know whether the user is logged in or not
//depending on that we will show homepage or login page in frontend
