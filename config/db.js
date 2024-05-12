import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://basoafriza:1234567890@cluster0.aiuejbt.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connection"));
};
