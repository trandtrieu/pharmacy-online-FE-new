import React, { Component, Fragment } from "react";
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
import { Bubble } from "@typebot.io/react";
import FavouriteBrand from "../layouts/FavouriteBrand";
import FeatureCategory from "../layouts/FeatureCategory";

class HomeProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      currentIndex: 0,
      showChatBubble: false,
    };
    this.viewProduct = this.viewProduct.bind(this);
    this.toggleChatBubble = this.toggleChatBubble.bind(this);
  }

  toggleChatBubble = () => {
    this.setState((prevState) => ({
      showChatBubble: !prevState.showChatBubble,
    }));
  };

  fetchNextProducts = () => {
    const nextIndex = this.state.currentIndex + 5;
    ProductServices.getProducts(nextIndex)
      .then((res) => {
        const newProducts = res.data;
        this.setState({
          products: newProducts,
          currentIndex: nextIndex,
        });
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
      });
  };

  componentDidMount() {
    // Khi component được mount, hiển thị Bubble ngay lập tức
    this.toggleChatBubble();

    ProductServices.getProducts()
      .then((res) => {
        this.setState({ products: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
        this.setState({ loading: false });
      });
  }

  addWishListProduct(product_id) {
    const accountId = 1;
    WishListServices.addToWishlist(accountId, product_id)
      .then((response) => {
        console.log("Product added to wishlist:", response.data);
        toast.success("Product added to wishlist successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  }
  addProductToCart(product_id) {
    const accountId = 1;
    CartServices.addToCart(accountId, product_id, 1)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }

  viewProduct = (productId) => {
    this.props.history.push(`/detail-product/${productId}`);
  };

  handleHealthServicesClick = () => {
    this.props.history.push("/healthService");
  };

  handleOnlineCounselingClick = () => {
    // Khi nút "Online counseling" được nhấp, hiển thị Bubble
    this.toggleChatBubble();
  };
  render() {
    const { products, loading, showChatBubble } = this.state;
    console.log("showChatBubble: ", showChatBubble);

    return (
      <Fragment>
        {showChatBubble && (
          <Bubble 
            typebot="customer-support-e4ekwgb"
            theme={{ button: { backgroundColor: "#598E71" } }}
          />
        )}

        <CarouselComponent />

        <div className="container">
          <div className="row option-carousel">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-start justify-content-center">
              <div
                className="option-carousel-item text-center"
                style={{ position: "relative" }}
                onClick={this.handleHealthServicesClick}
              >
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/dat-lich-kham-online.webp"
                  alt=""
                  className="img-fluid"
                />
                <img
                  src="https://www.pharmacity.vn/images/new.gif"
                  alt=""
                  className="new-icon"
                />
                <h5
                  className="option-carousel-text mt-2"
                  onClick={this.handleHealthServicesClick}
                >
                  <span>Health services</span>
                </h5>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center">
              <div className="option-carousel-item text-center">
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/lich-su-thanh-vien2.webp"
                  alt=""
                  className="img-fluid"
                />
                <h5 className="option-carousel-text mt-2">
                  <span> P-Coin Gold</span>
                </h5>
              </div>
            </div>

            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center"
              onClick={this.handleOnlineCounselingClick}
            >
              <div className="option-carousel-item text-center">
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/duoc-si-truc-tuyen-2.webp"
                  alt=""
                  className="img-fluid"
                />
                <h5 className="option-carousel-text mt-2">
                  <span>Online counseling</span>
                </h5>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center">
              <div className="option-carousel-item text-center">
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/home/homeservices/my-coupon.webp"
                  alt=""
                  className="img-fluid"
                />
                <h5 className="option-carousel-text mt-2">
                  <span>Discount code</span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <CategoriesComponent />
        {/* Products Start */}

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
                      .slice(
                        this.state.currentIndex,
                        this.state.currentIndex + 6
                      )
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
                                      src={product.imageUrls[0]}
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="card-body product-action">
                                    <a
                                      className="btn btn-outline-dark btn-square"
                                      href="#"
                                      onClick={() =>
                                        this.addProductToCart(product.productId)
                                      }
                                    >
                                      <i className="fa fa-shopping-cart" />
                                    </a>
                                    <a
                                      className="btn btn-outline-dark btn-square"
                                      href="#"
                                      onClick={() =>
                                        this.addWishListProduct(
                                          product.productId
                                        )
                                      }
                                    >
                                      <i className="far fa-heart" />
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-outline-dark btn-square"
                                      onClick={() =>
                                        this.viewProduct(product.productId)
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
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                      <h5 className="text-wrap">
                                        ${product.price}
                                        <span>/box</span>
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

        {/* Products End */}

        <FavouriteBrand />
        <FeatureCategory />
        {/* Offer Start */}
        <PrescriptionBanner />
        <div className="bg-offer container-fluid pt-5 pb-3">
          <div className="row px-xl-5">
            <div className="col-md-6">
              <div className="product-offer mb-30">
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
              <div className="product-offer mb-30">
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
        {/* Offer End */}
      </Fragment>
    );
  }
}

export default HomeProduct;
