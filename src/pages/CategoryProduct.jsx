/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ProductServices from "../services/ProductServices";
import WishListServices from "../services/WishListServices";
import { toast } from "react-toastify";
import { convertDollarToVND } from "../utils/cartutils";

const CategoryProduct = (props) => {
  const [category_id] = useState(props.match.params.category_id);
  const [products, setProducts] = useState([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("price-all");
  const [productCounts, setProductCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const showFilterEmptyNotification = () => {
    console.log("Setting showNotification to true");
    setShowNotification(true);
    setTimeout(() => {
      console.log("Setting showNotification to false");
      setShowNotification(false);
    }, 5000);
  };
  const priceRanges = {
    "price-all": { min: 0, max: 9999999000 },
    "price-1": { min: 0, max: 100000 },
    "price-2": { min: 100000, max: 200000 },
    "price-3": { min: 200000, max: 500000 },
    "price-4": { min: 500000, max: 1000000 },
    "price-5": { min: 1000000, max: 9999999000 },
  };
  const fetchData = async (priceFilter) => {
    try {
      setIsLoading(true);
      let response;

      if (priceFilter === "price-all") {
        response = await ProductServices.getProductsByCategory(category_id);
      } else {
        response = await ProductServices.filterByCategoryAndPrice(
          priceFilter,
          category_id
        );
      }

      if (response.data) {
        setProducts(response.data);
        calculateProductCounts(response.data);
        console.log("Products loaded successfully:", response.data);
        setShowNotification(response.data.length === 0); // Show notification if no products found
      } else {
        setProducts([]);
        setProductCounts({});
        setShowNotification(true);
        console.log("No products found");
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
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
    fetchData(selectedPriceFilter);
  }, [selectedPriceFilter, category_id, fetchData]);

  const handlePriceFilterChange = (newPriceFilter) => {
    setSelectedPriceFilter((prevFilter) => {
      if (prevFilter === newPriceFilter) {
        return prevFilter;
      }

      fetchData(newPriceFilter);
      return newPriceFilter;
    });
    showFilterEmptyNotification(); // Reset the notification state
  };

  const renderProducts = () => {
    if (products.length === 0) {
      return (
        <div className="col-12 text-center">
          <p>No products found</p>
        </div>
      );
    }

    return products.map((product) => (
      <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={product.productId}>
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            {product.imageUrls.length > 0 && (
              <img
                className="img-fluid w-100"
                src={`${product.imageUrls[0]}`}
                alt={`Imagee 0`}
              />
            )}
            <div className="product-action">
              <button
                className="btn btn-outline-dark btn-square"
                onClick={() => addProductToCart(product.productId)}
              >
                <i className="fa fa-shopping-cart" />
              </button>
              <button
                className="btn btn-outline-dark btn-square"
                onClick={() => addWishListProduct(product.productId)}
              >
                <i className="far fa-heart" />
              </button>
            </div>
          </div>
          <div className="text-center py-4">
            <a
              className="h6 text-decoration-none text-truncate"
              href
              onClick={() => viewProduct(product.productId)}
            >
              {product.name}
            </a>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>{convertDollarToVND(product.price)} VND</h5>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const addWishListProduct = (product_id) => {
    const accountId = 5; // Replace with the actual account ID
    WishListServices.addToWishlist(accountId, product_id)
      .then((response) => {
        console.log("Product added to wishlist:", response.data);
        toast.success("Product added to wishlist successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };

  const addProductToCart = (product_id) => {
    const accountId = 5; // Replace with the actual account ID
    ProductServices.addToCart(accountId, product_id, 1)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.error("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const viewProduct = (productId) => {
    props.history.push(`/detail-product/${productId}`);
  };

  const renderPriceFilterCheckboxes = () => {
    return Object.keys(priceRanges).map((rangeId, index) => (
      <div
        className="filter-item--checkbox custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
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
            : `${convertDollarToVND(
                priceRanges[rangeId].min
              )}  - ${convertDollarToVND(priceRanges[rangeId].max)} VND`}
        </label>
        <span>{productCounts[rangeId] || 0}</span>
      </div>
    ));
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

              {showNotification || products.length === 0
                ? null
                : products.map((product) => (
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
                              alt={`Imagee 0`}
                            />
                          )}
                          <div className="product-action">
                            {product.type === 0 ? (
                              <>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                >
                                  <i className="fa fa-shopping-cart" />
                                </a>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href
                                >
                                  <i className="far fa-heart" />
                                </a>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="text-center py-4">
                          <a
                            className="h6 text-decoration-none text-truncate"
                            href
                            onClick={() => viewProduct(product.productId)}
                          >
                            {product.name}
                          </a>
                          <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>{convertDollarToVND(product.price)} VND</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              {!showNotification && products.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
