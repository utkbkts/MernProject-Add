import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectToDatabase from "./utils/dbConnect.js";
import AuthRoutes from "./routes/authRoutes.js";
import PostRoutes from "./routes/postRoutes.js";
import errorMiddleware from "./middleware/error.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down server due to uncaught expection`);
  process.exit(1);
});
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
ConnectToDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running PORT:${process.env.PORT} in.`);
});

//app use routes start
app.use("/api", AuthRoutes);
app.use("/api", PostRoutes);
//app use routes end

//error middleware
app.use(errorMiddleware);

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
