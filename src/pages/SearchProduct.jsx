/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProductServices from "../services/ProductServices";
import addProductToCart, { convertDollarToVND } from "../utils/cartutils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import addWishListProduct from "../utils/wishlistutils";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartProvider";

export const SearchProduct = () => {
  const [keyword, setKeyword] = useState("");
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("price-all");
  const [productCounts, setProductCounts] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const { updateCartItemCount } = useCart();
  const { accountId, token } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [productsPerPageShowing, setProductsPerPage] = useState(10);
  const setCurrentProducts = (newProducts) => {
    setDisplayedProducts(newProducts);
  };

  const priceRanges = {
    "price-all": { min: 0, max: 9999999000 },
    "price-1": { min: 0, max: 100000 },
    "price-2": { min: 100000, max: 200000 },
    "price-3": { min: 200000, max: 500000 },
    "price-4": { min: 500000, max: 1000000 },
    "price-5": { min: 1000000, max: 9999999000 },
  };

  const showFilterEmptyNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
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
    const fetchData = async () => {
      try {
        let response;
        if (keyword.trim() === "") {
          response = await ProductServices.getAllProducts();
        } else {
          response = await ProductServices.searchProductAndFilter(
            keyword,
            priceFilter
          );
        }

        if (response.data) {
          const filteredProducts = response.data;
          setProducts(filteredProducts);
          calculateProductCounts(filteredProducts);
          setDisplayedProducts(response.data.slice(0, productsPerPage));
        } else {
          setProducts([]);
          setProductCounts({});
        }
      } catch (error) {
        console.error("Error searching for products:", error);
        setProducts([]);
        setProductCounts({});
      }
    };

    fetchData();
  }, [keyword, priceFilter, selectedPriceFilter]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setCurrentProducts(products.slice(startIndex, endIndex));
    setCurrentPage(pageNumber);
  };

  const handlePriceFilterChange = (newPriceFilter) => {
    if (selectedPriceFilter === newPriceFilter) {
      return;
    }

    // Check if the new price filter is "price-all" or has products
    if (newPriceFilter === "price-all" || productCounts[newPriceFilter] > 0) {
      setSelectedPriceFilter(newPriceFilter);
      history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
      setPriceFilter(newPriceFilter);
    } else {
      showFilterEmptyNotification();
    }
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
            ? "Greater than 1.000.000"
            : `${convertDollarToVND(
                priceRanges[rangeId].min
              )} VND - ${convertDollarToVND(priceRanges[rangeId].max)}`}{" "}
          VND
        </label>
        <span>{productCounts[rangeId] || 0}</span>
      </div>
    ));
  };
  const handleAddToCart = async (productId) => {
    await addProductToCart(accountId, productId, 1, token);
    await updateCartItemCount();
  };
  const handleAddtoWishlist = (productId) => {
    addWishListProduct(accountId, productId, token);
  };
  const viewProduct = (product_id) => {
    history.push(`/detail-product/${product_id}`);
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
              {showNotification && (
                <div className="no-products-message text-center">
                  <img
                    src="../assets/images/empty-image.png"
                    alt="No products found"
                    className="error-image"
                  />
                  <h1 className="message-heading">
                    I'm sorry! No products found.
                  </h1>
                </div>
              )}

              {showNotification || currentProducts.length === 0
                ? null
                : currentProducts.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                      <div
                        className="product-item bg-light mb-4"
                        key={product.productId}
                      >
                        <div className="product-img position-relative overflow-hidden">
                          {product.imageUrls.length > 0 && (
                            <img
                              className="img-fluid img-product-mai"
                              style={{
                                marginTop: "20px",
                                width: "90%",
                                marginLeft: "5%",
                              }}
                              src={
                                product.imageUrls[0]?.startsWith("https")
                                  ? product.imageUrls[0]
                                  : `assets/images/${product.imageUrls[0]}`
                              }
                              alt={`Imagee 0`}
                            />
                          )}
                          <div className="product-action">
                            {product.type === 0 ? (
                              <>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                  onClick={() =>
                                    handleAddToCart(product.productId)
                                  }
                                >
                                  <i className="fa fa-shopping-cart" />
                                </a>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                  onClick={() =>
                                    handleAddtoWishlist(product.productId)
                                  }
                                >
                                  <i className="far fa-heart" />
                                </a>{" "}
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                  onClick={() => viewProduct(product.productId)}
                                >
                                  <FontAwesomeIcon icon={faCircleInfo} />
                                </a>
                              </>
                            ) : (
                              <>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                  onClick={() =>
                                    handleAddtoWishlist(product.productId)
                                  }
                                >
                                  <i className="far fa-heart" />
                                </a>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                  onClick={() => viewProduct(product.productId)}
                                >
                                  <FontAwesomeIcon icon={faCircleInfo} />
                                </a>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-center py-4">
                          <div className="product-item-box">
                            <a
                              className="h6 text-decoration-none name-container"
                              href
                              onClick={() => viewProduct(product.productId)}
                            >
                              <div className="product-name-container ">
                                <span className="product-name text-truncate product-link">
                                  {product.name}
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5 style={{ color: "#1250DC" }}>
                              {convertDollarToVND(product.price)} VND
                              <span
                                style={{
                                  fontSize: "1rem",
                                  fontWeight: "revert",
                                }}
                              >
                                / box
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {!showNotification && products.length > 0 && (
              <div className="d-flex justify-content-center text-center pt-3 pagination-container">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(currentPage - 1);
                      }}
                      className="page-link"
                      href="#"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </a>
                  </li>
                  {Array.from(
                    { length: Math.ceil(products.length / productsPerPage) },
                    (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            paginate(i + 1);
                          }}
                          className="page-link"
                          href="#"
                        >
                          {i + 1}
                        </a>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      currentPage ===
                      Math.ceil(products.length / productsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(currentPage + 1);
                      }}
                      className="page-link"
                      href="#"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
