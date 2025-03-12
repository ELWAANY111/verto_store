import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search, Plus, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "./cartStore"; // تأكد من صحة المسار

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);

  // حساب إجمالي العناصر في السلة (بناءً على الكمية)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>   
      {/* شريط العروض */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black text-center py-2 text-sm font-bold animate-pulse">
        🚚 شحن مجاني للطلبات فوق 1499 جنيه! لا تفوّت الفرصة ✨
      </div>
 
      {/* شريط التنقل الرئيسي */}
      <header className="w-full flex items-center justify-between px-6 py-3 shadow-lg bg-gradient-to-r from-[#111111] to-black text-white relative rounded-b-lg">
        {/* زر القائمة للهواتف */}
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden p-3 bg-[#222222] rounded-full text-white hover:bg-[#333333] transition"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
          <Link to="/" className="text-2xl font-bold text-[#FFD700]">
            <img src="/1741376508341.png" alt="Logo" className="w-40 h-40 object-contain" />
          </Link>
        </div>

        {/* روابط التنقل للكمبيوتر */}
        <nav className="hidden md:flex space-x-10">
          <Link to="/" className="hover:text-[#FFD700] text-lg transition">الرئيسية</Link>
          <Link to="/shop" className="hover:text-[#FFD700] text-lg transition">المتجر</Link>
          <Link to="/Identity" className="hover:text-[#FFD700] text-lg transition">من نحن</Link>
          <Link to="/contact" className="hover:text-[#FFD700] text-lg transition">اتصل بنا</Link>
        </nav>

        {/* شريط البحث */}
        <div className="relative flex items-center border border-[#B8860B] rounded-lg overflow-hidden w-48 md:w-72 bg-[#222222]">
          <input
            type="text"
            placeholder="ابحث..."
            className="w-full bg-[#222222] text-white outline-none p-3 text-base placeholder-gray-400"
          />
          <button className="p-3 bg-[#444444] text-white hover:bg-[#FFD700] hover:text-black transition">
            <Search size={24} />
          </button>
        </div>

        {/* أيقونات إضافية */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/DashBoard")}
            className="p-3 bg-[#FFD700] text-black rounded-full shadow-md hover:bg-[#B8860B] transition"
          >
            <Plus size={24} />
          </button>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-8 h-8 text-white hover:text-[#FFD700] transition" />
            {cartCount > 0 && (
              <span className="absolute top-[-6px] right-[-8px] w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* العنوان الجديد */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black text-center py-3 text-lg font-bold animate-bounce">
        🌞 الكوليكشن الصيفي متاح الآن! احصل على أحدث الصيحات 🌴🛍️
      </div>

      {/* القائمة الجانبية للهواتف مع انتقال سلسي */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 transform transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`absolute left-0 top-0 w-64 bg-[#222222] h-auto p-5 shadow-lg rounded-br-2xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button 
            className="absolute top-4 right-4 p-2 text-white hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col space-y-6 mt-10 text-white text-lg">
            <Link to="/" className="hover:text-[#FFD700] transition" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link to="/shop" className="hover:text-[#FFD700] transition" onClick={() => setMenuOpen(false)}>المتجر</Link>
            <Link to="/Identity" className="hover:text-[#FFD700] transition" onClick={() => setMenuOpen(false)}>من نحن</Link>
            <Link to="/contact" className="hover:text-[#FFD700] transition" onClick={() => setMenuOpen(false)}>اتصل بنا</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
