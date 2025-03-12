import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you could send data to your server here)
    console.log("❌ حدث خطأ أثناء الارسال تواصل عن طريق الواتس!", formData);
    alert("❌ حدث خطأ أثناء الارسال تواصل عن طريق الواتس!");
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">تواصل معنا</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* نموذج الاتصال */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">أرسل لنا رسالة</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="اسمك الكامل"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-4"
              required
            />
            <textarea
              name="message"
              placeholder="اكتب رسالتك هنا"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-4"
              rows="4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* الخريطة */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">موقعنا</h2>
          <div className="h-72">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237232.28473539888!2d31.2357!3d30.0444"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
