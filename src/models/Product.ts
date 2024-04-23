import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
} // Interface for the Product document
//  This defines an interface called IProduct that extends the Document interface from Mongoose. It specifies the shape of the Product document, including the properties name, price, and image...

const ProductSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}); // Product schema
// const ProductSchema: Schema<IProduct> = new Schema({ ... });: This creates a new Schema object called ProductSchema and defines the structure of the Product document. The Schema type is parameterized with the IProduct interface, ensuring that the schema matches the defined interface.

interface IProductModel extends Model<IProduct> {}

const ProductModel: IProductModel = mongoose.model<IProduct, IProductModel>(
  "Product",
  ProductSchema
); // Create the Product model from the schema

export default ProductModel;
