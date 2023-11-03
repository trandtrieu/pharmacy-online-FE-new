import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import ProductServices from "../services/ProductServices";
import SearchProduct from "../pages/SearchProduct";
import { withRouter } from "react-router-dom";
import CategoryServices from "../services/CategoryServices";
import CartServices from "../services/CartServices";
import WishListServices from "../services/WishListServices";
const accountId = 1;

const HeaderComponent = (props) => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [categories, setCategories] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProductAndFilter();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    http: history.push(`/shop/search?keyword=${keyword}&price=${priceFilter}`);
    searchProductAndFilter(keyword, priceFilter);
  };

  const handlePriceFilterChange = (newPriceFilter) => {
    setPriceFilter(newPriceFilter);
    history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
    searchProductAndFilter(keyword, newPriceFilter);
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
      });
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   history.push(`/shop/search?keyword=${keyword}`);
  //   searchProduct(keyword);
  // };

  // const searchProduct = (keyword) => {
  //   console.log("Searching for keyword: " + keyword);
  //   ProductServices.searchProduct(keyword)
  //     .then((res) => {
  //       console.log("Search result:", res.data);
  //       setProducts(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error occurred while searching for products: " + error);
  //     });
  // };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const initialKeyword = searchParams.get("keyword");

  //   if (initialKeyword) {
  //     setKeyword(initialKeyword);
  //     searchProduct(initialKeyword);
  //   } else {
  //     searchProduct("");
  //   }
  // }, [location.search]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialKeyword = searchParams.get("keyword");
    const initialPriceFilter = searchParams.get("price");

    if (initialKeyword) {
      setKeyword(initialKeyword);
      searchProductAndFilter(initialKeyword, initialPriceFilter);
    } else {
      searchProductAndFilter("", initialPriceFilter);
    }

    if (initialPriceFilter) {
      setPriceFilter(initialPriceFilter);
    }
  }, [location.search]);

  // const updatePriceFilter = (newPriceFilter) => {
  //   setPriceFilte(newPriceFilter);
  //   // You can optionally update the URL when the price filter changes
  //   history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
  // };
  const updateCartItemCount = () => {
    CartServices.getNumberProductInCart(accountId)
      .then((res) => {
        setCartItemCount(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải số lượng sản phẩm trong giỏ hàng:", error);
      });
  };

  const updateWishListItemCount = () => {
    WishListServices.countProduct(accountId)
      .then((res) => {
        setWishlistItemCount(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải số lượng sản phẩm trong giỏ hàng:", error);
      });
  };

  useEffect(() => {
    CategoryServices.getCategoryType()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });

    updateCartItemCount();
    updateWishListItemCount();

    const cartInterval = setInterval(updateCartItemCount, 100000);
    const wishlistInterval = setInterval(updateWishListItemCount, 100000);

    return () => {
      clearInterval(cartInterval);
      clearInterval(wishlistInterval);
    };
  }, []);

  const viewProductByCategory = (category_id) => {
    props.history.push(`/category/${category_id}`);
  };

  const toAccount = () => {
    props.history.push(`/profile/${1}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href>
                About
              </a>
              <a className="text-body mr-3" href>
                Contact
              </a>
              <a className="text-body mr-3" href>
                Help
              </a>
              <a className="text-body mr-3" href>
                FAQs
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  My Account
                </button>

                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      toAccount();
                    }}
                  >
                    Profile
                  </button>
                  <button className="dropdown-item" type="button">
                    Sign in
                  </button>
                  <button className="dropdown-item" type="button">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark" />
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark" />
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </a>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="/shop/search" method="get" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: "65px", padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2" />
                Categories
              </h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 999 }}
            >
              <div className="navbar-nav w-100">
                {categories.map((category) => (
                  <li key={category.category_id}>
                    <button
                      className="btn"
                      onClick={() =>
                        viewProductByCategory(category.category_id)
                      }
                    >
                      {category.category_name}
                    </button>
                  </li>
                ))}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link
                to="/home"
                className="text-decoration-none d-block d-lg-none"
              >
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Drug
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Mart
                </span>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/home" className="nav-item nav-link active">
                    Home
                  </Link>
                  <Link to="/shop" className="nav-item nav-link">
                    Shop
                  </Link>
                  <Link to="/create-prescription" className="nav-item nav-link">
                    Prescription
                  </Link>
                  <div className="nav-item dropdown">
                    <a
                      href="/"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages <i className="fa fa-angle-down mt-1" />
                    </a>
                    <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                      <a href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="checkout.html" className="dropdown-item">
                        Checkout
                      </a>
                    </div>
                  </div>
                  <Link to="/contact" className="nav-item nav-link">
                    Contact
                  </Link>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link to="/wishlist" className="btn px-0">
                    <i className="fas fa-heart text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      {wishlistItemCount}
                    </span>
                  </Link>
                  <Link to="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      {cartItemCount}
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HeaderComponent);
