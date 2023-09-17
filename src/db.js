import mongoose from "mongoose";

const DB_URI =
  "mongodb+srv://martinlozanomu:H0NgLAVgMmX6fixz@cluster-growgreen.ppohkyt.mongodb.net/";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(">>> database-connectDB esta conectado");
  } catch (error) {
    console.error("TENES UN ERROR EN DATA-BASE", error);
  }
};

// local = "mongodb://127.0.0.1:27017/merndb"
