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
module.exports.handler = serverless(app);
