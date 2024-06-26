import mongoose from "mongoose";

const ConnectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default ConnectToDatabase;
