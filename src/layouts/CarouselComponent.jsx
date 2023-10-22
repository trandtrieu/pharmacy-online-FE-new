import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class CarouselComponent extends Component {
  render() {
    return (
      <>
        {/* Carousel Start */}
        <div className="container-fluid mb-3">
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <div
                id="header-carousel"
                className="carousel slide carousel-fade mb-30 mb-lg-0"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#header-carousel"
                    data-slide-to={0}
                    className="active"
                  />
                  <li data-target="#header-carousel" data-slide-to={1} />
                  <li data-target="#header-carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                  <div
                    className="carousel-item position-relative active"
                    style={{ height: "430px" }}
                  >
                    <img
                      alt=""
                      className="position-absolute w-100 h-100"
                      src="assets/img/carousel-1.jpg"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: "700px" }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          Pharmacy
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          Lorem rebum magna amet lorem magna erat diam stet.
                          Sadips duo stet amet amet ndiam elitr ipsum diam
                        </p>
                        <Link
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                          to="/shop"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="carousel-item position-relative"
                    style={{ height: "430px" }}
                  >
                    <img
                      alt=""
                      className="position-absolute w-100 h-100"
                      src="assets/img/carousel-2.jpg"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: "700px" }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          Pharmacy{" "}
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          Lorem rebum magna amet lorem magna erat diam stet.
                          Sadips duo stet amet amet ndiam elitr ipsum diam
                        </p>
                        <Link
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                          to="/shop"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="carousel-item position-relative"
                    style={{ height: "430px" }}
                  >
                    <img
                      alt=""
                      className="position-absolute w-100 h-100"
                      src="assets/img/carousel-3.jpg"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: "700px" }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          Pharmacy{" "}
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          Lorem rebum magna amet lorem magna erat diam stet.
                          Sadips duo stet amet amet ndiam elitr ipsum diam
                        </p>
                        <Link
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                          to="/shop"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="product-offer mb-30" style={{ height: "200px" }}>
                <img
                  alt=""
                  className="img-fluid"
                  src="assets/img/offer-1.jpg"
                />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">Save 20%</h6>
                  <h3 className="text-white mb-3">Special Offer</h3>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="product-offer mb-30" style={{ height: "200px" }}>
                <img
                  alt=""
                  className="img-fluid"
                  src="assets/img/offer-2.jpg"
                />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">Save 20%</h6>
                  <h3 className="text-white mb-3">Special Offer</h3>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel End */}
      </>
    );
  }
}

export default CarouselComponent;
