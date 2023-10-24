import React, { Component } from "react";
import CartServices from "../services/CartServices";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Modal from "react-modal";

const accountId = 1;
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
class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      isDeleteConfirmationOpen: false,
      cartItemToDelete: null,
    };
  }
  componentDidMount() {
    Modal.setAppElement("#root"); // Assuming "#root" is your root element ID

    CartServices.getListCartByAccountId(accountId)
      .then((res) => {
        this.setState({ carts: res.data });
      })
      .catch((error) => {
        console.error("Lỗi khi tải giỏ hàng:", error);
      });
  }
  viewProduct(productId) {
    this.props.history.push(`/single-product/${productId}`);
  }

  calculateTotalPrice() {
    const { carts } = this.state;
    let total = 0;
    for (const cartItem of carts) {
      total += cartItem.productDetail.price * cartItem.quantity;
    }

    // Check if the total is greater than or equal to $300
    if (total >= 300) {
      return {
        total: total,
        isEligibleForFreeShipping: true,
      };
    } else {
      return {
        total: total,
        isEligibleForFreeShipping: false,
      };
    }
  }

  handleDeleteConfirmed = (cartItem) => {
    // Perform the deletion here
    CartServices.removeFromCart(cartItem.cartId)
      .then(() => {
        const updatedCarts = this.state.carts.filter(
          (cart) => cart.cartId !== cartItem.cartId
        );
        this.setState({
          carts: updatedCarts,
          isDeleteConfirmationOpen: false,
          cartItemToDelete: null,
        });
        toast.success("Delete product cart successfully!");
      })
      .catch((error) => {
        console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
        this.closeDeleteConfirmation(); // Close the modal if an error occurs
      });
  };

  handleRemoveFromCart = (cartItem) => {
    this.openDeleteConfirmation(cartItem);
  };

  openDeleteConfirmation = (cartItem) => {
    this.setState({
      isDeleteConfirmationOpen: true,
      cartItemToDelete: cartItem,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({
      isDeleteConfirmationOpen: false,
      cartItemToDelete: null,
    });
  };
  handleQuantityChange = (cartId, newQuantity) => {
    const updatedCarts = this.state.carts.map((cartItem) => {
      if (cartItem.cartId === cartId) {
        return {
          ...cartItem,
          quantity: newQuantity,
        };
      }
      return cartItem;
    });

    this.setState({ carts: updatedCarts });
  };

  handleUpdateCart = () => {
    const updatedCartData = this.state.carts.map((cartItem) => {
      return {
        cartId: cartItem.cartId,
        quantity: cartItem.quantity,
      };
    });

    CartServices.updateCart(updatedCartData)
      .then(() => {
        toast.success("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };
  render() {
    const { total, isEligibleForFreeShipping } = this.calculateTotalPrice();

    return (
      <>
        <ReactTooltip id="my-tooltip" type="error" place="top" />
        <Modal
          isOpen={this.state.isDeleteConfirmationOpen}
          onRequestClose={this.closeDeleteConfirmation}
          contentLabel="Delete Confirmation"
          style={customStyles}
        >
          <h4>Confirm Deletion</h4>
          <p>Are you sure you want to delete this item from your cart?</p>
          <button
            onClick={() =>
              this.handleDeleteConfirmed(this.state.cartItemToDelete)
            }
            className="btn btn-danger"
          >
            Delete
          </button>
          &nbsp;
          <button
            onClick={this.closeDeleteConfirmation}
            className="btn btn-info"
          >
            Cancel
          </button>
        </Modal>
        {/* Cart Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <div className="row">
                <div className="col-md-10">
                  <div
                    className="progress mb-2"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(total / 300) * 100}%`,
                        backgroundColor: total >= 300 ? "#B8E8FC" : "#A2FF86",
                      }}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="col-md-2">
                  <h6
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Pharmacity provides free delivery for orders with a value of 30$ or higher."
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
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {this.state.carts.length === 0 ? (
                    <tr>
                      <td colSpan="5">Your cart is empty.</td>
                    </tr>
                  ) : (
                    this.state.carts.map((cartItem) => (
                      <tr key={cartItem.productId}>
                        <td className="align-middle">
                          <img
                            src="img/product-1.jpg"
                            alt=""
                            style={{ width: "50px" }}
                          />
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
                                this.handleQuantityChange(
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
                          onClick={() => this.handleRemoveFromCart(cartItem)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <button
                onClick={this.handleUpdateCart}
                className="btn btn-primary float-md-right mt-3"
              >
                Update Cart
              </button>
            </div>
            <div className="col-lg-4">
              <form className="mb-30" action>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                  </div>
                </div>
              </form>

              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Cart Total</h5>
                    <h5>$ {total}</h5>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h6>Shipping Cost</h6>
                    <h6>{isEligibleForFreeShipping ? "Free" : "$ 30"}</h6>
                  </div>

                  <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cart End */}
      </>
    );
  }
}

export default CartComponent;
