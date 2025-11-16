import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      //here type is ObjectId because it references the User model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //reference to User model
      required: true,
    }, 
    receiverId: {
      //here type is ObjectId because it references the User model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
