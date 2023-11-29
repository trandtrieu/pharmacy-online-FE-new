import { toast } from "react-toastify";
import CartServices from "../services/CartServices";
import ProductServices from "../services/ProductServices";

export function calculateTotalPrice(carts) {
  let subTotal = 0;
  for (const cartItem of carts) {
    subTotal += cartItem.productDetail.price * cartItem.quantity;
  }

  if (subTotal >= 300000) {
    return {
      subTotal: subTotal,
      isEligibleForFreeShipping: true,
    };
  } else {
    return {
      subTotal: subTotal,
      isEligibleForFreeShipping: false,
    };
  }
}

export const convertDollarToVND = (soTien) => {
  if (typeof soTien === "number" && !isNaN(soTien)) {
    var soTienDaXuLi = soTien.toLocaleString("vi-VN");
    return soTienDaXuLi;
  } else {
    return "";
  }
};

const addProductToCart = async (accountId, productId, quantity, token) => {
  try {
    const productDetails = await ProductServices.getProductById(productId);
    const availableQuantity = productDetails.data.quantity;

    if (quantity > availableQuantity) {
      toast.error("Cannot add more than available quantity!");
      return;
    }
    const response = await CartServices.addToCart(
      accountId,
      productId,
      quantity,
      token
    );

    console.log("Product added to cart:", response.data);
    toast.success("Product added to cart successfully!");
  } catch (error) {
    toast.error("Please login to use this feature!");
    console.error("Error adding product to cart:", error);
  }
};

export default addProductToCart;
