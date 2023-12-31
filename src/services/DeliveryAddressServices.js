import axios from "axios";

const DeliveryAddress_API_BASE_URL = "http://localhost:8080/pharmacy-online/";

class DeliveryAddressServices {
  getDeliveryAddressByUserid(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${DeliveryAddress_API_BASE_URL}delivery-address/${user_id}`,
      config
    );
  }

  getDeliveryAddressByStatusDefault(user_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${DeliveryAddress_API_BASE_URL}delivery-address/status-default/${user_id}`,
      config
    );
  }

  deleteDeliveryAddress(user_id, address_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.delete(
      `${DeliveryAddress_API_BASE_URL}delivery-address/delete?user_id=${user_id}&address_id=${address_id}`,
      config
    );
  }

  addDeliveryAddress(user_id, deliveryAddress, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.post(
      `${DeliveryAddress_API_BASE_URL}delivery-address/add/${user_id}`,
      deliveryAddress,
      config
    );
  }
  setDefaultDeliveryAddress1(user_id, address_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.put(
      `${DeliveryAddress_API_BASE_URL}delivery-address/setDefault?user_id=${user_id}&deliveryAddressID=${address_id}`,
      config
    );
  }

  setDefaultDeliveryAddress(user_id, address_id, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.put(
      `${DeliveryAddress_API_BASE_URL}delivery-address/setDefault?user_id=${user_id}&deliveryAddressID=${address_id}`,
      null, // Assuming you're not sending a request body, so passing null
      config
    );
  }

  // addReplyByFeedback(feedbackId, userId, reply) {
  //     return axios.post(
  //         REPLY_API_BASE_URL +
  //         "feedback/" +
  //         feedbackId +
  //         "/reply/" +
  //         userId +
  //         "/add",
  //         reply
  //     );
  // }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DeliveryAddressServices();
