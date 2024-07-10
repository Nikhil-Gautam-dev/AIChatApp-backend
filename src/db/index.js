import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri =
      process.env.DATABASE_URI +
      process.env.DB_NAME +
      process.env.DATABASE_URI_OPTIONS;
    const _ = await mongoose.connect(uri, {
      writeConcern: { w: "majority" },
    });

    console.log("mongodb connected :)");
  } catch (error) {
    console.log("connection not estabilished due to following error\n", error);
  }
};
