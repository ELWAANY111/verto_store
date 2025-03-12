const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const nodemailer = require("nodemailer");

// إنشاء حساب تجريبي على Ethereal لاختبار البريد
nodemailer.createTestAccount().then((testAccount) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // استخدام TLS
    auth: {
      user: testAccount.user, // البريد التجريبي
      pass: testAccount.pass, // كلمة المرور التجريبية
    },
  });

  router.post("/", async (req, res) => {
    try {
      const { fullName, address, city, zipCode, phone, paymentMethod, cartItems } = req.body;
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // حفظ الطلب في قاعدة البيانات
      const newOrder = new Order({
        fullName,
        address,
        city,
        zipCode,
        phone,
        paymentMethod,
        cartItems,
        totalPrice,
      });
      await newOrder.save();

      // إرسال إشعار بالبريد الإلكتروني
      const mailOptions = {
        from: `"Store Admin" <${testAccount.user}>`,
        to: "admin-email@example.com", // استبدل هذا بإيميل المدير
        subject: "🚀 طلب جديد!",
        text: `طلب جديد من ${fullName}، المبلغ الإجمالي: ${totalPrice} جنيه.`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("📧 تم إرسال البريد:", nodemailer.getTestMessageUrl(info)); // رابط البريد التجريبي

      res.status(201).json({
        message: "✅ تم تقديم الطلب بنجاح!",
        emailPreview: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.error("❌ خطأ في إرسال الطلب:", error);
      res.status(500).json({ message: "حدث خطأ أثناء إرسال البريد الإلكتروني" });
    }
  });
});

module.exports = router;
