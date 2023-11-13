import React, { useState, useEffect } from "react";
import CarouselComponent from "../layouts/CarouselComponent";
import CategoriesComponent from "../layouts/CategoriesComponent";
import ProductServices from "../services/ProductServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import WishListServices from "../services/WishListServices";
import CartServices from "../services/CartServices";
import PrescriptionBanner from "../layouts/PrescriptionBanner";
import Loading from "react-loading";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function HomeProduct(props) {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accountId, token } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setLoading(true); // Set loading to true to display the loading indicator

    // Simulate a 5-second delay before setting the products
    setTimeout(() => {
      ProductServices.getProducts()
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi tải sản phẩm:", error);
          setLoading(false);
        });
    }, 5000); // 5000 milliseconds = 5 seconds
  }, [accountId, token, history]);
  const addProductToCart = (product_id) => {
    CartServices.addToCart(accountId, product_id, 1, token)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
        updateCartItemCount();
      })
      .catch((error) => {
        toast.error("Please login to use this feature!");
        console.error("Error adding product to cart:", error);
      });
  };

  const updateCartItemCount = () => {
    CartServices.getNumberProductInCart(accountId, token)
      .then((res) => {
        setCartItemCount(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải số lượng sản phẩm trong giỏ hàng:", error);
      });
  };
  const addWishListProduct = (product_id) => {
    WishListServices.addToWishlist(accountId, product_id, token)
      .then((response) => {
        console.log("Product added to wishlist:", response.data);
        toast.success("Product added to wishlist successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };

  const viewProduct = (productId) => {
    props.history.push(`/detail-product/${productId}`);
  };

  return (
    <>
      <CarouselComponent />
      <CategoriesComponent />
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Loading type={"spin"} color={"#007bff"} height={50} width={50} />
          </div>
        ) : (
          <div className="row px-xl-5">
            {products.map((product) => (
              <div
                className="col-lg-2 col-md-2 col-sm-4 col-12 pb-1"
                key={product.product_id}
              >
                <div className="product-item bg-light mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100 h-100"
                      src={`assets/images/${product.imageUrls[0]}`}
                      alt={`Image3 0`}
                    />
                    <div className="product-action">
                      {product.type === 0 ? (
                        <>
                          <a
                            className="btn btn-outline-dark btn-square"
                            href
                            onClick={() => addProductToCart(product.productId)}
                          >
                            <i className="fa fa-shopping-cart" />
                          </a>
                          <a
                            className="btn btn-outline-dark btn-square"
                            href
                            onClick={() =>
                              addWishListProduct(product.productId)
                            }
                          >
                            <i className="far fa-heart" />
                          </a>
                        </>
                      ) : null}

                      <a
                        href
                        className="btn btn-outline-dark btn-square"
                        onClick={() => viewProduct(product.productId)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </a>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a
                      className="product-link h6 text-decoration-none text-truncate"
                      href="/product-url"
                      title={product.name}
                    >
                      {product.name}
                    </a>
                    <div className="product-star" style={{ color: "orange" }}>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>
                        ${product.price}
                        <span> / box</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <PrescriptionBanner />
      <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src="assets/img/offer-1.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="/" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src="assets/img/offer-2.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="/" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeProduct;
