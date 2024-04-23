import Product, { IProduct } from "../models/Product";
import { StatusCodes } from "http-status-codes";
import { type Response, type Request } from "express";

const createProduct = async (req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send("Create Product");
};

const getAllProduct = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send("Create Product");
};

export { createProduct, getAllProduct };
