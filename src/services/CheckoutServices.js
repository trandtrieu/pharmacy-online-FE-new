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
  getSubtotalAndShippingCost(accountId, cart_type, bearerToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    return axios.get(
      CART_API_BASE_URL +
        "/get-total-cart-cost-with-shipping?accountId=" +
        accountId +
        "&cartType=" +
        cart_type,
      config
    );
  } //http://localhost:8080/pharmacy-online/cart/get-total-cart-cost-with-shipping?accountId=1&cartType=0

  async applyCode(accountId, cart_type, code, authToken) {
    try {
      const response = await axios.post(
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
      );
      const discountAmount = response.data.discountAmount;
      const totalCostAfterDiscount = response.data.totalCostAfterDiscount;
      return { discountAmount, totalCostAfterDiscount };
    } catch (error) {
      console.error("Lỗi:", error);
      throw error;
    }
  }
  async applyCodePrescription(accountId, cart_type, code, authToken) {
    try {
      const response = await axios.post(
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
      );
      const discountAmount = response.data.discountAmount;
      const totalCostAfterDiscountPrescription =
        response.data.totalCostAfterDiscountPrescription;
      return { discountAmount, totalCostAfterDiscountPrescription };
    } catch (error) {
      console.error("Lỗi:", error);
      throw error;
    }
  }

  getTotalQuantity(accountId, cart_type, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.get(
      `${CART_API_BASE_URL}/get-total-quantity-in-cart?accountId=${accountId}&cartType=${cart_type}`,
      config
    );
  }
  //http://localhost:8080/pharmacy-online/cart/get-total-quantity-in-cart?accountId=1&cartType=0
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CheckoutServiceServices();
