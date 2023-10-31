import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProductServices from "../services/ProductServices";

export const SearchProduct = () => {
  const [keyword, setKeyword] = useState("");
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("price-all");
  const [productCounts, setProductCounts] = useState({});
  const [priceAllCount, setPriceAllCount] = useState(0);

  const priceRanges = {
    "price-all": { min: 0, max: 9999999 },
    "price-1": { min: 0, max: 100 },
    "price-2": { min: 100, max: 200 },
    "price-3": { min: 200, max: 500 },
    "price-4": { min: 500, max: 1000 },
    "price-5": { min: 1000, max: 9999999 },
  };
  const updatePriceFilterCounts = () => {
    const counts = {};

    Object.keys(priceRanges).forEach((rangeId) => {
      const { min, max } = priceRanges[rangeId];
      const count = products.filter(
        (product) => product.price > min && product.price <= max
      ).length;
      counts[rangeId] = count;
    });

    setProductCounts(counts);
  };
  const searchProductAndFilter = () => {
    if (keyword.trim() === "") {
      setSelectedPriceFilter("price-all");
      setPriceFilter("price-all");

      const resetCounts = { ...productCounts };
      Object.keys(priceRanges).forEach((rangeId) => {
        resetCounts[rangeId] = priceAllCount;
      });
      setProductCounts(resetCounts);
    } else {
      ProductServices.searchProductAndFilter(keyword, priceFilter)
        .then((res) => {
          if (res.data) {
            calculateProductCounts(res.data);
            setProducts(res.data);
          } else {
            const resetCounts = { ...productCounts };
            Object.keys(priceRanges).forEach((rangeId) => {
              resetCounts[rangeId] = 0;
            });
            setProductCounts(resetCounts);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm sản phẩm:", error);
          setProducts([]);
        });
    }
  };

  const calculateProductCounts = (productData) => {
    const counts = { ...productCounts };

    if (selectedPriceFilter === "price-all") {
      counts["price-all"] = productData.length;

      Object.keys(priceRanges).forEach((rangeId) => {
        if (rangeId !== "price-all") {
          const { min, max } = priceRanges[rangeId];
          counts[rangeId] = productData.filter(
            (product) => product.price > min && product.price <= max
          ).length;
        }
      });
    } else {
      const { min, max } = priceRanges[selectedPriceFilter];
      const count = productData.filter(
        (product) => product.price > min && product.price <= max
      ).length;
      counts[selectedPriceFilter] = count;
    }

    setProductCounts(counts);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialKeyword = searchParams.get("keyword");
    const initialPriceFilter = searchParams.get("price");

    if (initialKeyword) {
      setKeyword(initialKeyword);
    }

    if (initialPriceFilter) {
      setPriceFilter(initialPriceFilter);
      setSelectedPriceFilter(initialPriceFilter);
    } else {
      setPriceFilter("price-all");
      setSelectedPriceFilter("price-all");
    }
  }, [location.search]);

  useEffect(() => {
    if (keyword.trim() === "") {
      setSelectedPriceFilter("price-all");
      setPriceFilter("price-all");

      updatePriceFilterCounts();
    } else {
      searchProductAndFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, products]);
  const handlePriceFilterChange = (newPriceFilter) => {
    const allCheckboxIds = [
      "price-all",
      "price-1",
      "price-2",
      "price-3",
      "price-4",
      "price-5",
    ];

    if (newPriceFilter === "price-all") {
      setPriceAllCount(products.length); // Cập nhật số lượng sản phẩm của "price-all"
      allCheckboxIds.forEach((checkboxId) => {
        const checkboxElement = document.getElementById(checkboxId);
        if (checkboxElement) {
          checkboxElement.checked = false;
        }
      });
    } else {
      const selectedCheckboxElement = document.getElementById(newPriceFilter);
      if (selectedCheckboxElement) {
        selectedCheckboxElement.checked = true;
      }
    }

    setSelectedPriceFilter(newPriceFilter);
    history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
    searchProductAndFilter();
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
        <span>{productCounts[rangeId] || 0}</span>
      </div>
    ));
  };

  const viewProduct = (product_id) => {
    history.push(`/single-product/${product_id}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by price</span>
            </h5>
            <div className="bg-light p-4 mb-4">
              <div className="row">
                <div className="col-12">{renderPriceFilterCheckboxes()}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
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
                products.map((product) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 pb-1"
                    key={product.productId}
                  >
                    <div className="product-item bg-light mb-4">
                      <div className="product-img position-relative overflow-hidden">
                        {product.imageUrls.length > 0 && (
                          <img
                            className="img-fluid w-100"
                            src={`../assets/images/${product.imageUrls[0]}`}
                            alt={`Imagee 0`}
                          />
                        )}
                        <div className="product-action">
                          <a
                            className="btn btn-outline-dark btn-square"
                            href="/"
                          >
                            <i className="fa fa-shopping-cart" />
                          </a>
                          <a
                            className="btn btn-outlineDark btn-square"
                            href="/"
                          >
                            <i className="far fa-heart" />
                          </a>
                        </div>
                      </div>
                      <div className="text-center py-4">
                        <a
                          className="h6 text-decoration-none text-truncate"
                          href="/"
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
                          <small className="far fa-star text primary mr-1" />
                          <small className="far fa-star text-primary mr-1" />
                          <small>(99)</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
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
                      <a className="page-link" href="/">
                        1
                      </a>
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
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
