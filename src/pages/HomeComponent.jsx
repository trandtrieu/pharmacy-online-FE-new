/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import CarouselComponent from "../layouts/CarouselComponent";
import CategoriesComponent from "../layouts/CategoriesComponent";
import ProductServices from "../services/ProductServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import PrescriptionBanner from "../layouts/PrescriptionBanner";
import Loading from "react-loading";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import FavouriteBrand from "../layouts/FavouriteBrand";
import FeatureCategory from "../layouts/FeatureCategory";
import addProductToCart, { convertDollarToVND } from "../utils/cartutils";
import addWishListProduct from "../utils/wishlistutils";
import { useCart } from "../CartProvider";
import Modal from "react-modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    transform: "translate(-40%, -10%)",
  },
};
function HomeProduct(props) {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accountId, token } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { updateCartItemCount } = useCart();
  const { updateWishlistItemCount } = useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    updateCartItemCount();
    updateWishlistItemCount();

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
    }, 1000);
  }, [accountId, token, history, updateCartItemCount, updateWishlistItemCount]);

  const fetchNextProducts = () => {
    const nextIndex = currentIndex + 5;
    ProductServices.getProducts(nextIndex)
      .then((res) => {
        const newProducts = res.data;
        setProducts(newProducts);
        setCurrentIndex(nextIndex);
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
      });
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleAddToCart = async (productId) => {
    console.log("accountId: " + accountId + "token" + token);
    if (!accountId || !token) {
      openModal();
      return;
    }

    try {
      await addProductToCart(accountId, productId, 1, token);
      await updateCartItemCount();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddtoWishlist = async (productId) => {
    if (!accountId || !token) {
      openModal();
      return;
    }
    try {
      await addWishListProduct(accountId, productId, token);
      await updateWishlistItemCount();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const viewProduct = (productId) => {
    props.history.push(`/detail-product/${productId}`);
  };

  const handleHealthServicesClick = () => {
    history.push("/healthService");
  };

  const handleOnlineCounselingClick = () => {
    this.toggleChatBubble();
  };

  return (
    <>
      {" "}
      <div className="cover-body">
        <CarouselComponent />
        <div className="container">
          <div className="row option-carousel">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-start justify-content-center">
              <div
                className="option-carousel-item text-center"
                style={{ position: "relative" }}
                onClick={handleHealthServicesClick}
              >
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/dat-lich-kham-online.webp"
                  alt=""
                  className="img-fluid"
                  onClick={handleHealthServicesClick}
                />
                <img
                  src="https://www.pharmacity.vn/images/new.gif"
                  alt=""
                  className="new-icon"
                />
                <h5 className="option-carousel-text mt-2">
                  <span>Health services</span>
                </h5>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center">
              <div className="option-carousel-item text-center">
                <Link to="/voucher">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/my-coupon.webp"
                    alt=""
                    className="img-fluid"
                  />
                </Link>

                <h5 className="option-carousel-text mt-2">
                  <span>Discount code</span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <CategoriesComponent />

        <div className="feature-products">
          <div className="fearture-products-part">
            <img
              src="https://nhathuoclongchau.com.vn/static/images/san-pham-ban-chay.svg"
              alt="FEATURE PRODUCTS"
            />
            <h2 className="css-aesnbd w-full pb-2 text-white">
              Feature Products
            </h2>
          </div>

          <div className="container-fluid pt-5 pb-3">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Loading
                  type={"spin"}
                  color={"#007bff"}
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <div className="cover-carousel">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="9000"
                >
                  <a
                    className="carousel-control-prev"
                    href="#productCarousel"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon "
                      aria-hidden="true"
                    ></span>
                    {/* <span className="sr-only">Previous</span> */}
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#productCarousel"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    {/* <span className="sr-only">Next</span> */}
                  </a>
                  <div className="carousel-inner">
                    {products
                      .slice(currentIndex, currentIndex + 6)
                      .map((product, index) => (
                        <div
                          className={`carousel-item${
                            index === 0 ? " active" : ""
                          }`}
                          key={product.product_id}
                        >
                          <div
                            className="row"
                            style={{ justifyContent: "space-around" }}
                          >
                            {products.slice(index, index + 6).map((product) => (
                              <div
                                className="col-lg-2 col-md-2 col-sm-4 col-6 col-12 pb-2"
                                key={product.product_id}
                              >
                                <div className="card product-item bg-light mb-4">
                                  <div className="product-img position-relative overflow-hidden">
                                    <img
                                      className="card-img-top img-fluid w-100 h-100"
                                      style={{ borderRadius: "10px" }}
                                      src={
                                        product.imageUrls[0]?.startsWith(
                                          "https"
                                        )
                                          ? product.imageUrls[0]
                                          : `assets/images/${product.imageUrls[0]}`
                                      }
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="card-body product-action">
                                    {product.type === 0 ? (
                                      <>
                                        <a
                                          className="btn btn-outline-dark btn-square"
                                          onClick={() =>
                                            handleAddToCart(product.productId)
                                          }
                                        >
                                          <i className="fa fa-shopping-cart" />
                                        </a>
                                      </>
                                    ) : null}
                                    <a
                                      className="btn btn-outline-dark btn-square"
                                      onClick={() =>
                                        handleAddtoWishlist(product.productId)
                                      }
                                    >
                                      <i className="far fa-heart" />
                                    </a>
                                    <a
                                      className="btn btn-outline-dark btn-square"
                                      onClick={() =>
                                        viewProduct(product.productId)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faCircleInfo} />
                                    </a>
                                  </div>
                                  <div className="text-center py-3">
                                    <a
                                      className="card-title product-link h6 text-decoration-none text-truncate"
                                      href="/product-url"
                                      title={product.name}
                                    >
                                      {product.name}
                                    </a>
                                    <div className="product-star">
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <div
                                      className="d-flex align-items-center justify-content-center mt-2"
                                      style={{ fontSize: "10px" }}
                                    >
                                      <h5 className="text-wrap">
                                        {convertDollarToVND(product.price)} VND
                                        {/* <span>/box</span> */}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <FavouriteBrand /> */}
        <FeatureCategory />
        <PrescriptionBanner />
        <div className="container-fluid pt-5 pb-3">
          <div className="row px-xl-5">
            <div className="col-md-6">
              <div className="product-offer mb-30" style={{ height: "300px" }}>
                <img
                  className="img-fluid"
                  src="assets/img/offer-1.jpg"
                  alt=""
                />
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
                <img
                  className="img-fluid"
                  src="assets/img/offer-2.jpg"
                  alt=""
                />
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
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        style={customStyles}
      >
        <p>Please log in to add products to the cart.</p>
        <button className="btn" onClick={closeModal}>
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/login")}
        >
          Go to Login
        </button>
      </Modal>
      {/* <ScrollToTop /> */}
    </>
  );
}

export default HomeProduct;
