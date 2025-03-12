import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">منتجاتنا</h1>
      {/* شبكة الأعمدة تستخدم auto-fit لضبط عدد الأعمدة تلقائيًا */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(451px,1fr))]">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {/* حاوية الصورة بأبعاد ثابتة */}
            <div
              className="mx-auto overflow-hidden rounded-lg"
              style={{ width: "451px", height: "600px" }}
            >
              <img
                src={`http://localhost:5000${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-black mt-4">{product.name}</h2>
            <div className="mt-2">
              <p className="text-base text-gray-600">
                <span className="font-bold">السعر الأصلي:</span>{" "}
                <span className="line-through">{product.priceBeforeDiscount} جنيه</span>
              </p>
              <p className="text-lg font-bold text-black">
                <span className="font-bold">السعر بعد الخصم:</span>{" "}
                {product.priceAfterDiscount} جنيه
              </p>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              استفد من أفضل العروض والخصومات!
            </p>
            <Link
              to={`/product/${product._id}`}
              className="block text-center bg-black text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-gray-800 transition-colors"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
