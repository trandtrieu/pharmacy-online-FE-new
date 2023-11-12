import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import WishListServices from "../services/WishListServices";
import CartServices from "../services/CartServices";
import { useAuth } from "../AuthContext";

const WishlistComponent = () => {
  const [wishlists, setWishlists] = useState([]);
  useState(false);
  const { accountId, token } = useAuth();

  useEffect(() => {
    WishListServices.wishlist(accountId, token)
      .then((res) => {
        setWishlists(res.data);
      })
      .catch((error) => {
        console.error("Error loading wishlist:", error);
      });
  }, [accountId, token]);

  const addProductToCart = (productId) => {
    CartServices.addToCart(accountId, productId, 1, token)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const viewProduct = (productId) => {
    // Code to navigate to product detail page
  };

  return (
    <>
      <div className="site-wrap">
        <>
          <h1>Token: {accountId}</h1>
          <section>
            <div className="container py-5">
              {wishlists.map((wishlistItem) => (
                <div
                  className="row justify-content-center"
                  key={wishlistItem.productId}
                >
                  <div className="col-md-12 col-xl-10">
                    <div className="card shadow-0 border rounded-3">
                      <div className="card-body">
                        <div className="row">
                          <div
                            className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0"
                            style={{ height: "188px", width: "40px" }}
                          >
                            {wishlistItem.imageUrls.length > 0 && (
                              <img
                                src={`../assets/images/${wishlistItem.imageUrls[0]}`}
                                alt=""
                                style={{ height: "100%", width: "100%" }}
                              />
                            )}
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="">
                              <h5
                                onClick={() =>
                                  viewProduct(wishlistItem.productId)
                                }
                              >
                                {wishlistItem.name}
                              </h5>

                              <div className="mt-1 mb-0 text-muted small">
                                <span className="text-primary"> • </span>

                                <span>{wishlistItem.brand}</span>
                              </div>

                              <p className=" mb-4 mb-md-0">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div className="d-flex flex-row align-items-center mb-1">
                              <h4 className="mb-1 me-1">
                                ${wishlistItem.price}
                              </h4>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="d-flex flex-column mt-4">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                type="button"
                                onClick={() =>
                                  viewProduct(wishlistItem.productId)
                                }
                              >
                                <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm mt-2"
                                type="button"
                                onClick={() =>
                                  addProductToCart(wishlistItem.productId)
                                }
                              >
                                <FontAwesomeIcon icon={faCartShopping} />
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm mt-2"
                                type="button"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>

        <hr className="container" />
      </div>
    </>
  );
};

export default WishlistComponent;
