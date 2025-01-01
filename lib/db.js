import mongoose from "mongoose";

const connectionToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected")
  } catch (error) {
    console.log(error);
  }
};

export default connectionToDatabase
