import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ products }) => {
  return (
    <Carousel showArrows infiniteLoop autoPlay>
      {products.map((product) => (
        <div key={product.product_id}>
          <div
            className="product-item bg-light mb-4"
            style={{
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Your product item content goes here */}
            <div className="product-img position-relative overflow-hidden">
              <img
                className="img-fluid w-100 h-100"
                style={{ borderRadius: "10px" }}
                src={product.imageUrls[0]}
                alt={`Image3 0`}
              />
              {/* Add your product action buttons here */}
            </div>
            <div className="text-center py-4">
              {/* Add your product details here */}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
