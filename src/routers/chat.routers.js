import { Router } from "express";
import { chatHandler } from "../controllers/chat.controllers.js";

export const chatRouter = Router();

chatRouter.post("/chat/", chatHandler);
