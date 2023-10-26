import React, { Component } from "react";
import ProductServices from "../services/ProductServices";
import CartServices from "../services/CartServices";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import WishListServices from "../services/WishListServices";

class DetailProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.match.params.productId,
      product: {},
      products: [],
      imageUrls: [],
    };
  }

  componentDidMount() {
    ProductServices.getProductById(this.state.productId).then((res) => {
      const productData = res.data;
      const imageUrls = productData.imageUrls || []; // Replace 'imageUrls' with the correct field from your API data
      this.setState({ product: productData, imageUrls });
    });

    ProductServices.get5ProductsRandom()
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }
  addProductToCart(product_id) {
    const accountId = 1; // Replace with the actual account ID
    CartServices.addToCart(accountId, product_id, 1)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }
  addWishListProduct(product_id) {
    const accountId = 1; // Replace with the actual account ID
    WishListServices.addToWishlist(accountId, product_id)
      .then((response) => {
        console.log("Product added to wishlist:", response.data);
        toast.success("Product added to wishlist successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  }

  render() {
    return (
      <>
        {/* Shop Detail Start */}
        <div className="container-fluid pb-5">
          <div className="row px-xl-5">
            <div className="col-lg-4 mb-30">
              <div
                id="product-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner bg-light">
                  {this.state.imageUrls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        className="w-100 h-100"
                        src={`../assets/images/${imageUrl}`}
                        alt={`Imagee ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#product-carousel"
                  data-slide="prev"
                >
                  <i className="fa fa-2x fa-angle-left text-dark" />
                </a>
                <a
                  className="carousel-control-next"
                  href="#product-carousel"
                  data-slide="next"
                >
                  <i className="fa fa-2x fa-angle-right text-dark" />
                </a>
              </div>
            </div>

            <div className="col-lg-8 bg-light pt-3">
              <div className="ps-lg-3">
                <p className="">Brand: {this.state.product.brand}</p>

                <h4 className="title text-dark">{this.state.product.name}</h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1" />
                    {this.state.product.quantity}
                  </span>
                  <span className="text-success ms-2"> In stock</span>
                </div>
                <div className="mb-3">
                  <span className="h2">${this.state.product.price}</span>
                  <span className="text-muted">/per box</span>
                </div>
                <p>
                  Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men.
                </p>
                <div className="row">
                  <dt className="col-3">Category:</dt>
                  <dd className="col-9">{this.state.product.category_name}</dd>
                  <dt className="col-3">Made In</dt>
                  <dd className="col-9">{this.state.product.madeIn}</dd>
                  <dt className="col-3">Ingredients</dt>
                  <dd className="col-9">{this.state.product.ingredients}</dd>
                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">Reebook</dd>
                </div>
                <hr />
                <div className="d-flex flex-column align-items-start mb-4 pt-2">
                  <div
                    className="input-group quantity mb-3"
                    style={{ width: "130px" }}
                  >
                    <div className="input-group-btn">
                      <button className="btn btn-primary btn-minus">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control bg-secondary border-0 text-center"
                      defaultValue={1}
                    />
                    <div className="input-group-btn">
                      <button className="btn btn-primary btn-plus">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <button
                      className="btn btn-primary px-3 mb-3"
                      onClick={() =>
                        this.addProductToCart(this.state.product.productId)
                      }
                    >
                      <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                    </button>
                    <button
                      className="btn btn-primary px-3"
                      onClick={() =>
                        this.addWishListProduct(this.state.product.productId)
                      }
                    >
                      <FontAwesomeIcon icon={faHeart} /> Add To Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-xl-5 mt-5">
            <div className="col-lg-8">
              <div className="bg-light p-30">
                <div className="nav nav-tabs mb-4">
                  <a
                    className="nav-item nav-link text-dark active"
                    data-toggle="tab"
                    href="#tab-pane-1"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link text-dark"
                    data-toggle="tab"
                    href="#tab-pane-2"
                  >
                    Information
                  </a>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <h4 className="mb-3">Product Description</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <p>
                      Dolore magna est eirmod sanctus dolor, amet diam et eirmod
                      et ipsum. Amet dolore tempor consetetur sed lorem dolor
                      sit lorem tempor. Gubergren amet amet labore sadipscing
                      clita clita diam clita. Sea amet et sed ipsum lorem elitr
                      et, amet et labore voluptua sit rebum. Ea erat sed et diam
                      takimata sed justo. Magna takimata justo et amet magna et.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-2">
                    <h4 className="mb-3">Additional Information</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.
                          </li>
                          <li className="list-group-item px-0">
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.
                          </li>
                          <li className="list-group-item px-0">
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.
                          </li>
                          <li className="list-group-item px-0">
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.
                          </li>
                          <li className="list-group-item px-0">
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.
                          </li>
                          <li className="list-group-item px-0">
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.
                          </li>
                          <li className="list-group-item px-0">
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Similar items</h5>
                    {this.state.products.map((product) => (
                      <div className="d-flex mb-3" key={product.product_id}>
                        <a href="/" className="me-3">
                          <img
                            className="img-md img-thumbnail"
                            src={`../assets/images/${product.imageUrls[0]}`}
                            alt={`Imagee 0`}
                            style={{ minWidth: "96px", height: "96px" }}
                          />
                        </a>
                        <div className="info ml-3">
                          <p>{this.state.product.name}</p>
                          <strong className="text-dark"> $38.90</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shop Detail End */}
      </>
    );
  }
}

export default DetailProductComponent;
