import React, { Component } from "react";

class RecentProduct extends Component {
  render() {
    return (
      <>
        {/* Products Start */}
        <div className="container-fluid pt-5 pb-3">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Recent Products</span>
          </h2>
          <div className="row px-xl-5">
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-1.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-2.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star-half-alt text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-3.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star-half-alt text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-4.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-5.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-6.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star-half-alt text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-7.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star-half-alt text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/product-8.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href>
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href>
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small className="far fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Products End */}
      </>
    );
  }
}

export default RecentProduct;
