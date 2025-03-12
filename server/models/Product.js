const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  priceBeforeDiscount: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  images: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] },
  stock: { type: [{ size: String, color: String, quantity: Number }], default: [] },
  reviews: { type: [reviewSchema], default: [] },
  rating: { type: Number, default: 0 },
});

// دالة لتحديث التقييم العام بناءً على التقييمات
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
  } else {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
  }
  return this.rating;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
