// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Use for navigation to the product details page

const ProductCard = ({ product }) => {
  return (
    <div className="product-card border rounded-lg p-4 shadow-md">
      <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/product/${product._id}`} className="text-blue-500 mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
