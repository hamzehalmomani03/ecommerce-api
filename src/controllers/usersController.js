const pool = require("../config/database");


// GET ALL USERS
async function getUsers(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      FROM users
      ORDER BY id ASC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve users"
    });
  }
}


// GET USER BY ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve user"
    });
  }
}


// CREATE USER
async function createUser(req, res) {
  try {
    const {
      full_name,
      email,
      phone,
      password_hash,
      role
    } = req.body;


    // VALIDATION
    if (!full_name || !email || !phone || !password_hash || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    const result = await pool.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        phone,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `,
      [
        full_name,
        email,
        phone,
        password_hash,
        role
      ]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    // Duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
}


// UPDATE USER
async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const {
      full_name,
      email,
      phone,
      role
    } = req.body;


    // VALIDATION
    if (!full_name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    const result = await pool.query(
      `
      UPDATE users
      SET
        full_name = $1,
        email = $2,
        phone = $3,
        role = $4
      WHERE id = $5
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `,
      [
        full_name,
        email,
        phone,
        role,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    // Duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
}


// DELETE USER
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
}


// EXPORT FUNCTIONS
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};