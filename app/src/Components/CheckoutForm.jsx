import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PaymentOptions from "./PaymentOptions";

const mapContainerStyle = { width: "100%", height: "250px" }; // Adjusted map height
const defaultCenter = { lat: 30.0444, lng: 31.2357 }; // Cairo as default location

const CheckoutForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "cash",
    location: defaultCenter,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update location on map click
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData({ ...formData, location: e.latlng });
      },
    });
    return <Marker position={formData.location} />;
  };

  // Auto-detect user's location (if allowed)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        () => console.log("Location access denied.")
      );
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping details:", formData);
    alert("✅ Order confirmed successfully!");
    localStorage.removeItem("cart"); // Clear cart after order
    onClose(); // Close the form
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full overflow-auto" style={{ maxHeight: "90vh" }}>
        <h2 className="text-xl font-bold mb-4 text-center">📦 تفاصيل الشحن</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="الاسم الكامل"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="العنوان"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="المدينة"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="الرمز البريدي"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          
          <h3 className="text-lg font-semibold mt-4 mb-2">اختر طريقة الدفع</h3>
          <PaymentOptions formData={formData} setFormData={setFormData} includeCashOnDelivery={true} />
          
          <h3 className="text-lg font-semibold mt-4 mb-2">📍 اختر موقعك:</h3>
          <MapContainer
            center={formData.location}
            zoom={14}
            style={mapContainerStyle}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>

          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            تأكيد الطلب
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
