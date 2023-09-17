import mongoose from "mongoose";

const DB_URI = "mongodb://127.0.0.1:27017/merndb";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(">>> database-connectDB esta conectado");
  } catch (error) {
    console.error("TENES UN ERROR EN DATA-BASE", error);
  }
};
