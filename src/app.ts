import dotenv from "dotenv";
import "express-async-errors";
import express, { type Request, type Response } from "express";
import path from "path";

// database
import connectDB from "./db/connect";

// error handler
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";

dotenv.config();

const app = express();

import fileUpload from "express-fileupload";

// Router
import productRouter from "./routes/productRoutes";

app.use(express.static("./public")); // serves static files from the public directory at the root path (/)
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads"))); // tells Express to serve static files from the uploads directory, which is assumed to be inside the public directory
/*
 * path.join(__dirname, "public", "uploads") constructs the absolute path to the uploads directory by joining the current directory (__dirname), public, and uploads. This is necessary because the express.static() middleware requires an absolute path.
 * express.static(path.join(__dirname, "public", "uploads")) creates a new instance of the express.static() middleware, configured to serve files from the uploads directory.
 * "/uploads" is the URL path prefix for files in the uploads directory. This means that files in the uploads directory will be accessible at http://localhost:5000/uploads/filename.ext.
 * app.use() mounts the express.static() middleware at the /uploads path.
 */
app.use(express.json());
app.use(fileUpload());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
