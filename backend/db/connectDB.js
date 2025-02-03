import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("mongo_uri: ", process.env.MONGO_URI);
    const conn = await mongoose.connect(
      (MONGO_URI =
        "mongodb+srv://anujpaudel061:RJMFUvA8d5JtDAp3@cluster2.4tvbf.mongodb.net")
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
