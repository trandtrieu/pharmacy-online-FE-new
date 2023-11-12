import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/pharmacy-online/cart";

class CheckoutServiceServices {
  getTotalCart(accountId, cart_type, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      CART_API_BASE_URL +
        "/get-total-cart-cost?accountId=" +
        accountId +
        "&cartType=" +
        cart_type,
      config
    );
  }

  getShippingCost(accountId, cart_type, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      CART_API_BASE_URL +
        "/get-shipping-cost?accountId=" +
        accountId +
        "&cartType=" +
        cart_type,
      config
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CheckoutServiceServices();
