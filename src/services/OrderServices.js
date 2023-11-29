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


}
export default new OrderServices();
