const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/usersRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ecommerce API is running"
  });
});


// API Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});