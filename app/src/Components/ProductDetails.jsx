import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useCartStore } from "./cartStore"; // تأكد من مسار الاستيراد الصحيح

// StarRating Component: for displaying stars (read-only)
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full${i}`} className="text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty${i}`} className="text-yellow-400" />);
  }
  return <div className="flex">{stars}</div>;
};

// InteractiveStarRating Component: lets the user set a rating by clicking on stars
const InteractiveStarRating = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => {
        const currentRating = hoverRating || rating;
        return (
          <span
            key={i}
            onClick={() => onRate(i + 1)}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            className="cursor-pointer text-2xl text-yellow-400"
          >
            {currentRating > i ? <FaStar /> : <FaRegStar />}
          </span>
        );
      })}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 1, comment: "" });
  const [error, setError] = useState(null);
  
  // استخدام الدالة المشتركة لإضافة المنتج إلى السلة
  const { addToCart } = useCartStore();

  // دالة لجلب تفاصيل المنتج (بما في ذلك التقييمات)
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) throw new Error("❌ فشل في جلب بيانات المنتج!");
      const data = await response.json();
      setProduct(data);
      setMainImage(data.images?.[0] || "/default-image.jpg");
      setReviews(data.reviews || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (error) return <h2 className="text-red-500">{error}</h2>;
  if (!product) return <h2>جاري تحميل المنتج...</h2>;

  // دالة إرسال التقييم
  const handleReviewSubmit = async () => {
    if (!newReview.comment) {
      alert("⚠️ يرجى كتابة تعليق!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      await response.json();
      await fetchProduct();
      setNewReview({ rating: 1, comment: "" });
      alert("✅ تم إضافة التقييم!");
    } catch (error) {
      alert("❌ حدث خطأ أثناء إرسال التقييم!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 gap-10">
      {/* عرض الصور */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
     <img
  src={`http://localhost:5000${mainImage}`}
  alt={product.name}
  className="w-full sm:h-full object-cover rounded-lg shadow-lg"
/>

        <div className="flex gap-2 mt-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img}`}
              alt={`Product ${index}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              } hover:border-blue-500`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>

        {/* الأسعار */}
        <div className="text-lg font-semibold">
          <span className="text-red-500">🔥 السعر بعد الخصم:</span> {product.priceAfterDiscount} EGP
        </div>
        <div className="text-sm text-gray-500 line-through">
          السعر قبل الخصم: {product.priceBeforeDiscount} EGP
        </div>

        {/* معلومات إضافية */}
        <div className="text-md">
          <p>
            <strong>الفئة:</strong> {product.category}
          </p>
          {product.brand && (
            <p>
              <strong>العلامة التجارية:</strong> {product.brand}
            </p>
          )}
          {product.stock && (
            <p>
              <strong>المخزون:</strong>{" "}
              {Array.isArray(product.stock)
                ? product.stock.map((item, idx) => (
                    <span key={idx}>
                      {item.size && `المقاس: ${item.size} `}
                      {item.color && `اللون: ${item.color} `}
                      الكمية: {item.quantity}
                      {idx < product.stock.length - 1 ? ", " : ""}
                    </span>
                  ))
                : product.stock}
            </p>
          )}
          {product.rating !== undefined && (
            <div className="flex items-center">
              <strong className="mr-2">التقييم:</strong>
              <StarRating rating={product.rating} />
              <span className="ml-2 text-sm text-gray-500">({product.rating.toFixed(1)})</span>
            </div>
          )}
        </div>

        {/* اختيار المقاس */}
        <div>
          <label className="block font-semibold mb-1">المقاس:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">اختر المقاس</option>
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* اختيار اللون */}
        <div>
          <label className="block font-semibold mb-1">اللون:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">اختر اللون</option>
            {product.colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* زر إضافة المنتج إلى السلة */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          onClick={() => {
            if (!selectedSize || !selectedColor) {
              alert("⚠️ يرجى اختيار المقاس واللون!");
              return;
            }
            addToCart(product, selectedSize, selectedColor);
            alert("✅ تم إضافة المنتج إلى السلة!");
          }}
        >
          🛒 أضف إلى السلة
        </button>

        {/* إضافة تقييم جديد */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold">أضف تقييمك</h3>
          <InteractiveStarRating
            rating={newReview.rating}
            onRate={(newRating) => setNewReview({ ...newReview, rating: newRating })}
          />
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="اكتب تعليقك..."
            className="border rounded-lg p-2 w-full mb-2 mt-2"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
            onClick={handleReviewSubmit}
          >
            📢 إرسال التقييم
          </button>
        </div>

        {/* عرض جميع التقييمات */}
        {reviews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">التقييمات</h3>
            {reviews.map((review, index) => (
              <div key={index} className="border p-2 rounded mt-2">
                <div className="flex items-center">
                  <strong className="mr-2">التقييم:</strong>
                  <StarRating rating={review.rating} />
                  <span className="ml-2 text-sm text-gray-500">({review.rating})</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
