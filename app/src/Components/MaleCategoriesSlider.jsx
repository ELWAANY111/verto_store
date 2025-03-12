import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MaleCategoriesSlider = () => {
  const categories = [
    { 
      name: "Clothes", 
      image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
    }, 
    { 
      name: "Perfumes", 
      image: "3348900838178_1.jpg" // Ensure this image is hosted or available locally
    }, 
    { 
      name: "Watches", 
      image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
    },
    { 
      name: "Rings", 
      image: "R15844M88BBO.webp" // Local or hosted image URL
    }, 
    { 
      name: "Sneakers", 
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
    },
    { 
      name: "Chains", 
      image: "s-l500.webp" // Local or hosted image URL
    },
    { 
      name: "Barcles", 
      image: "s-l500 (1).webp" // Local or hosted image URL
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,         // Automatically scroll the slides
    autoplaySpeed: 3000,    // 3 seconds per slide
    swipeToSlide: true,     // Allow swiping between slides
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-4 text-black">Categories</h2>
      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div key={index} className="px-2">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-white group">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay with lighter effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
              {/* Text overlay */}
              <div className="absolute bottom-0 w-full text-center py-4">
                <h3 className="text-2xl font-semibold text-white">{cat.name}</h3>
              </div>

              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                <span className="text-3xl font-bold">Coming Soon!</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MaleCategoriesSlider;
