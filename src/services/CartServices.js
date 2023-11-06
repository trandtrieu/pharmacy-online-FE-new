import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/pharmacy-online/cart";

class CartServices {
  addToCart(accountId, productId, quantity) {
    return axios.post(
      CART_API_BASE_URL +
        "/add-cart?accountId=" +
        accountId +
        "&productId=" +
        productId +
        "&quantity=" +
        quantity +
        "&cart_type=0"
    );
  } //http://localhost:8080/pharmacy-online/cart/add-cart?accountId=1&productId=16&quantity=1&cart_type=0

  getListCartByAccountId(accountId) {
    return axios.get(
      CART_API_BASE_URL + "/get-cart?accountId=" + accountId + "&cart_type=0"
    );
  } //http://localhost:8080/pharmacy-online/cart/get-cart?accountId=5

  removeFromCart(cartId) {
    return axios.delete(
      CART_API_BASE_URL + "/remove-from-cart?cartId=" + cartId
    );
  } //http://localhost:8080/pharmacy-online/cart/remove-from-cart?cartId=8

  // removeAllCart(cartItem) {
  //   return axios.delete(CART_API_BASE_URL, cartItem);
  // }

  updateCart(updatedCartData) {
    return axios.put(CART_API_BASE_URL + "/update-cart", updatedCartData);
  }

  getNumberProductInCart(accountId) {
    return axios.get(
      CART_API_BASE_URL +
        "/count-product-cart?accountId=" +
        accountId +
        "&cartType=0"
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartServices();
