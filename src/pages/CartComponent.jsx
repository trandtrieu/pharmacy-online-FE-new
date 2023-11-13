import React, { useState, useEffect } from "react";
import CartServices from "../services/CartServices";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCircleQuestion,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Modal from "react-modal";
import { calculateTotalPrice } from "../utils/cartutils";
import { useAuth } from "../AuthContext";

const SHIPPING_COST = 10;
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

const CartComponent = ({ history }) => {
  const [carts, setCarts] = useState([]);
  const { accountId, token } = useAuth();

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [cartItemToDelete, setCartItemToDelete] = useState(null);
  const [isRemoveAllConfirmationOpen, setIsRemoveAllConfirmationOpen] =
    useState(false);
  useEffect(() => {
    // if (!accountId || !token) {
    //   history.push("/login");
    // } else {
    Modal.setAppElement("#root");
    CartServices.getListCartByAccountId(accountId, token)
      .then((res) => {
        setCarts(res.data);
        console.log("hello data: " + res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải giỏ hàng:", error);
      });
  }, [accountId, token, history]);

  const viewProduct = (productId) => {
    history.push(`/detail-product/${productId}`);
  };

  const handleDeleteConfirmed = (cartItem) => {
    CartServices.removeFromCart(cartItem.cartId)
      .then(() => {
        const updatedCarts = carts.filter(
          (cart) => cart.cartId !== cartItem.cartId
        );
        setCarts(updatedCarts);
        setIsDeleteConfirmationOpen(false);
        setCartItemToDelete(null);
        toast.success("Delete product cart successfully!");
      })
      .catch((error) => {
        console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
        closeDeleteConfirmation();
      });
  };

  const handleRemoveFromCart = (cartItem) => {
    openDeleteConfirmation(cartItem);
  };

  const openDeleteConfirmation = (cartItem) => {
    setIsDeleteConfirmationOpen(true);
    setCartItemToDelete(cartItem);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setCartItemToDelete(null);
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    const updatedCarts = carts.map((cartItem) =>
      cartItem.cartId === cartId
        ? {
            ...cartItem,
            quantity: newQuantity,
          }
        : cartItem
    );

    setCarts(updatedCarts);
  };

  const handleUpdateCart = () => {
    const updatedCartData = carts.map((cartItem) => ({
      cartId: cartItem.cartId,
      quantity: cartItem.quantity,
    }));

    CartServices.updateCart(updatedCartData)
      .then(() => {
        toast.success("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  const handleRemoveAllCart = () => {
    CartServices.removeAllCart(accountId, token)
      .then(() => {
        setCarts([]);
        toast.success("Remove all cart items successfully");
      })
      .catch((error) => {
        console.error("Error removing all items from the cart:", error);
      });
  };

  const openRemoveAllConfirmation = () => {
    setIsRemoveAllConfirmationOpen(true);
  };

  const closeRemoveAllConfirmation = () => {
    setIsRemoveAllConfirmationOpen(false);
  };

  const toHome = () => history.push(`/home`);
  const checkout = () => history.push(`/check-out`);

  const { subTotal, isEligibleForFreeShipping } = calculateTotalPrice(carts);
  const totalCost = subTotal + (isEligibleForFreeShipping ? 0 : SHIPPING_COST);

  return (
    <>
      <Modal
        isOpen={isDeleteConfirmationOpen}
        onRequestClose={closeDeleteConfirmation}
        contentLabel="Delete Confirmation"
        style={customStyles}
      >
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete this item from your cart?</p>
        <button
          onClick={() => handleDeleteConfirmed(cartItemToDelete)}
          className="btn btn-danger"
        >
          Delete
        </button>
        &nbsp;
        <button onClick={closeDeleteConfirmation} className="btn btn-info">
          Cancel
        </button>
      </Modal>
      <Modal
        isOpen={isRemoveAllConfirmationOpen}
        onRequestClose={closeRemoveAllConfirmation}
        contentLabel="Remove All Confirmation"
        style={customStyles}
      >
        <h5>Confirm Remove All</h5>
        <p>Are you sure you want to remove all items from your cart?</p>
        <button
          onClick={() => {
            handleRemoveAllCart();
            closeRemoveAllConfirmation();
          }}
          className="btn btn-danger"
        >
          Remove All
        </button>
        &nbsp;
        <button onClick={closeRemoveAllConfirmation} className="btn btn-info">
          Cancel
        </button>
      </Modal>

      {/* Cart Start */}
      {carts.length === 0 ? (
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
                I'm sorry! DrugMart couldn't find any products in your cart.
              </h5>
              <button className="btn btn-primary " onClick={() => toHome()}>
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <div className="row">
                <div className="col-md-8 cart-header">
                  <h3
                    className=""
                    onClick={() => {
                      toHome();
                    }}
                  >
                    <button className="btn">
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="h4 mb-0"
                      />
                    </button>
                    Cart
                  </h3>
                </div>
                <div
                  className="col-md-4 d-flex align-items-center justify-content-end remove-btn"
                  onClick={openRemoveAllConfirmation}
                >
                  <p className="mb-0 btn">Remove all cart items</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(subTotal / 100) * 100}%`,
                        backgroundColor:
                          subTotal >= 100 ? "#B8E8FC" : "#A2FF86",
                        height: "0.5 rem",
                      }}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <div className="col-md-2">
                  <h6
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Pharmacity provides free delivery for orders with a value of 100$ or higher."
                  >
                    Policy <FontAwesomeIcon icon={faCircleQuestion} />
                  </h6>
                </div>
              </div>

              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {carts.map((cartItem) => (
                    <tr key={cartItem.productId}>
                      <td
                        className="align-middle product-link"
                        onClick={() => {
                          viewProduct(cartItem.productDetail.productId);
                        }}
                      >
                        {cartItem.productDetail.name}
                      </td>
                      <td className="align-middle">
                        $ {cartItem.productDetail.price}
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <input
                            min={0}
                            type="number"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={cartItem.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                cartItem.cartId,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="align-middle">
                        ${cartItem.productDetail.price * cartItem.quantity}
                      </td>
                      <td
                        className="align-middle"
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleUpdateCart}
                className="btn btn-primary float-md-right mt-3"
              >
                Update Cart
              </button>
            </div>
            <div className="col-lg-4">
              <h5 className="section-title position-relative text-uppercase mb-3 mt-5">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h6> Sub Total</h6>
                    <h5>$ {subTotal}</h5>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h6>Shipping Cost</h6>
                    <h5>{isEligibleForFreeShipping ? "Free" : "$ 10"}</h5>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h6>Total Cost</h6>
                    <h5>{totalCost}</h5>
                  </div>

                  <button
                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                    onClick={() => {
                      checkout();
                    }}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ReactTooltip id="my-tooltip" type="error" place="top" />

      {/* Cart End */}
    </>
  );
};

export default CartComponent;
