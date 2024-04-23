import dotenv from "dotenv";
import "express-async-errors";
import express, { Request, Response } from "express";

// database
import connectDB from "./db/connect";

// error handler
// import notFoundMiddleware from "./middleware/not-found";
// import errorHandlerMiddleware from "./middleware/error-handler";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>File Upload Starter</h1>");
});

// middleware
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
