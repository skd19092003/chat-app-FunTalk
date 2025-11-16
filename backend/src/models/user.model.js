import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {type: String, required: true,unique: true,},
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//user is the name of my model and its usingg userschema details for creating in database follwing this way
//mongoose want us to create captialized and singular not users but User.
const User = mongoose.model("User", userSchema);

export default User;
