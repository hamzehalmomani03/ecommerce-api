const pool = require("../config/database");


// GET ALL PRODUCTS
async function getProducts(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      FROM products
      ORDER BY id DESC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products"
    });
  }
}


// CREATE PRODUCT
async function createProduct(req, res) {
  try {
    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku
    } = req.body;

    // VALIDATION

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }

    if (price === undefined || price === null || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0"
      });
    }

    if (
      stock_quantity === undefined ||
      stock_quantity === null ||
      Number(stock_quantity) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO products
      (
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      `,
      [
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
}


// GET PRODUCT BY ID
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      FROM products
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product"
    });
  }
}


// UPDATE PRODUCT
async function updateProduct(req, res) {
  console.log("PUT REQUEST REACHED");

  try {
    const { id } = req.params;

    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku
    } = req.body;

    // VALIDATION

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }

    if (price === undefined || price === null || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0"
      });
    }

    if (
      stock_quantity === undefined ||
      stock_quantity === null ||
      Number(stock_quantity) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const result = await pool.query(
      `
      UPDATE products
      SET
        category_id = $1,
        name = $2,
        description = $3,
        price = $4,
        stock_quantity = $5,
        sku = $6
      WHERE id = $7
      RETURNING
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      `,
      [
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
}


// DELETE PRODUCT
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product"
    });
  }
}


// DEACTIVATE PRODUCT
async function deactivateProduct(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE products
      SET is_active = false
      WHERE id = $1
      RETURNING
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("DEACTIVATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate product"
    });
  }
}


// EXPORT FUNCTIONS
module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deactivateProduct
};