import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI!,
      {
        dbName: "webdev-compiler",
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to database");
  }
};
