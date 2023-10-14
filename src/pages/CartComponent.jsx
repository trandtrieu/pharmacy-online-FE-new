import React, { Component } from "react";
import CartServices from "../services/CartServices";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const accountId = 4;
class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
    };
  }
  componentDidMount() {
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
    return total;
  }

  handleRemoveFromCart = (cartId) => {
    CartServices.removeFromCart(cartId)
      .then(() => {
        const updatedCarts = this.state.carts.filter(
          (cartItem) => cartItem.cartId !== cartId
        );
        this.setState({ carts: updatedCarts });
        toast.success("Delete product cart successfully!");
      })
      .catch((error) => {
        console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      });
  };

  handleQuantityChange = (cartId, newQuantity) => {
    // Find the cart item to update in the state
    const updatedCarts = this.state.carts.map((cartItem) => {
      if (cartItem.cartId === cartId) {
        // Update the quantity for the specified cart item
        return {
          ...cartItem,
          quantity: newQuantity,
        };
      }
      return cartItem;
    });

    // Update the state with the new cart items
    this.setState({ carts: updatedCarts });
  };

  // Function to update the cart in the database
  handleUpdateCart = () => {
    const updatedCartData = this.state.carts.map((cartItem) => {
      return {
        cartId: cartItem.cartId,
        quantity: cartItem.quantity,
      };
    });

    // Send a request to update the cart in the database
    CartServices.updateCart(updatedCartData)
      .then(() => {
        toast.success("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };
  render() {
    return (
      <>
        {/* Cart Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
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
                  {this.state.carts.map((cartItem) => (
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
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={cartItem.quantity}
                          />
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {" "}
                        ${cartItem.productDetail.price * cartItem.quantity}
                      </td>
                      <td className="align-middle">
                        <FontAwesomeIcon icon={faTrash} />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>$150</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">$10</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>$ {this.calculateTotalPrice()}</h5>
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
