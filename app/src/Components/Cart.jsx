import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useCartStore } from "./cartStore";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  // حساب السعر الإجمالي باستخدام السعر بعد الخصم أو السعر العادي
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const price = item.priceAfterDiscount || item.price || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="p-5 max-w-xl mx-auto border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item._id}-${item.size || "no-size"}-${item.color || "no-color"}`}
              className="flex flex-col md:flex-row items-center justify-between mb-3 border-b pb-2"
            >
              <div className="flex items-center">
                <img
                  src={`http://localhost:5000${item.images[0]}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.priceAfterDiscount || item.price} x {item.quantity}
                  </p>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <button
                  onClick={() => updateQuantity(item._id, item.size, item.color, -1)}
                  className="px-2 py-1 bg-gray-300 rounded-md"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.size, item.color, 1)}
                  className="px-2 py-1 bg-gray-300 rounded-md"
                >
                  +
                </button>
              </div>
              <div className="mt-2 md:mt-0">
                <button
                  onClick={() => removeFromCart(item._id, item.size, item.color)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <p className="text-lg font-semibold mt-4">Total: ${getTotalPrice()}</p>
          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Checkout
          </button>
        </>
      )}

      {showCheckout && <CheckoutForm onClose={() => setShowCheckout(false)} />}
    </div>
  );
};

export default Cart;
