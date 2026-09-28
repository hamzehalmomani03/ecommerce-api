const pool = require("../config/database");

// GET ALL CATEGORIES
async function getCategories(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        description,
        is_active,
        created_at
      FROM categories
      ORDER BY id ASC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories"
    });
  }
}


// GET CATEGORY BY ID
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        description,
        is_active,
        created_at
      FROM categories
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error("GET CATEGORY BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve category"
    });
  }
}


// CREATE CATEGORY
async function createCategory(req, res) {
  try {
    const {
      name,
      description
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO categories
      (
        name,
        description
      )
      VALUES ($1, $2)
      RETURNING
        id,
        name,
        description,
        is_active,
        created_at
      `,
      [
        name,
        description
      ]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create category"
    });
  }
}


// UPDATE CATEGORY
async function updateCategory(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      description
    } = req.body;

    const result = await pool.query(
      `
      UPDATE categories
      SET
        name = $1,
        description = $2
      WHERE id = $3
      RETURNING
        id,
        name,
        description,
        is_active,
        created_at
      `,
      [
        name,
        description,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update category"
    });
  }
}


// DELETE CATEGORY
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM categories
      WHERE id = $1
      RETURNING
        id,
        name,
        description,
        is_active,
        created_at
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category"
    });
  }
}


module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};