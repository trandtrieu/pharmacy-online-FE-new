import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/pharmacy-online/cart";

class CheckoutServiceServices {
  getSubTotalCart(accountId, cart_type, accessToken) {
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

  // applyCode(accountId, cart_type, code, authToken) {
  //   return axios.post(
  //     CART_API_BASE_URL +
  //       "/apply-discount?accountId=" +
  //       accountId +
  //       "&cartType=" +
  //       cart_type +
  //       "&discountCode=" +
  //       code,
  //     {},
  //     {
  //       headers: {
  //         Authorization: "Bearer " + authToken,
  //       },
  //     }
  //   );
  // } //http://localhost:8080/pharmacy-online/cart/apply-discount?accountId=5&cartType=0&discountCode=30

  applyCode(accountId, cart_type, code, authToken) {
    return axios
      .post(
        CART_API_BASE_URL +
          "/apply-discount?accountId=" +
          accountId +
          "&cartType=" +
          cart_type +
          "&discountCode=" +
          code,
        {},
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        const discountAmount = response.data.discountAmount;
        const totalCostAfterDiscount = response.data.totalCostAfterDiscount;
        return { discountAmount, totalCostAfterDiscount };
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        throw error;
      });
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CheckoutServiceServices();
