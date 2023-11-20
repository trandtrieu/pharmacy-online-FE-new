/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import ProductServices from "../services/ProductServices";
import { withRouter } from "react-router-dom";
import CategoryServices from "../services/CategoryServices";
import CartServices from "../services/CartServices";
import WishListServices from "../services/WishListServices";
import { useAuth } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeaderComponent = (props) => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [categories, setCategories] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { accountId, token } = useAuth();

  const handleLogout = () => {
    // Remove token and id from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    // Update state to reflect the user being logged out
    setIsLoggedIn(false);
    setUsername(null);

    // Reload the window or navigate to the home page
    window.location.reload(); // You may not need this line
    window.location.href = "/home"; // Redirect to the home page

    // If you're using React Router, you can use history to navigate
    // history.push("/home");
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProductAndFilter();
    }
  };

  const handleCartClick = () => {
    // Navigate to the cart page
    history.push("/cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    history.push(`/shop/search?keyword=${keyword}&price=${priceFilter}`);
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

  // const clearTokenOnUnload = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("id");
  // };

  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }

  //   window.addEventListener("unload", clearTokenOnUnload);

  //   return () => {
  //     window.removeEventListener("unload", clearTokenOnUnload);
  //   };
  // }, [token]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

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

  const updateCartItemCount = () => {
    CartServices.getNumberProductInCart(accountId, token)
      .then((res) => {
        setCartItemCount(res.data);
      })
      .catch((error) => {
        // console.error("Lỗi khi tải số lượng sản phẩm trong giỏ hàng:", error);
      });
  };

  const updateWishListItemCount = () => {
    WishListServices.countProduct(accountId, token)
      .then((res) => {
        setWishlistItemCount(res.data);
      })
      .catch((error) => {
        // console.error("Lỗi khi tải số lượng sản phẩm trong giỏ hàng:", error);
      });
  };

  // useEffect(() => {
  //   // CategoryServices.getCategoryType()
  //   //   .then((res) => {
  //   //     setCategories(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Lỗi khi tải sản phẩm:", error);
  //   //   });
  //   updateCartItemCount();
  //   updateWishListItemCount();
  //   const cartInterval = setInterval(updateCartItemCount, 1000);
  //   const wishlistInterval = setInterval(updateWishListItemCount, 1000);
  //   return () => {
  //     clearInterval(cartInterval);
  //     clearInterval(wishlistInterval);
  //   };
  // }, [updateCartItemCount, updateWishListItemCount]);

  const viewProductByCategory = (category_id) => {
    props.history.push(`/category/${category_id}`);
  };

  const toAccount = () => {
    props.history.push(`/profile`);
  };

  return (
    <>
      <div
        style={{ overflowX: "clip" }}
        className="container-fluid sticky-header"
      >
        <div className="avc" style={{ backgroundColor: "#07304f" }}></div>

        <div className="container-fluid bg-light py-3 px-xl-5 d-none d-lg-block ">
          <div
            className="row align-items-center"
            style={{ marginRight: "0px" }}
          >
            <div className="col-lg-3 text-left">
              <a className="text-decoration-none">
                <img
                  src="assets/images/logoSite.png"
                  alt=""
                  style={{ width: "66%", height: "75px" }}
                />
              </a>
            </div>

            <div className="col-lg-6 text-center">
              <form
                action="/shop/search"
                method="get"
                onSubmit={handleSearch}
                className="input-group"
                style={{ borderRadius: "10px", padding: "10px 0" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                    padding: "22px",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderTopRightRadius: "6px",
                    borderBottomRightRadius: "6px",
                    padding: "10px",
                  }}
                >
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>

            <div className="col-lg-3 text-right">
              <div className="d-inline-flex align-items-center">
                <div className="cart-new mr-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm rounded-pill position-relative"
                    onClick={() => {
                      handleCartClick();
                    }}
                    style={{
                      padding: "9px 11px",

                      fontWeight: "normal",
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} /> Cart
                    <span
                      className="badge bg-danger rounded-circle"
                      style={{
                        position: "absolute",
                        top: "-4",
                        right: "-6px",
                      }}
                    >
                      <span className="text-light" style={{ padding: "0.5px" }}>
                        {cartItemCount}
                      </span>
                    </span>
                  </button>
                </div>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm rounded-pill dropdown-toggle"
                    data-toggle="dropdown"
                    style={{
                      padding: "9px 11px",
                      fontSize: "16px",
                      fontWeight: "normal",
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} /> Account
                  </button>

                  <div className="dropdown-menu dropdown-menu-right">
                    {isLoggedIn ? (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => {
                          toAccount();
                        }}
                      >
                        Profile
                      </button>
                    ) : null}
                    {isLoggedIn ? (
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    ) : (
                      <Link to="/login" className="dropdown-item">
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ overflowX: "clip" }}
          className="container-fluid bg-dark mb-30"
        >
          <div
            className="row px-xl-5"
            style={{ zIndex: "1000", marginRight: "0px" }}
          >
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
                style={{ width: "calc(100% - 30px)" }}
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
                    <Link to="/home" className="nav-item nav-link">
                      Home
                    </Link>
                    <Link to="/shop" className="nav-item nav-link">
                      Shop
                    </Link>
                    <Link
                      to="/create-prescription"
                      className="nav-item nav-link"
                    >
                      Prescription
                    </Link>

                    <Link to="/contact" className="nav-item nav-link">
                      Contact
                    </Link>

                    <Link to="/blog" className="nav-item nav-link">
                      Blog
                    </Link>
                  </div>

                  <div
                    style={{ zIndex: "10000" }}
                    className="navbar-nav ml-auto py-0 d-none d-lg-block"
                  >
                    <Link to="/wishlist" className="btn px-0 position-relative">
                      <i
                        className="fas fa-heart text-primary"
                        style={{ fontSize: "1.2rem" }}
                      />
                      <span
                        className="badge bg-danger rounded-circle"
                        style={{
                          position: "absolute",
                          top: "-3px",
                          right: "-0.9rem",
                        }}
                      >
                        <span
                          className="text-light"
                          style={{ padding: "0.5px" }}
                        >
                          {wishlistItemCount}
                        </span>
                      </span>
                    </Link>

                    <Link
                      to="#"
                      className="btn px-3 ml-3 position-relative"
                      onClick={handleToggleDropdown}
                    >
                      <FontAwesomeIcon
                        icon={faBell}
                        style={{ color: "#FFFFFF", fontSize: "1.2rem" }}
                      />
                      <span
                        className="badge bg-danger rounded-circle"
                        style={{
                          position: "absolute",
                          top: "-3px",
                          right: "0.35rem",
                        }}
                      >
                        <span
                          className="text-light"
                          style={{ padding: "0.5px" }}
                        >
                          0
                        </span>
                      </span>
                    </Link>
                    {isDropdownOpen && (
                      // Dropdown content goes here
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "100",
                          backgroundColor: "#fff",
                          width: "400px",
                          top: "60px",
                          right: "-50px",
                        }}
                        className="abc rounded p-3"
                      >
                        <div className="notify_item">
                          {/* <div className="notify_img">
                          </div> */}
                          <div className="notify_info">
                            <p>
                              Alex commented on
                              <span>
                                Timeline Share Lorem, ipsum dolor sit amet
                                consectetur adipisicing elit. Et iusto laborum
                                consequatur quia a sed vitae doloremque illo
                                accusantium reprehenderit autem, ipsam possimus,
                                porro veniam eaque obcaecati delectus fugiat
                                illum.
                              </span>
                            </p>
                            <span className="notify_time">10 minutes ago</span>
                          </div>
                          <div className="notify_info">
                            <p>
                              Alex commented on<span>Timeline Share</span>
                            </p>
                            <span className="notify_time">10 minutes ago</span>
                          </div>
                          <div className="notify_info">
                            <p>
                              Alex commented on<span>Timeline Share</span>
                            </p>
                            <span className="notify_time">10 minutes ago</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <></>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HeaderComponent);
