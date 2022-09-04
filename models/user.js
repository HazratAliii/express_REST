const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    products: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = new model("User", userSchema);
module.exports = User;
