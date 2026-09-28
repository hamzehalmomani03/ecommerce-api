const express = require("express");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoriesController");

const router = express.Router();


// GET ALL CATEGORIES
router.get("/", getCategories);


// CREATE CATEGORY
router.post("/", createCategory);


// GET CATEGORY BY ID
router.get("/:id", getCategoryById);


// UPDATE CATEGORY
router.put("/:id", updateCategory);


// DELETE CATEGORY
router.delete("/:id", deleteCategory);


module.exports = router;