/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const FEEDBACK_API_BASE_URL = "http://localhost:8080/pharmacy-online/products";
const FEEDBACK_API_BASE_URL1 = "http://localhost:8080/pharmacy-online/";

class FeedbackServices {
  getFeedbackByProductId(productId) {
    return axios.get(FEEDBACK_API_BASE_URL + "/" + productId + "/feedbacks");
  }

  deleteFeedback(feedbackId) {
    return axios.delete(FEEDBACK_API_BASE_URL1 + "delete/" + feedbackId);
  }

  addFeedback(productId, user_id, feedback) {
    return axios.post(
      FEEDBACK_API_BASE_URL1 +
        "product/" +
        productId +
        "/feedback/add/" +
        user_id,
      feedback
    );
  }

  getAverageRatingByProductId(productId) {
    return axios.get(
      FEEDBACK_API_BASE_URL1 + "product/" + productId + "/averageRating"
    );
  }

  getTotalFeedbackbyRating(productId, rating) {
    return axios.get(
      FEEDBACK_API_BASE_URL1 + "product/" + productId + "/" + rating
    );
  }
}

export default new FeedbackServices();
