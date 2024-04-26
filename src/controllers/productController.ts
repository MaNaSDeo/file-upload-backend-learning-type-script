import Product, { IProduct } from "../models/Product";
import { StatusCodes } from "http-status-codes";
import { type Response, type Request } from "express";

const createProduct = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProduct = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export { createProduct, getAllProduct };
