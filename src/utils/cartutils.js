export function calculateTotalPrice(carts) {
  let subTotal = 0;
  for (const cartItem of carts) {
    subTotal += cartItem.productDetail.price * cartItem.quantity;
  }

  if (subTotal >= 100) {
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
