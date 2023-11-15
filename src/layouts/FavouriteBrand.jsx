import CategoryServices from "../services/CategoryServices";
import { withRouter } from "react-router-dom";
import Loading from "react-loading";
import WishListServices from "../services/WishListServices";
import CartServices from "../services/CartServices";
import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import ProductServices from "../services/ProductServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import CarouselComponent from "../layouts/CarouselComponent";

class FavouriteBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFavor: [],
      loading: true,
      currentIndex: 0,
    };
    // this.state = {
    //   categories: [],
    // };
    this.viewProduct = this.viewProduct.bind(this);
  }

  fetchNextProducts = () => {
    const nextIndex = this.state.currentIndex + 5;
    ProductServices.getProducts(nextIndex)
      .then((res) => {
        const newProducts = res.data;
        this.setState({
          productsFavor: newProducts,
          currentIndex: nextIndex,
        });
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
      });
  };

  componentDidMount() {
    ProductServices.getProducts()
      .then((res) => {
        this.setState({ productsFavor: res.data, loading: false });
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
    const { productsFavor, loading } = this.state;
    return (
      <>
        <Fragment>
          <div className="container-fluid cover-category pt-5 ">
            <h2
              className="section-title position-relative text-uppercase mx-xl-5 mb-4"
              style={{ fontSize: "27px", paddingLeft: "2%" }}
            >
              <img
                loading="lazy"
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thuong_hieu_yeu_thich_e0c23dded6.png"
                alt=""
                style={{ paddingRight: "0.5%", paddingBottom: "3px" }}
              />
              <span className=" pr-3">Favorite Brand</span>
            </h2>
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
                <div className="cover-carousel cover-carousel-slide">
                  <div
                    id="productCarousel"
                    className="carousel slide"
                    data-ride="carousel"
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
                      data-interval="9000"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      {/* <span className="sr-only">Next</span> */}
                    </a>
                    <div className="carousel-inner">
                      {productsFavor
                        .slice(
                          this.state.currentIndex,
                          this.state.currentIndex + 4
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
                              {/* Card 1 */}
                              <div className="col-lg-3 col-md-2 col-sm-4 col-6 col-12 pb-2">
                                <div className="card product-item-favor bg-light mb-4">
                                  <div className="product-img position-relative overflow-hidden">
                                    <img
                                      className="card-img-top img-fluid w-100 h-100"
                                      style={{ borderRadius: "10px" }}
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/320x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Lab_Well_7d7b65040b.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>

                                  <div className="logo">
                                    <img
                                      className="img-fluid"
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/256x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="text-center card-title-bottom">
                                    <a
                                      className="card-title-favorite text-decoration-none text-truncate"
                                      href="/product-url"
                                    >
                                      22% off
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* Card 2 */}
                              <div className="col-lg-3 col-md-2 col-sm-4 col-6 col-12 pb-2">
                                <div className="card product-item-favor bg-light mb-4">
                                  <div className="product-img position-relative overflow-hidden">
                                    <img
                                      className="card-img-top img-fluid w-100 h-100"
                                      style={{ borderRadius: "10px" }}
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/320x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/HATRO_b9480cc72b.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>

                                  <div className="logo">
                                    <img
                                      className="img-fluid"
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/256x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/HATRO_1_183d7d948b.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="text-center card-title-bottom">
                                    <a
                                      className="card-title-favorite text-decoration-none text-truncate"
                                      href="/product-url"
                                    >
                                      Up to 22% off
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* Card 3*/}
                              <div className="col-lg-3 col-md-2 col-sm-4 col-6 col-12 pb-2">
                                <div className="card product-item-favor bg-light mb-4">
                                  <div className="product-img position-relative overflow-hidden">
                                    <img
                                      className="card-img-top img-fluid w-100 h-100"
                                      style={{ borderRadius: "10px" }}
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/320x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Vitamins_For_Life_6b559a384e.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>

                                  <div className="logo">
                                    <img
                                      className="img-fluid"
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Vitamins_For_Life_1_0783ec2683.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="text-center card-title-bottom">
                                    <a
                                      className="card-title-favorite text-decoration-none text-truncate"
                                      href="/product-url"
                                    >
                                      Up to 22% off
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* Card 4 */}
                              <div className="col-lg-3 col-md-2 col-sm-4 col-6 col-12 pb-2">
                                <div className="card product-item-favor bg-light mb-4">
                                  <div className="product-img position-relative overflow-hidden">
                                    <img
                                      className="card-img-top img-fluid w-100 h-100"
                                      style={{ borderRadius: "10px" }}
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/320x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Jpanwell_cec25727a0.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>

                                  <div className="logo">
                                    <img
                                      className="img-fluid"
                                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Jpanwell_2_81e568c17e.png"
                                      alt={`Image3 0`}
                                    />
                                  </div>
                                  <div className="text-center card-title-bottom">
                                    <a
                                      className="card-title-favorite text-decoration-none text-truncate"
                                      href="/product-url"
                                    >
                                      22% off now
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>

        {/* Categories End */}
      </>
    );
  }
}

export default withRouter(FavouriteBrand);
