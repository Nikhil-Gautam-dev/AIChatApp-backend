import { Chat } from "../models/chat.models.js";
import { asyncHandler } from "../utils/asyncHandler.uitls.js";
import { genAImodel } from "../index.js";
import mongoose from "mongoose";

const sendMessage = async (msg, history) => {
  try {
    const chatInstance = genAImodel.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const defaultPromt =
      "\n note1: show response without any styling(html,astricks,special characters).\n note2: always ask question if you have any doubt with the understanding of the context before responding and don't ever try to inferred just from the previous responses.";

    const result = await chatInstance.sendMessage(msg + defaultPromt);
    const response = await result.response;
    const text = await response.text();

    return { resonseText: text, history: chatInstance._history };
  } catch (error) {
    console.log(error);
    return { resonseText: null, history: null };
  }
};

const chatHandler = asyncHandler(async (req, res) => {
  try {
    let id = req.query.id || "";
    const msg = req.body.msg;

    if (!msg) {
      return res.status(401).json({ message: "msg field is required!" });
    }

    const chat = await Chat.findOne({ _id: id });

    const { resonseText, history } = await sendMessage(msg, chat?.history);

    if (!resonseText || !history) {
      return res
        .status(500)
        .json({ message: "something went wrong with model response" });
    }

    if (!chat) {
      id = new mongoose.Types.ObjectId().toString();
      await Chat.create({
        _id: id,
        history: history,
      });
    } else {
      await Chat.findByIdAndUpdate(id, {
        $set: {
          history: history,
        },
      });
    }

    const newChat = await Chat.findOne({ _id: id });

    return res.status(200).json({
      message: "success",
      data: { id: newChat._id, text: resonseText },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
});

export { chatHandler };
