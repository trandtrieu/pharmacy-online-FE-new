import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/payment";

class Order {
  async getListCartByAccountIdByPrescription(orderId, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      CART_API_BASE_URL + "/order/" + orderId,
      config
    );
    return res;
  }
}

export default new Order();
