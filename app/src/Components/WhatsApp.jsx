import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';  // Import both WhatsApp and Arrow icons

const WhatsAppButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappNumber = '2001008606414'; // Replace with the correct number including country code

  // Handle WhatsApp click
  const handleClick = () => {
    const isWhatsAppAvailable = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappLink = isWhatsAppAvailable
      ? `whatsapp://send?phone=${whatsappNumber}`
      : `https://wa.me/${whatsappNumber}`;
    window.location.href = whatsappLink;
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show scroll-to-top button when scrolled down
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
            {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-20 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transform transition-all duration-300 ease-in-out opacity-90 hover:opacity-100"
          style={{
            fontSize: '24px',
            zIndex: 1000,
          }}
        >
          <FaArrowUp />
        </button>
      )}
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6  right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
        style={{
          fontSize: '24px',
          zIndex: 1000
        }}
      >
        <FaWhatsapp />
      </button>


    </div>
  );
};

export default WhatsAppButton;
