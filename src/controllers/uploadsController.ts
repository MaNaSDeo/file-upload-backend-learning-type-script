import { StatusCodes } from "http-status-codes";
import { type Response, type Request } from "express";

const uploadProductImage = async (req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send("Create Product");
};

export { uploadProductImage };
