import { StatusCodes } from "http-status-codes";
import { type Response, type Request } from "express";
import path from "path";
import CustomError from "../errors";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadProductImageLocal = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No Files Uploaded");
  }

  if (req.files && req.files.image) {
    const productImage = Array.isArray(req.files.image)
      ? req.files.image[0]
      : req.files.image;

    if (!productImage.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = Number(process.env.MAX_SIZE) || 1000000;
    if (productImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        `Please upload image smaller than ${maxSize / 1000}KB`
      );
    }
    if (
      productImage &&
      typeof productImage === "object" &&
      "name" in productImage &&
      "mv" in productImage
    ) {
      console.log("req.files from upload image", req.files);
      const imagePath = path.join(
        __dirname,
        "../public/uploads/" + `${productImage.name}`
      );
      await productImage.mv(imagePath);
      res.status(StatusCodes.CREATED).json({
        image: {
          src: `/uploads/${productImage.name}`,
        },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send("Invalid image upload");
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("No image uploaded");
  }
};

const uploadProductImage = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No Files Uploaded");
  }

  if (req.files && req.files.image) {
    const productImage = Array.isArray(req.files.image)
      ? req.files.image[0]
      : req.files.image;

    if (!productImage.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = Number(process.env.MAX_SIZE) || 1000000;
    if (productImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        `Please upload image smaller than ${maxSize / 1000}KB`
      );
    }

    const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
      use_filename: true,
      folder: "file-upload",
    });

    fs.unlinkSync(productImage.tempFilePath);

    res.status(StatusCodes.CREATED).json({
      image: {
        src: result.secure_url,
      },
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("No image uploaded");
  }
};

export { uploadProductImage };
