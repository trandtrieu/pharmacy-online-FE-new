/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import WishListServices from "../services/WishListServices";
import ProductServices from "../services/ProductServices";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function ShopComponent() {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [productCounts, setProductCounts] = useState({});
  const [selectedPriceRange, setSelectedPriceRange] = useState("price-all"); // Default selected price range

  useEffect(() => {
    ProductServices.getProducts()
      .then((res) => {
        setProducts(res.data);
        calculateProductCounts(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }, []);

  // const addWishListProduct = (product_id) => {
  //   const accountId = 4; // Replace with the actual account ID
  //   WishListServices.addToWishlist(accountId, product_id)
  //     .then((response) => {
  //       console.log("Product added to wishlist:", response.data);
  //       toast.success("Product added to wishlist successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding product to wishlist:", error);
  //     });
  // };
  // const addProductToCart = (product_id) => {
  //   const accountId = 4; // Replace with the actual account ID
  //   ProductServices.addToCart(accountId, product_id, 1)
  //     .then((response) => {
  //       console.log("Product added to cart:", response.data);
  //       toast.error("Product added to cart successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding product to cart:", error);
  //     });
  // };
  const viewProduct = (productId) => {
    history.push(`/detail-product/${productId}`);
  };
  const searchProductsLatest = () => {
    ProductServices.searchProductsLatest()
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error occurs while sorting products: ", error);
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

  const priceRanges = {
    "price-all": { min: 0, max: 9999999 },
    "price-1": { min: 0, max: 100 },
    "price-2": { min: 100, max: 200 },
    "price-3": { min: 200, max: 500 },
    "price-4": { min: 500, max: 1000 },
    "price-5": { min: 1000, max: 9999999 },
  };
  const calculateProductCounts = (productData) => {
    const counts = {};
    for (const id in priceRanges) {
      const { min, max } = priceRanges[id];
      const count = productData.filter(
        (product) => product.price >= min && product.price <= max
      ).length;
      counts[id] = count;
    }
    setProductCounts(counts);
  };

  const calculateProductCountForRange = (rangeId) => {
    const { min, max } = priceRanges[rangeId];
    return products.filter(
      (product) => product.price >= min && product.price <= max
    ).length;
  };

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    const newProductCounts = { ...productCounts };

    if (id in priceRanges) {
      newProductCounts[id] = event.target.checked
        ? calculateProductCountForRange(id)
        : 0;
      setSelectedPriceRange(id); // Update the selected price range
    } else {
      setSelectedPriceRange("price-all"); // Set "price-all" as the default if nothing is selected
    }

    const allCheckboxIds = [
      "price-all",
      "price-1",
      "price-2",
      "price-3",
      "price-4",
      "price-5",
    ];

    allCheckboxIds.forEach((checkboxId) => {
      if (checkboxId === id) {
        switch (id) {
          case "price-all":
            sortProductByAllPrice();
            break;
          case "price-1":
            sortProductRange0To100();
            break;
          case "price-2":
            sortProductRange100To200();
            break;
          case "price-3":
            sortProductRange200To500();
            break;
          case "price-4":
            sortProductRange500To1000();
            break;
          case "price-5":
            sortProductGreaterThan1000();
            break;
          default:
            break;
        }
      } else {
        const checkboxElement = document.getElementById(checkboxId);
        if (checkboxElement) {
          checkboxElement.checked = false;
        }
      }
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
              <form>
                {Object.keys(priceRanges).map((rangeId, index) => (
                  <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                    key={rangeId}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      // id="price-all"
                      id={rangeId}
                      onChange={handleCheckboxChange}
                      checked={rangeId === selectedPriceRange}
                    />
                    <label className="custom-control-label" htmlFor={rangeId}>
                      {rangeId === "price-all"
                        ? "Price-all"
                        : index === Object.keys(priceRanges).length - 1
                        ? "Greater than $1000"
                        : `$${priceRanges[rangeId].min} - $${priceRanges[rangeId].max}`}
                    </label>
                    <span className="badge border font-weight-normal">
                      {productCounts[rangeId]}
                    </span>
                  </div>
                ))}
              </form>
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
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={searchProductsLatest}
                        >
                          Latest
                        </a>
                        <a className="dropdown-item" href="/">
                          Popularity
                        </a>
                        <a className="dropdown-item" href="/">
                          Best Rating
                        </a>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={sortProductByNameAZ}
                        >
                          Name, A to Z
                        </a>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={sortProductByNameZA}
                        >
                          Name, Z to A
                        </a>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={sortProductByPriceAsc}
                        >
                          Price, Low to High
                        </a>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={sortProductByPriceDesc}
                        >
                          Price, High to Low
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
              {products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                  <div
                    className="product-item bg-light mb-4"
                    key={product.productId}
                  >
                    <div className="product-img position-relative overflow-hidden">
                      {product.imageUrls.length > 0 && (
                        <img
                          className="img-fluid w-100"
                          src={`assets/images/${product.imageUrls[0]}`}
                          // src={product.imageUrls[0]}
                          alt={`Imagee 0`}
                        />
                      )}
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href>
                          <i className="fa fa-shopping-cart" />
                        </a>
                        <a className="btn btn-outline-dark btn-square" href>
                          <i className="far fa-heart" />
                        </a>
                      </div>
                    </div>
                    {/* <div className="text-center py-4">
                      <a
                        className="h6 text-decoration-none text-truncate"
                        href
                        onClick={() => this.viewProduct(product.productId)}
                      >
                        ${product.name}
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
                    </div> */}
                    <div className="text-center py-4">
                      <div className="product-item-box">
                        <a
                          className="h6 text-decoration-none text-truncate product-link"
                          href
                          onClick={() => viewProduct(product.productId)}
                        >
                          {product.name}
                        </a>
                      </div>
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
              ))}
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
          {/* Shop Product End */}
        </div>
      </div>
    </>
  );
}

export default ShopComponent;
