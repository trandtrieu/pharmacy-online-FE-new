import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ProductServices from "../services/ProductServices";

const FilterCategoryProduct = () => {
  const history = useHistory();
  const { category_id } = useParams();
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [products, setProducts] = useState([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("price-all");
  const [showNotification, setShowNotification] = useState(false);
  const [productCounts, setProductCounts] = useState({});
  const priceRanges = {
    "price-all": { min: 0, max: 9999999 },
    "price-1": { min: 0, max: 100 },
    "price-2": { min: 100, max: 200 },
    "price-3": { min: 200, max: 500 },
    "price-4": { min: 500, max: 1000 },
    "price-5": { min: 1000, max: 9999999 },
  };
  const showFilterEmptyNotification = () => {
    console.log("Setting showNotification to true");
    setShowNotification(true);
    setTimeout(() => {
      console.log("Setting showNotification to false");
      setShowNotification(false);
    }, 3000);
  };

  const viewProduct = (product_id) => {
    history.push(`/detail-product/${product_id}`);
  };

  const fetchData = async (priceFilter) => {
    try {
      // Fetch data based on the selected price filter and category_id
      const response =
        priceFilter === "price-all"
          ? await ProductServices.getProductsByCategory(category_id)
          : await ProductServices.filterByCategoryAndPrice(
              priceFilter,
              category_id
            );

      if (response.data) {
        setProducts(response.data);
        console.log("Products loaded successfully:", response.data);
      } else {
        setProducts([]);

        console.log("No products found");
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedPriceFilter);
  }, [selectedPriceFilter, category_id]);

  const handlePriceFilterChange = (newPriceFilter) => {
    if (selectedPriceFilter === newPriceFilter) {
      return;
    }

    // setSelectedPriceFilter(newPriceFilter);
    if (newPriceFilter === "price-all" || productCounts[newPriceFilter] > 0) {
      // Check if the new price filter is "price-all" or has products
      setSelectedPriceFilter(newPriceFilter);
      history.push(
        `/category/filterByCategory/${newPriceFilter}${category_id}`
      );
      setPriceFilter(newPriceFilter);
    } else {
      showFilterEmptyNotification();
    }
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
            : `$${priceRanges[rangeId].min} - $${priceRanges[rangeId].max}`}
        </label>
      </div>
    ));
  };

  //   return (
  //     <div className="container">
  //       <h2>Filtered Category Products</h2>
  //       <div className="row">
  //         <div className="col-md-3">
  //           <h4>Filter by Price</h4>
  //           <div>{renderPriceFilterCheckboxes()}</div>
  //         </div>
  //         <div className="col-md-9">
  //           {/* Render your products here */}
  //           {products.map((product) => (
  //             <div key={product.productId}>
  //               <h5>{product.name}</h5>
  //               <p>${product.price}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );

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

export default FilterCategoryProduct;
