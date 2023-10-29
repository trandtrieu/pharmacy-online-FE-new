import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProductServices from "../services/ProductServices";

export const SearchProduct = () => {
  const [keyword, setKeyword] = useState("");
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [productCounts, setProductCounts] = useState({});
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("price-all");

  const priceRanges = {
    "price-all": { min: 0, max: 9999999 },
    "price-1": { min: 0, max: 100 },
    "price-2": { min: 100, max: 200 },
    "price-3": { min: 200, max: 500 },
    "price-4": { min: 500, max: 1000 },
    "price-5": { min: 1000, max: 9999999 },
  };

  const searchProductAndFilter = (keyword, priceFilter) => {
    console.log(
      "Searching for keyword: " + keyword + " with price filter: " + priceFilter
    );
    ProductServices.searchProductAndFilter(keyword, priceFilter)
      .then((res) => {
        console.log("Search result:", res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error occurred while searching for products: " + error);
        setProducts([]);
      });
  };

  const calculateProductCounts = () => {
    const counts = {};
    for (const rangeId in priceRanges) {
      const { min, max } = priceRanges[rangeId];
      const count = products.filter(
        (product) => product.price > min && product.price <= max
      ).length;
      counts[rangeId] = count;
    }
    setProductCounts(counts);
  };

  const calculateProductCountForRange = (rangeId) => {
    const { min, max } = priceRanges[rangeId];
    return products.filter(
      (product) => product.price > min && product.price <= max
    ).length;
  };

  const viewProduct = (product_id) => {
    history.push(`/single-product/${product_id}`);
  };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);

  //   const initialKeyword = searchParams.get("keyword");
  //   const initialPriceFilter = searchParams.get("price");

  //   if (initialKeyword) {
  //     setKeyword(initialKeyword);
  //     searchProductAndFilter(initialKeyword, initialPriceFilter);
  //     setSelectedPriceFilter(initialPriceFilter); // Cài đặt mức giá ban đầu
  //   } else {
  //     setKeyword("");
  //     searchProductAndFilter("", initialPriceFilter);
  //     setSelectedPriceFilter(initialPriceFilter); // Cài đặt mức giá ban đầu
  //   }

  //   // if (initialPriceFilter) {
  //   //   setPriceFilter(initialPriceFilter);
  //   //   if (initialPriceFilter === "price-all") {
  //   //     setInitialPriceAllCount(products.length);
  //   //   }
  //   // }
  // }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const initialKeyword = searchParams.get("keyword");
    const initialPriceFilter = searchParams.get("price");

    if (initialKeyword) {
      setKeyword(initialKeyword);
      searchProductAndFilter(initialKeyword, initialPriceFilter);
      setSelectedPriceFilter(initialPriceFilter); // Cài đặt mức giá ban đầu
    } else {
      setKeyword("");
      searchProductAndFilter("", initialPriceFilter);
      setSelectedPriceFilter(initialPriceFilter); // Cài đặt mức giá ban đầu
    }

    // Lưu trạng thái ban đầu của productCounts
    calculateProductCounts();
  }, [location.search]);

  const handlePriceFilterChange = (newPriceFilter) => {
    debugger;
    const allCheckboxIds = [
      "price-all",
      "price-1",
      "price-2",
      "price-3",
      "price-4",
      "price-5",
    ];

    allCheckboxIds.forEach((checkboxId) => {
      const checkboxElement = document.getElementById(checkboxId);
      if (checkboxElement) {
        checkboxElement.checked = false;
      }
    });

    const selectedCheckboxElement = document.getElementById(newPriceFilter);
    if (selectedCheckboxElement) {
      selectedCheckboxElement.checked = true;
    }

    setProductCounts({
      ...productCounts,
      [selectedPriceFilter]: calculateProductCountForRange(selectedPriceFilter),
    });

    // if (newPriceFilter !== "price-all") {
    //   setPriceFilter(newPriceFilter);
    // }
    setSelectedPriceFilter(newPriceFilter);
    history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
    searchProductAndFilter(keyword, newPriceFilter);
  };

  const renderPriceFilterCheckboxes = () => {
    return Object.keys(priceRanges).map((rangeId, index) => (
      <div
        className=" filter-item--checkbox  custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
        key={rangeId}
      >
        <input
          type="checkbox"
          className="custom-control-input"
          id={rangeId}
          onChange={() => {
            console.log("will call fillter change");
            handlePriceFilterChange(rangeId);
          }}
          checked={selectedPriceFilter === rangeId}
        />
        <label className="custom-control-label" htmlFor={rangeId}>
          {rangeId === "price-all"
            ? "Price-all"
            : index === Object.keys(priceRanges).length - 1
            ? "Greater than $1000"
            : `$${priceRanges[rangeId].min} - $${priceRanges[rangeId].max}`}
        </label>
        <span className="badge border font-weight-normal">
          {calculateProductCountForRange(rangeId)}
        </span>
      </div>
    ));
  };
  const sortProductByPriceRange = (min, max) => {
    ProductServices.filterProductByPriceRange(min, max)
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error(
          "Error occurs while sorting products by price range: ",
          error
        );
      });
  };
  const sortProductByAllPrice = () => {
    ProductServices.filterProductAllPrice()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductRange0To100 = () => {
    ProductServices.filterProductPrice0To100()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductRange100To200 = () => {
    ProductServices.filterProductPrice100To200()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductRange200To500 = () => {
    ProductServices.filterProductPrice200To500()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductRange500To1000 = () => {
    ProductServices.filterProductPrice500To1000()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductGreaterThan1000 = () => {
    ProductServices.filterProductPriceGreaterThan1000()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ");
      });
  };
  const sortProductByNameAZ = () => {
    ProductServices.filterProductAZ()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ", error);
      });
  };
  const sortProductByNameZA = () => {
    ProductServices.filterProductZA()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ", error);
      });
  };
  const sortProductByPriceAsc = () => {
    ProductServices.filterProductPriceAsc()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products by Price: ", error);
      });
  };
  const sortProductByPriceDesc = () => {
    ProductServices.filterProductPriceDesc()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products by Price: ", error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-4">
            {/* Price Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by price</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              {renderPriceFilterCheckboxes()}
            </div>
            {/* Price End */}
          </div>
          {/* Shop Sidebar End */}
          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button className="btn btn-sm btn-light">
                      <i className="fa fa-th-large" />
                    </button>
                    <button className="btn btn-sm btn-light ml-2">
                      <i className="fa fa-bars" />
                    </button>
                  </div>
                  <div className="ml-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Sorting
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/">
                          Latest
                        </a>
                        <a className="dropdown-item" href="/">
                          Popularity
                        </a>
                        <a className="dropdown-item" href="/">
                          Best Rating
                        </a>
                      </div>
                    </div>
                    <div className="btn-group ml-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Showing
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/">
                          10
                        </a>
                        <a className="dropdown-item" href="/">
                          20
                        </a>
                        <a className="dropdown-item" href="/">
                          30
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {products.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.8rem",
                    color: "#888",
                    paddingTop: "20px",
                    paddingLeft: "38%",
                    paddingBottom: "20px",
                  }}
                >
                  NO PRODUCTS FOUND.
                </p>
              ) : (
                products.map((product) => {
                  if (
                    priceFilter === "price-all" ||
                    (priceFilter === "price-1" &&
                      product.price > 0 &&
                      product.price <= 100) ||
                    (priceFilter === "price-2" &&
                      product.price > 100 &&
                      product.price <= 200) ||
                    (priceFilter === "price-3" &&
                      product.price > 200 &&
                      product.price <= 500) ||
                    (priceFilter === "price-4" &&
                      product.price > 500 &&
                      product.price <= 1000) ||
                    (priceFilter === "price-5" && product.price > 1000)
                  ) {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-sm-6 pb-1"
                        key={product.productId}
                      >
                        <div className="product-item bg-light mb-4">
                          <div className="product-img position-relative overflow-hidden">
                            {product.imageUrls.length > 0 && (
                              <img
                                className="img-fluid w-100"
                                src={`${product.imageUrls[0]}`}
                                alt={`Image 0`}
                              />
                            )}
                            <div className="product-action">
                              <a
                                className="btn btn-outline-dark btn-square"
                                href="#"
                              >
                                <i className="fa fa-shopping-cart" />
                              </a>
                              <a
                                className="btn btn-outline-dark btn-square"
                                href="#"
                              >
                                <i className="far fa-heart" />
                              </a>
                            </div>
                          </div>
                          <div className="text-center py-4">
                            <a
                              className="h6 text-decoration-none text-truncate"
                              href="#"
                              onClick={() => viewProduct(product.productId)}
                            >
                              {product.name}
                            </a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              <h5>${product.price}</h5>
                              <h6 className="text-muted ml-2">
                                <del>${product.price}</del>
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
                    );
                  } else {
                    return null;
                  }
                })
              )}

              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="/">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="/"></a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
