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
import Loading from "react-loading"; // Import the Loading component
import { Bubble } from "@typebot.io/react";

class HomeProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
    this.viewProduct = this.viewProduct.bind(this);
  }

  componentDidMount() {
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

  render() {
    const { products, loading } = this.state;

    return (
      <Fragment>
        <Bubble
          typebot="customer-support-e4ekwgb"
          theme={{ button: { backgroundColor: "#598E71" } }}
        />
        <CarouselComponent />
        <CategoriesComponent />
        {/* Products Start */}
        <div className="container-fluid pt-5 pb-3">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Featured Products</span>
          </h2>

          {loading ? (
            -(
              <div className="d-flex justify-content-center">
                <Loading
                  type={"spin"}
                  color={"#007bff"}
                  height={50}
                  width={50}
                />
                <h1>hello</h1>
              </div>
            )
          ) : (
            <div className="row px-xl-5">
              {products.map((product) => (
                <div
                  className="col-lg-2 col-md-2 col-sm-4 col-12 pb-1"
                  key={product.product_id}
                >
                  <div className="product-item bg-light mb-4">
                    <div
                      className="product-img position-relative overflow-hidden"
                      // style={{ height: "230px" }}
                    >
                      <img
                        className="img-fluid w-100 h-100"
                        src={`assets/images/${product.imageUrls[0]}`}
                        alt={`Image3 0`}
                      />
                      <div className="product-action">
                        <a
                          className="btn btn-outline-dark btn-square"
                          href
                          onClick={() =>
                            this.addProductToCart(product.productId)
                          }
                        >
                          <i className="fa fa-shopping-cart" />
                        </a>
                        <a
                          className="btn btn-outline-dark btn-square"
                          href
                          onClick={() =>
                            this.addWishListProduct(product.productId)
                          }
                        >
                          <i className="far fa-heart" />
                        </a>
                        <a
                          href
                          className="btn btn-outline-dark btn-square"
                          onClick={() => this.viewProduct(product.productId)}
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

        {/* Products End */}
        {/* Offer Start */}
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
        {/* Offer End */}
      </Fragment>
    );
  }
}

export default HomeProduct;
