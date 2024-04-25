import { StatusCodes } from "http-status-codes";
import { type Response, type Request } from "express";
import path from "path";

const uploadProductImage = async (req: Request, res: Response) => {
  if (req.files && req.files.image) {
    // const productImage = req.files.image;
    const productImage = Array.isArray(req.files.image)
      ? req.files.image[0]
      : req.files.image;

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

export { uploadProductImage };
