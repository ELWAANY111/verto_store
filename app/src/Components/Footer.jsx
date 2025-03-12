import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'; // Importing Font Awesome icons

const Footer = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <footer className="bg-gray-300 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Language Selector */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button
              onClick={toggleLanguage}
              className="text-white border border-white px-4 py-2 rounded-md"
            >
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>

          {/* Footer Content */}
          <div className="text-center mt-4 md:mt-0">
            {language === "en" ? (
              <div className="text-sm">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="/about" className="text-white hover:text-gray-400">
                    About Us
                  </a>
                  <a href="/contact" className="text-white hover:text-gray-400">
                    Contact
                  </a>
                  <a href="/privacy" className="text-white hover:text-gray-400">
                    Privacy Policy
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <p>&copy; 2025 شركتك. جميع الحقوق محفوظة.</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="/about" className="text-white hover:text-gray-400">
                    من نحن
                  </a>
                  <a href="/contact" className="text-white hover:text-gray-400">
                    تواصل معنا
                  </a>
                  <a href="/privacy" className="text-white hover:text-gray-400">
                    سياسة الخصوصية
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://www.facebook.com/share/19pWpWKnDh/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white text-2xl hover:text-blue-600 transition duration-300" />
            </a>
            <a href="https://www.instagram.com/verto_store55?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl hover:text-pink-500 transition duration-300" />
            </a>
            <a href="https://www.tiktok.com/@varto.store?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="text-white text-2xl hover:text-black transition duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
