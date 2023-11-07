import axios from "axios";

const DeliveryAddress_API_BASE_URL = "http://localhost:8080/pharmacy-online/";

class DeliveryAddress {
    getDeliveryAddressByUserid(user_id) {
        return axios.get(DeliveryAddress_API_BASE_URL + "delivery-address/" + user_id);
    }

    deleteDeliveryAddress(user_id, address_id) {
        return axios.delete(DeliveryAddress_API_BASE_URL + "delivery-address/delete?user_id=" + user_id + "&address_id=" + address_id)
    }

    addDeliveryAddress(user_id, deliveryAddress) {
        return axios.post(DeliveryAddress_API_BASE_URL + "delivery-address/add/" + user_id, deliveryAddress)
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
export default new DeliveryAddress();
