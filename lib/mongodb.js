import mongoose from "mongoose";

const connectionString = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ac-efztajh-shard-00-00.euccwzi.mongodb.net:27017,ac-efztajh-shard-00-01.euccwzi.mongodb.net:27017,ac-efztajh-shard-00-02.euccwzi.mongodb.net:27017/?ssl=true&replicaSet=atlas-dqto9t-shard-0&authSource=admin&appName=Cluster0`;

// const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectToDatabase = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    console.log("---- Connecting to MongoDB ----");
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectToDatabase;
