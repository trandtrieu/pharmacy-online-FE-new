import React, { createContext, useContext } from "react";
import CartServices from "./services/CartServices";
import { toast } from "react-toastify";
import { AuthContext, useAuth } from "./AuthContext";
import WishListServices from "./services/WishListServices";

const CartContext = createContext();

class CartProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemCount: 0,
      wishlistItemCount: 0,
    };
    this.updateCartItemCount = this.updateCartItemCount.bind(this);
    this.updateWishlistItemCount = this.updateWishlistItemCount.bind(this);
  }
  static contextType = AuthContext;

  async updateCartItemCount() {
    try {
      const { accountId, token } = this.context;
      const res = await CartServices.getNumberProductInCart(accountId, token);
      this.setState({ cartItemCount: res.data });
    } catch (error) {}
  }
  async updateWishlistItemCount() {
    try {
      const { accountId, token } = this.context;
      const res = await WishListServices.countProduct(accountId, token);
      this.setState({ wishlistItemCount: res.data });
    } catch (error) {}
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider
        value={{
          cartItemCount: this.state.cartItemCount,
          updateCartItemCount: this.updateCartItemCount,
          wishlistItemCount: this.state.wishlistItemCount,
          updateWishlistItemCount: this.updateWishlistItemCount,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
export default CartContext;
