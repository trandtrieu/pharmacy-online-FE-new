import axios from "axios";

const WISHLIST_API_BASE_URL = "http://localhost:8080/pharmacy-online/wishlist";

class WishListServices {
  addToWishlist(accountId, productId, authToken) {
    const url = `${WISHLIST_API_BASE_URL}/add-wishlist?accountId=${accountId}&productId=${productId}`;
    return axios.post(
      url,
      {}, // Request body, if needed
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
        // withCredentials: true,
      }
    );
  }

  wishlist(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(`${WISHLIST_API_BASE_URL}/${accountId}`, config);
  }

  deleteWishlistProduct(accountId, productId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.delete(
      `${WISHLIST_API_BASE_URL}/${accountId}/remove-product/${productId}`,
      config
    );
  }

  countProduct(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(`${WISHLIST_API_BASE_URL}/count/${accountId}`, config);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WishListServices();
