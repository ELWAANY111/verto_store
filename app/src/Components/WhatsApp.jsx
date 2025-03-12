import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';  // Only importing WhatsApp icon

const WhatsAppButton = () => {
  const whatsappNumber = '2001008606414'; // Replace with the correct number including country code

  // Handle WhatsApp click
  const handleClick = () => {
    const isWhatsAppAvailable = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappLink = isWhatsAppAvailable
      ? `whatsapp://send?phone=${whatsappNumber}`
      : `https://wa.me/${whatsappNumber}`;
    window.location.href = whatsappLink;
  };

  return (
    <div>
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
        style={{
          fontSize: '30px', // Adjusted icon size
          zIndex: 1000
        }}
      >
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default WhatsAppButton;
