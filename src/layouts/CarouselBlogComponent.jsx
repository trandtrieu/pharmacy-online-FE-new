import React, { Component } from "react";

class CarouselBlogComponent extends Component {
  render() {
    return (
      <div className="container-xl">
        <div className="row ">
          <div className="col justify-content-center">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
              data-interval={3000}
            >
              <ol className="carousel-indicators ">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={0}
                  className="active"
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={1}
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={2}
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={3}
                />
              </ol>
              <div className="carousel-inner">
                <div
                  className="carousel-item position-relative active"
                  style={{ height: "400px" }}
                >
                  <img
                    alt=""
                    className="position-absolute w-100 h-100"
                    src="/assets/images/carousel2.1.jpg"
                    style={{ objectFit: "cover", zIndex: "10" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 style={{ color: "white" }}>
                      WHO calls for regulating the use of AI in healthcare
                    </h5>
                    <p>
                      AI in the healthcare industry is very promising but also
                      comes with many challenges, so there needs to be a legal
                      framework and strict regulations to protect privacy.
                    </p>
                  </div>
                  <div
                    className="p-3"
                    style={{
                      maxWidth: "800px",
                      alignContent: "flex-end",
                      zIndex: "11",
                    }}
                  >
                    {/* Slide 1 content */}
                  </div>
                </div>

                <div
                  className="carousel-item position-relative"
                  style={{ height: "400px" }}
                >
                  <img
                    alt=""
                    className="position-absolute w-100 h-100"
                    src="/assets/images/carousel1.1.jpg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 style={{ color: "white" }}>
                      Stem cell therapy can increase the lifespan of heart
                      failure patients
                    </h5>
                    <p>
                      Cell therapy, which involves adult stem cells from bone
                      marrow, has been shown to reduce the risk of heart attack
                      and stroke in patients with severe heart failure,
                      according to a new study.
                    </p>
                  </div>
                  <div
                    className="p-3"
                    style={{ maxWidth: "700px", alignContent: "flex-end" }}
                  >
                    {/* Slide 2 content */}
                  </div>
                </div>

                <div
                  className="carousel-item position-relative"
                  style={{ height: "400px" }}
                >
                  <img
                    alt=""
                    className="position-absolute w-100 h-100"
                    src="/assets/images/carousel3.png"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 style={{ color: "white" }}>
                      Could Higher Doses of Buprenorphine Help People With OUD
                      Stay in Treatment?
                    </h5>
                    <p>
                      Higher doses of buprenorphine to treat patients with
                      opioid use disorder (OUD) when fentanyl use is more
                      prevalent could help improve rates of retention in
                      treatment, according to research published in JAMA Network
                      Openy.
                    </p>
                  </div>
                  <div
                    className="p-3"
                    style={{ maxWidth: "700px", alignContent: "flex-end" }}
                  >
                    {/* Slide 3 content */}
                  </div>
                </div>

                <div
                  className="carousel-item position-relative"
                  style={{ height: "400px" }}
                >
                  <img
                    alt=""
                    className="position-absolute w-100 h-100"
                    src="/assets/images/carousel4.jpg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 style={{ color: "white" }}>
                      Sickle Cell Disease Finally Getting Its Due
                    </h5>
                    <p>
                      Biologics license applications were filed recently for 2
                      potentially curative gene therapies in sickle cell disease
                      (SCD), representing an astonishing advance for a condition
                      characterized by crippling pain and a shortened life span
                      even with current treatments.
                    </p>
                  </div>
                  <div
                    className="p-3"
                    style={{ maxWidth: "700px", alignContent: "flex-end" }}
                  >
                    {/* Slide 4 content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselBlogComponent;
