import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Log the Mongo URI for debugging (ensure it's not exposed in production)
    console.log("mongo_uri: ", process.env.MONGO_URI);

    // Use the MONGO_URI from the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
