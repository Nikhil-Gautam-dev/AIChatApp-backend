import app from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const genAImodel = genAI.getGenerativeModel({ model: "gemini-pro" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app listening on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log(
      `something went wrong while estabilishing app due to following error\n`,
      err
    );
  });

export { genAImodel };
