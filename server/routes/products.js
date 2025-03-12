const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// إعداد multer لتخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValid =
      allowedTypes.test(file.mimetype) &&
      allowedTypes.test(path.extname(file.originalname).toLowerCase());
    isValid ? cb(null, true) : cb(new Error("Only .png, .jpg, and .jpeg formats allowed!"));
  },
});

// إضافة منتج جديد
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      description,
      priceBeforeDiscount,
      priceAfterDiscount,
      category,
      stock,
      brand,
      sizes,
      colors,
    } = req.body;

    if (!name || !description || !category || !priceBeforeDiscount || !priceAfterDiscount) {
      return res.status(400).json({ message: "All required fields must be provided!" });
    }

    const priceBefore = parseFloat(priceBeforeDiscount);
    const priceAfter = parseFloat(priceAfterDiscount);
    if (isNaN(priceBefore) || isNaN(priceAfter)) {
      return res.status(400).json({ message: "Price values must be numbers!" });
    }

    let stockData = [];
    if (stock) {
      try {
        stockData = JSON.parse(stock);
        if (!Array.isArray(stockData)) stockData = [];
      } catch {
        return res.status(400).json({ message: "Invalid stock format!" });
      }
    }

    const imagePaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];
    const sizeArray = sizes ? sizes.split(",").map(s => s.trim()) : [];
    const colorArray = colors ? colors.split(",").map(c => c.trim()) : [];

    const newProduct = new Product({
      name,
      description,
      priceBeforeDiscount: priceBefore,
      priceAfterDiscount: priceAfter,
      category,
      brand,
      stock: stockData,
      images: imagePaths,
      sizes: sizeArray,
      colors: colorArray,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// الحصول على جميع المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// الحصول على منتج واحد بواسطة المعرّف
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// حذف منتج
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // حذف الصور من السيرفر
    product.images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "..", imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error(`❌ Error deleting image ${imagePath}:`, err);
      });
    });

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully", deletedProduct: product });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// إضافة تقييم لمنتج
router.post("/:id/reviews", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = { user: "dummyUserId", rating, comment };
    product.reviews.push(review);
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("❌ Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
