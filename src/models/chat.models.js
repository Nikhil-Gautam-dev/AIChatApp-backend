import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    _id: String,
    history: [],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("chat", chatSchema, "chats");
