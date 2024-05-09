import mongoose from "mongoose";

const DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.Database_Name,
    });
    console.log("The database connection has been established");
  } catch (err) {
    console.log(err);
  }
};

export default DB;
