import { toast } from "react-toastify";
import WishListServices from "../services/WishListServices";
const addWishListProduct = (accountId, product_id, token) => {
  WishListServices.addToWishlist(accountId, product_id, token)
    .then((response) => {
      console.log("Product added to wishlist:", response.data);
      toast.success("Product added to wishlist successfully!");
    })
    .catch((error) => {
      toast.error("Please login to use this feature!");

      console.error("Error adding product to wishlist:", error);
    });
};

export default addWishListProduct;
