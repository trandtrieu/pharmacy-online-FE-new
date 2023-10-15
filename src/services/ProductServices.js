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
    ); //http://localhost:8080/pharmacy-online/products/category?category_id=2
  }


  deleteProduct(productId) {
    return axios.delete(PRODUCT_API_BASE_URL + '/' + productId);
  }

  CreateProduct(product) {
    return axios.post(PRODUCT_API_BASE_URL, product);
  }

  UpdateProduct(product, productId) {
    return axios.put(PRODUCT_API_BASE_URL + '/' + productId, product);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductServices();
