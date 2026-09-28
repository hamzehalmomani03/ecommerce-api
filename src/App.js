const express = require("express");
const cors = require("cors");

const productsRoutes = require("./routes/productsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running"
  });
});

app.use("/api/products", productsRoutes);

module.exports = app;