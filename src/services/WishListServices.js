import axios from "axios";

const WISHLIST_API_BASE_URL = "http://localhost:8080/pharmacy-online/wishlist";

class WishListServices {
  addToWishlist(accountId, productId) {
    const url = `${WISHLIST_API_BASE_URL}/add-wishlist?accountId=${accountId}&productId=${productId}`;
    return axios.post(url);
  }

  wishlist(accountId) {
    return axios.get(WISHLIST_API_BASE_URL + "/" + accountId);
  }

  deleteWishlistProduct(accountId, productId) {
    return axios.delete(
      WISHLIST_API_BASE_URL + "/" + accountId + "/remove-product/" + productId
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WishListServices();
