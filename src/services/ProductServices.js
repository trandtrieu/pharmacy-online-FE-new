import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/pharmacy-online/products";

class ProductServices {
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }

  getProductById(productId) {
    return axios.get(PRODUCT_API_BASE_URL + "/" + productId);
  }

  getProductsByCategory(category_id) {
    return axios.get(
      PRODUCT_API_BASE_URL + "/category?category_id=" + category_id
    );
  }

  get5ProductsRandom() {
    return axios.get(PRODUCT_API_BASE_URL + "/random");
  }

  getNumberProductByCategory(category_id) {
    return axios.get(
      PRODUCT_API_BASE_URL + "/count?category_id=" + category_id
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductServices();
