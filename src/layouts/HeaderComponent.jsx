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
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCart } from "../CartProvider";
import { getAccountById } from "../services/AccountService";

const HeaderComponent = (props) => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [priceFilter, setPriceFilter] = useState("price-all");
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [account, setAccount] = useState({});

  const { accountId, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { cartItemCount, updateCartItemCount } = useCart();
  const { wishlistItemCount, updateWishlistItemCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("accountId");
    setIsLoggedIn(false);
    setUsername(null);
    window.location.reload();
    window.location.href = "/home";
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProductAndFilter();
    }
  };
  useEffect(() => {
    getAccountById(accountId, token)
      .then((response) => {
        setAccount(response.data);
        console.log("Account info:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching account:", error);
      });
  }, [accountId, token]);
  const handleCartClick = () => {
    history.push("/cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim() !== "") {
      history.push(`/shop/search?keyword=${keyword}&price=${priceFilter}`);
      searchProductAndFilter(keyword, priceFilter);
    }
  };

  const handlePriceFilterChange = (newPriceFilter) => {
    setPriceFilter(newPriceFilter);
    history.push(`/shop/search?keyword=${keyword}&price=${newPriceFilter}`);
    searchProductAndFilter(keyword, newPriceFilter);
  };

  const searchProductAndFilter = (keyword, priceFilter) => {
    if (keyword.trim() === "") {
      return;
    }

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
  useEffect(() => {
    // CategoryServices.getCategoryType().then((res) => {
    //   setCategories(res.data);
    // });
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

  useEffect(() => {
    updateCartItemCount();
    updateWishlistItemCount();
  }, [accountId, token]);

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
                  src="../assets/images/logoSite.png"
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
                  {isLoggedIn ? (
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
                  ) : (
                    <Link
                      type="button"
                      className="btn btn-primary btn-sm rounded-pill "
                      style={{
                        padding: "9px 11px",
                        fontSize: "16px",
                        fontWeight: "normal",
                      }}
                      to="/login"
                    >
                      <FontAwesomeIcon icon={faUser} /> Login
                    </Link>
                  )}
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
                    ) : null}
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

                    <Link to="/blog" className="nav-item nav-link">
                      Blog
                    </Link>

                    <Link to="/cart-prescription" className="nav-item nav-link">
                      Prescription Cart
                    </Link>

                    {account.roles === "ADMIN" ? (
                      <a
                        href="http://localhost:3006/product-manage"
                        className="nav-item nav-link"
                      >
                        Admin
                      </a>
                    ) : null}
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
                    {isLoggedIn && (
                      <Link
                        to="#"
                        className="btn px-3 ml-3 position-relative"
                        onClick={handleToggleDropdown}
                      >
                        <span className="text-primary">
                          Hello {account.username}
                        </span>
                      </Link>
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
