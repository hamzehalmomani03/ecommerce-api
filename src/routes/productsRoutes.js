const express = require("express");

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deactivateProduct
} = require("../controllers/productsController");

const router = express.Router();

console.log("PRODUCT ROUTES LOADED");


// GET ALL PRODUCTS
router.get("/", getProducts);


// CREATE PRODUCT
router.post("/", createProduct);


// GET PRODUCT BY ID
router.get("/:id", getProductById);


// UPDATE PRODUCT
router.put("/:id", (req, res, next) => {
  console.log("PUT ROUTE MATCHED");
  next();
}, updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);


// DEACTIVATE PRODUCT
router.patch("/:id/deactivate", deactivateProduct);


module.exports = router;