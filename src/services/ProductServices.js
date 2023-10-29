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
  searchProduct(keyword) {
    return axios.get(
      PRODUCT_API_BASE_URL + "/searchKeyword?keyword=" + keyword
    );
  }

  // http://localhost:8080/pharmacy-online/products/searchKeywordAndFilterPrice?keyword=co&priceFilter=price-5
  searchProductAndFilter(keyword, priceFilter) {
    {
      return axios.get(
        PRODUCT_API_BASE_URL +
          "/searchKeywordAndFilterPrice?keyword=" +
          keyword +
          "&priceFilter=" +
          priceFilter
      );
    }
  }

  filterProductAllPrice() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/allPrice");
  }

  filterProductPrice0To100() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/rangefilt01");
  }

  filterProductPrice100To200() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/rangefilt02");
  }

  filterProductPrice200To500() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/rangefilt03");
  }

  filterProductPrice500To1000() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/rangefilt04");
  }

  filterProductPriceGreaterThan1000() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/rangefilt05");
  }

  filterProductAZ() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/alphaAsc");
  }

  filterProductZA() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/alphaDesc");
  }

  filterProductPriceAsc() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/priceAsc");
  }

  filterProductPriceDesc() {
    return axios.get(PRODUCT_API_BASE_URL + "/filter/priceDesc");
  }

  searchProductsLatest() {
    return axios.get(PRODUCT_API_BASE_URL + "/search/latest");
  }
  // http://localhost:8080/pharmacy-online/products/countByRange?minPrice=0&maxPrice=100

  countProductInRange(minPrice, maxPrice) {
    return axios.get(
      PRODUCT_API_BASE_URL +
        "/countByRange?minPrice=" +
        minPrice +
        "&maxPrice=" +
        maxPrice
    );
  }

  countProductsInPriceRange(minPrice, maxPrice) {
    return axios.get(
      `${PRODUCT_API_BASE_URL}/countByRange?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }
  //http://localhost:8080/pharmacy-online/products/count?keyword=dhc&minPrice=1000&maxPrice=999999
  countProductsByKeywordAndPriceRange(keyword, minPrice, maxPrice) {
    return axios.get(
      PRODUCT_API_BASE_URL +
        "/count?keyword=" +
        keyword +
        "minPrice=" +
        minPrice +
        "&maxPrice=" +
        maxPrice
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductServices();
