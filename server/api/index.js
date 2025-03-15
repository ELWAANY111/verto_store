<<<<<<< HEAD
// api/index.js
const serverless = require("serverless-http");
const express = require("express");

const app = express();

// Optional: Configure middleware
app.use(express.json());

// Example: Create a simple GET endpoint
app.get("/api/products", async (req, res) => {
  try {
    // Replace this with your logic to get products from a database
    res.status(200).json({ message: "Hello from Express on Vercel!" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// You can add more endpoints as needed, e.g.:
// app.post("/api/products", async (req, res) => { /* ... */ });

// Wrap your Express app using serverless-http and export the handler
=======
// ملف: api/index.js
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const productRoutes = require("../routes/products");

dotenv.config();
const app = express();

// ميدل وير
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// توصيل قاعدة البيانات
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// استخدام الراوترات
app.use("/api/products", productRoutes);

// بدلاً من app.listen(...)، نصدر المعالج ليعمل كـ serverless function
>>>>>>> 80e809f (Initial commit)
module.exports.handler = serverless(app);
