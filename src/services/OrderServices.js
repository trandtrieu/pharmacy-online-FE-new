/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const Order_API_BASE_URL = "http://localhost:8080/pharmacy-online/order/";

class OrderServices {
  //wait for confirmation
  getOrderUserIdByWaitForConfirmation(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${Order_API_BASE_URL}listByAccountAndStatus/${user_id}/Wait for confirmation`,
      config
    );
  }

  // confirmed
  getOrderUserIdByConfirmed(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${Order_API_BASE_URL}listByAccountAndStatus/${user_id}/Confirmed`,
      config
    );
  }

  //delivering
  getOrderUserIdByDelivering(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${Order_API_BASE_URL}listByAccountAndStatus/${user_id}/Delivering`,
      config
    );
  }

  //delivered
  getOrderUserIdByDelivered(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${Order_API_BASE_URL}listByAccountAndStatus/${user_id}/Delivered`,
      config
    );
  }

  //cancel
  getOrderUserIdByCancel(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${Order_API_BASE_URL}listByAccountAndStatus/${user_id}/Cancel`,
      config
    );
  }

  updateOrderStatus(orderId, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.put(
      Order_API_BASE_URL + "updateStatus/" + orderId + "/Cancel",
      null, // Assuming you don't need to send a request body in this case
      config
    );
  }
}
export default new OrderServices();
