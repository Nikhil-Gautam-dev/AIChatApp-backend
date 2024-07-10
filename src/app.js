import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = Express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  Express.json({
    limit: "16kb",
  })
);

app.use(
  Express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

import { chatRouter } from "./routers/chat.routers.js";

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ message: "true" });
});

app.use("/api/v1/", chatRouter);

export default app;
