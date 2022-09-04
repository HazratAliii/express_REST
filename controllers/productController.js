const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  const qCategory = req.query.category;
  const qColor = req.query.color;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        // colors: {
        //   $in: [qColor],
        // },
      });
    } 
    else {
      products = await Product.find();
    }
    res.status(202).json(products);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.getSingleProduct = async (req, res) => {
  const single = await Product.findOne({ _id: req.params.id });
  if (single) {
    res.status(202).json(single);
  } else {
    res.status(404).json({
      Err: "Product doesn't exist",
    });
  }
};

exports.createProduct = async (req, res) => {
  if (req.user.id === req.params.id && req.user.isAdmin) {
    try {
      const { category, productName, productImg, comments } = req.body;
      const newProd = new Product({
        category,
        productName,
        productImg,
        comments,
      });
      await newProd.save();
      res.status(202).json("product created");
    } catch (err) {
      console.log("crate product ", err);
    }
  }
};
exports.deleteProduct = async (req, res) => {
  if (req.user.id === req.params.id && req.user.isAdmin) {
    await Product.findByIdAndDelete(req.params.prodid);
    res.status(200).json({ Message: "Deleted" });
  } else {
    res.status(403).json({ err: "You don't have the permission" });
  }
};

exports.updateProduct = async (req, res) => {
  if (req.user.id === req.params.id && req.user.isAdmin) {
    await Product.findByIdAndUpdate(
      req.params.prodid,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ Message: "updated" });
  } else {
    res.status(403).json({ err: "You don't have the permission" });
  }
};
