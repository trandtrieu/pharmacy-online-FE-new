import React, { Component } from "react";
import CarouselComponent from "../layouts/CarouselComponent";
import CategoriesComponent from "../layouts/CategoriesComponent";
import ProductServices from "../services/ProductServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import WishListServices from "../services/WishListServices";
import CartServices from "../services/CartServices";

class HomeProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    ProductServices.getProducts()
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }

  addWishListProduct(product_id) {
    const accountId = 4; // Replace with the actual account ID
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
    const accountId = 4; // Replace with the actual account ID
    CartServices.addToCart(accountId, product_id, 1)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }

  viewProduct(productId) {
    this.props.history.push(`/detail-product/${productId}`);
  }

  render() {
    return (
      <>
        <CarouselComponent />
        <CategoriesComponent />
        {/* Products Start */}
        <div className="container-fluid pt-5 pb-3">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Featured Products</span>
          </h2>
          <div className="row px-xl-5">
            {this.state.products.map((product) => (
              <div className="col-lg-2 col-md-2 col-sm-6 pb-1">
                <div
                  className="product-item bg-light mb-4"
                  key={product.product_id}
                >
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={`assets/images/${product.imageUrls[0]}`}
                      alt={`Imagee 0`}
                    />
                    <div className="product-action">
                      <a
                        className="btn btn-outline-dark btn-square"
                        href
                        onClick={() => this.addProductToCart(product.productId)}
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
                        className="btn btn-outline-dark btn-square"
                        href
                        onClick={() => this.viewProduct(product.productId)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />{" "}
                      </a>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a className="h6 text-decoration-none text-truncate" href>
                      {product.name}
                    </a>
                    <a className="h6 text-decoration-none text-truncate" href>
                      {product.createdDate}
                    </a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${product.price}</h5>
                      <h6 className="text-muted ml-2">
                        <del>${product.price}</del>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Products End */}
        {/* Offer Start */}
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
                  <a href className="btn btn-primary">
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
                  <a href className="btn btn-primary">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Offer End */}
      </>
    );
  }
}

export default HomeProduct;
