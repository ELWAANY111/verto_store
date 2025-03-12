import { useState } from "react";

export default function PaymentOptions({ formData, setFormData, includeCashOnDelivery }) {
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePaymentSelection = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleManualPayment = () => {
    alert("أرسل صورة إيصال الدفع إلى واتساب الأدمن بعد التحويل.");
    setPaymentDone(true);
  };

  const handleAutoPayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vodafone-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 100, phoneNumber: "010XXXXXXXX" }),
      });
      const data = await response.json();
      if (data.success) {
        alert("تم الدفع بنجاح ✅");
        setPaymentDone(true);
      } else {
        alert("فشل الدفع ❌");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-3">اختر طريقة الدفع</h2>

      {includeCashOnDelivery && (
        <label className="block mt-3">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={formData.paymentMethod === "cash"}
            onChange={() => handlePaymentSelection("cash")}
          />
          <span className="ml-2">الدفع عند الاستلام</span>
        </label>
      )}

      <label className="block mt-3">
        <input
          type="radio"
          name="payment"
          value="manual"
          checked={formData.paymentMethod === "manual"}
          onChange={() => handlePaymentSelection("manual")}
        />
        <span className="ml-2">دفع يدوي (InstaPay / Vodafone Cash)</span>
      </label>

      <label className="block mt-3">
        <input
          type="radio"
          name="payment"
          value="auto"
          checked={formData.paymentMethod === "auto"}
          onChange={() => handlePaymentSelection("auto")}
        />
        <span className="ml-2">دفع تلقائي عبر Vodafone Cash API</span>
      </label>

      {formData.paymentMethod === "manual" && (
        <div className="mt-4">
          <p>🔹 InstaPay: <b>010XXXXXXXX</b></p>
          <p>🔹 Vodafone Cash: <b>010XXXXXXXX</b></p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleManualPayment}
          >
            أتممت الدفع
          </button>
        </div>
      )}

      {formData.paymentMethod === "auto" && (
        <div className="mt-4">
          <button
            className="p-2 bg-green-500 text-white rounded"
            onClick={handleAutoPayment}
          >
            الدفع الآن
          </button>
        </div>
      )}

      {paymentDone && <p className="text-green-600 mt-3">تم الدفع بنجاح ✅</p>}
    </div>
  );
}
