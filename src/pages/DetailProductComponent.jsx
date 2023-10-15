import React, { Component } from "react";
import ProductServices from "../services/ProductServices";
import CartServices from "../services/CartServices";
import { toast } from "react-toastify";

class DetailProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.match.params.productId,
      product: {},
      imageUrls: [],
    };
  }

  componentDidMount() {
    ProductServices.getProductById(this.state.productId).then((res) => {
      const productData = res.data;
      const imageUrls = productData.imageUrls || []; // Replace 'imageUrls' with the correct field from your API data
      this.setState({ product: productData, imageUrls });
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
  render() {
    return (
      <>
        {/* Shop Detail Start */}
        <div className="container-fluid pb-5">
          <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
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
            <div className="col-lg-7 h-auto mb-30">
              <div className="h-100 bg-light p-30">
                <h3>{this.state.product.name}</h3>

                <h3 className="font-weight-semi-bold mb-4">
                  ${this.state.product.price}
                </h3>
                <p className="mb-4">
                  Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                  erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                  magna duo dolor no sea Nonumy
                </p>

                <div className="d-flex align-items-center mb-4 pt-2">
                  <div
                    className="input-group quantity mr-3"
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
                  <button className="btn btn-primary px-3">
                    <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                  </button>
                </div>
                <div className="d-flex pt-2">
                  <strong className="text-dark mr-2">Share on:</strong>
                  <div className="d-inline-flex">
                    <a className="text-dark px-2" href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a className="text-dark px-2" href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a className="text-dark px-2" href>
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a className="text-dark px-2" href>
                      <i className="fab fa-pinterest" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-xl-5">
            <div className="col">
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
          </div>
        </div>
        {/* Shop Detail End */}
      </>
    );
  }
}

export default DetailProductComponent;
