const router = require("express").Router();
const verify = require("../verify");

const {
  getAllProducts,
  getSingleProduct,
  // getPorductByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
// router.get("/:cat", getPorductByCategory); //Doesn't work
router.post("/createprod/:id", verify, createProduct);
router.delete("/:id/:prodid", verify, deleteProduct);
router.put("/:id/:prodid", verify, updateProduct);

module.exports = router;
