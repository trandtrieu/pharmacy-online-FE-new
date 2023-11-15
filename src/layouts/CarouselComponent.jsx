// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Carousel from "react-bootstrap/Carousel";

// class CarouselComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeIndex: 0,
//     };
//   }

//   componentDidMount() {
//     this.carouselInterval = setInterval(this.nextSlide, 2000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.carouselInterval);
//   }

//   nextSlide = () => {
//     const { activeIndex } = this.state;
//     const nextIndex = activeIndex === 2 ? 0 : activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   };

//   handleSelect = (selectedIndex) => {
//     this.clearCarouselInterval();
//     this.setState({ activeIndex: selectedIndex }, this.startCarouselInterval);
//   };

//   clearCarouselInterval = () => {
//     if (this.carouselInterval) {
//       clearInterval(this.carouselInterval);
//       this.carouselInterval = null;
//     }
//   };
//   render() {
//     const { activeIndex } = this.state;

//     return (
//       <>
//         {/* Carousel Start */}
//         <div className="container-fluid mb-3">
//           <div className="row px-xl-5">
//             <div className="col-lg-8">
//               <Carousel activeIndex={activeIndex} onSelect={this.handleSelect}>
//                 <Carousel.Item style={{ height: "430px" }}>
//                   <img
//                     alt=""
//                     className="position-absolute w-100 h-100"
//                     src="assets/img/carousel-1.jpg"
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
//                     <div className="p-3" style={{ maxWidth: "700px" }}>
//                       <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
//                         Pharmacy
//                       </h1>
//                       <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
//                         Lorem rebum magna amet lorem magna erat diam stet.
//                         Sadips duo stet amet amet ndiam elitr ipsum diam
//                       </p>
//                       <Link
//                         className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
//                         to="/shop"
//                       >
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//                 <Carousel.Item style={{ height: "430px" }}>
//                   <img
//                     alt=""
//                     className="position-absolute w-100 h-100"
//                     src="assets/img/carousel-2.jpg"
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
//                     <div className="p-3" style={{ maxWidth: "700px" }}>
//                       <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
//                         Pharmacy{" "}
//                       </h1>
//                       <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
//                         Lorem rebum magna amet lorem magna erat diam stet.
//                         Sadips duo stet amet amet ndiam elitr ipsum diam
//                       </p>
//                       <Link
//                         className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
//                         to="/shop"
//                       >
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//                 <Carousel.Item style={{ height: "430px" }}>
//                   <img
//                     alt=""
//                     className="position-absolute w-100 h-100"
//                     src="assets/img/carousel-3.jpg"
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
//                     <div className="p-3" style={{ maxWidth: "700px" }}>
//                       <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
//                         Pharmacy{" "}
//                       </h1>
//                       <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
//                         Lorem rebum magna amet lorem magna erat diam stet.
//                         Sadips duo stet amet amet ndiam elitr ipsum diam
//                       </p>
//                       <Link
//                         className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
//                         to="/shop"
//                       >
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//               </Carousel>
//             </div>
//             <div className="col-lg-4">
//               <div className="product-offer mb-30" style={{ height: "200px" }}>
//                 <img
//                   alt=""
//                   className="img-fluid"
//                   src="assets/img/offer-1.jpg"
//                 />
//                 <div className="offer-text">
//                   <h6 className="text-white text-uppercase">Save 20%</h6>
//                   <h3 className="text-white mb-3">Special Offer</h3>
//                   <Link to="/shop" className="btn btn-primary">
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//               <div className="product-offer mb-30" style={{ height: "200px" }}>
//                 <img
//                   alt=""
//                   className="img-fluid"
//                   src="assets/img/offer-2.jpg"
//                   style={{ borderRadius: "10px" }}
//                 />
//                 <div className="offer-text" style={{ borderRadius: "10px" }}>
//                   <h6 className="text-white text-uppercase">Save 20%</h6>
//                   <h3 className="text-white mb-3">Special Offer</h3>
//                   <Link to="/shop" className="btn btn-primary">
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Carousel End */}
//       </>
//     );
//   }
// }

// export default CarouselComponent;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class CarouselComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.carouselInterval = setInterval(this.nextSlide, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.carouselInterval);
  }

  nextSlide = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 2 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  handleSelect = (selectedIndex) => {
    this.clearCarouselInterval();
    this.setState({ activeIndex: selectedIndex }, this.startCarouselInterval);
  };

  clearCarouselInterval = () => {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  };

  render() {
    const { activeIndex } = this.state;
    const images = [
      "assets/img/carousel-1.jpg",
      "assets/img/carousel-2.jpg",
      "assets/img/carousel-3.jpg",
    ];

    return (
      <>
        {/* Carousel Start */}
        <div className="container-fluid mb-3">
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <div
                className="carousel"
                style={{ position: "relative", overflow: "hidden" }}
              >
                {images.map((image, index) => (
                  <div
                    className={`carousel-item${
                      index === activeIndex ? " active" : ""
                    }`}
                    key={index}
                  >
                    <img
                      alt=""
                      className="position-absolute w-100 h-100"
                      src={image}
                      style={{
                        objectFit: "cover",
                        maxHeight: "430px",
                        width: "100%",
                      }}
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
                ))}
                <a
                  className="carousel-control-prev"
                  href="#productCarousel"
                  role="button"
                  data-slide="prev"
                  onClick={() => this.prevSlide()}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#productCarousel"
                  role="button"
                  data-slide="next"
                  onClick={() => this.nextSlide()}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </a>
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
                  <Link
                    to="/shop"
                    className="btn btn-primary"
                    style={{ borderRadius: "8px" }}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="product-offer mb-30" style={{ height: "200px" }}>
                <img
                  alt=""
                  className="img-fluid"
                  src="assets/img/offer-2.jpg"
                  style={{ borderRadius: "10px" }}
                />
                <div className="offer-text" style={{ borderRadius: "10px" }}>
                  <h6 className="text-white text-uppercase">Save 20%</h6>
                  <h3 className="text-white mb-3">Special Offer</h3>
                  <Link
                    to="/shop"
                    className="btn btn-primary"
                    style={{ borderRadius: "8px" }}
                  >
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

  prevSlide = () => {
    const { activeIndex } = this.state;
    const prevIndex = activeIndex === 0 ? 2 : activeIndex - 1;
    this.setState({ activeIndex: prevIndex });
  };

  nextSlide = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 2 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };
}

export default CarouselComponent;
