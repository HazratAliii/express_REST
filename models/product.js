const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImg: {
      type: String,
    },
    categories: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    price: {
      type: Number,
      // required: true,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new model("Product", productSchema);
module.exports = Product;
