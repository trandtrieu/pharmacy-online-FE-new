import axios from "axios";

const DISCOUNT_API_BASE_URL =
  "http://localhost:8080/pharmacy-online/discount-code";

class DiscountServices {
  getListDiscountByAccountId(accountId) {
    return axios.get(DISCOUNT_API_BASE_URL + "/by-account/" + accountId);
  } //http://localhost:8080/pharmacy-online/discount-code/by-account/1
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DiscountServices();
