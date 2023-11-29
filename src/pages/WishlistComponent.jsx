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
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Modal from "react-modal";
import { useCart } from "../CartProvider";
import { convertDollarToVND } from "../utils/cartutils";
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    transform: "translate(-40%, -10%)",
  },
};
const WishlistComponent = () => {
  const [wishlists, setWishlists] = useState([]);
  useState(false);
  const { accountId, token } = useAuth();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { updateWishlistItemCount } = useCart();

  useEffect(() => {
    updateWishlistItemCount();
    WishListServices.wishlist(accountId, token)
      .then((res) => {
        setWishlists(res.data);
      })
      .catch((error) => {
        console.error("Error loading wishlist:", error);
      });
  }, [accountId, token, updateWishlistItemCount]);

  const openModal = (productId) => {
    setSelectedProduct(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirmationDelete = () => {
    if (selectedProduct) {
      WishListServices.deleteWishlistProduct(accountId, selectedProduct, token)
        .then((response) => {
          WishListServices.wishlist(accountId, token)
            .then((res) => {
              setWishlists(res.data);
              updateWishlistItemCount();
            })
            .catch((error) => {
              console.error(
                "Error loading wishlist after removing product:",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Error removing product from wishlist:", error);
          toast.error("Error removing product from wishlist");
        });
    }
    setSelectedProduct(null);
    setModalIsOpen(false);
  };
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
    history.push(`/detail-product/${productId}`);
  };
  const toHome = () => history.push(`/home`);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        style={customStyles}
      >
        <h5>Confirm Deletion</h5>
        <p>Are you sure you want to delete this item from your wishlist?</p>
        <button
          className="btn btn-danger mr-2"
          onClick={handleConfirmationDelete}
        >
          Delete
        </button>
        <button className="btn btn-info" onClick={closeModal}>
          Cancel
        </button>
      </Modal>
      <div className="site-wrap">
        <>
          {wishlists.length === 0 ? (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex flex-column align-items-center">
                  <div
                    className="empty-img"
                    style={{ width: "250px", height: "200px" }}
                  >
                    <img
                      src="../assets/images/empty-image.png"
                      alt=""
                      className="w-100 h-100"
                    />
                  </div>
                  <h5 className="m-4">
                    I'm sorry! DrugMart couldn't find any products in your
                    wishlist.
                  </h5>
                  <button className="btn btn-primary " onClick={() => toHome()}>
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section>
              <div className="container">
                <h3
                  className="text-center mb-3"
                  style={{
                    letterSpacing: "2px",
                  }}
                >
                  My wishlist
                </h3>

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
                                  // src={wishlistItem.imageUrls[0]}
                                  src={
                                    wishlistItem.imageUrls[0]?.startsWith(
                                      "https"
                                    )
                                      ? wishlistItem.imageUrls[0]
                                      : `assets/images/${wishlistItem.imageUrls[0]}`
                                  }
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
                                  Ipsum available, but the majority have
                                  suffered alteration in some form, by injected
                                  humour, or randomised words which don't look
                                  even slightly believable.
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                              <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">
                                  {convertDollarToVND(wishlistItem.price)} VND
                                </h4>
                              </div>
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

                                {wishlistItem.quantity !== 0 ? (
                                  <button
                                    className="btn btn-outline-primary btn-sm mt-2"
                                    type="button"
                                    onClick={() =>
                                      addProductToCart(wishlistItem.productId)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                  </button>
                                ) : null}
                                <button
                                  className="btn btn-outline-primary btn-sm mt-2"
                                  type="button"
                                  onClick={() =>
                                    openModal(wishlistItem.productId)
                                  }
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
          )}
        </>
      </div>
    </>
  );
};

export default WishlistComponent;
