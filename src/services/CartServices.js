import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/pharmacy-online/cart";

class CartServices {
  addToCart(accountId, productId, quantity, authToken) {
    return axios.post(
      CART_API_BASE_URL +
        "/add-cart?accountId=" +
        accountId +
        "&productId=" +
        productId +
        "&quantity=" +
        quantity +
        "&cart_type=0",
      {},
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    );
  }

  getListCartByAccountId(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      CART_API_BASE_URL + "/get-cart?accountId=" + accountId + "&cart_type=0",
      config
    );
  }

  getListCartByAccountIdByPrescription(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      CART_API_BASE_URL + "/get-cart?accountId=" + accountId + "&cart_type=2",
      config
    );
  }

  removeFromCart(cartId) {
    return axios.delete(
      CART_API_BASE_URL + "/remove-from-cart?cartId=" + cartId
    );
  } //http://localhost:8080/pharmacy-online/cart/remove-from-cart?cartId=8

  removeAllCart(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.delete(
      `${CART_API_BASE_URL}/clear-cart?accountId=${accountId}&cartType=0`,
      config
    );
  }
  //http://localhost:8080/pharmacy-online/cart/clear-cart?accountId=1&cartType=0

  updateCart(updatedCartData) {
    return axios.put(CART_API_BASE_URL + "/update-cart", updatedCartData);
  }

  getNumberProductInCart(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${CART_API_BASE_URL}/count-product-cart?accountId=${accountId}&cartType=0`,
      config
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartServices();
