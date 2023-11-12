/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const FEEDBACK_API_BASE_URL =
  "http://localhost:8080/pharmacy-online/product/feedback/";

class FeedbackServices {
  getFeedbackByProductId(productId) {
    return axios.get(FEEDBACK_API_BASE_URL + productId);
  }

  deleteFeedback(feedbackId, user_id) {
    return axios.delete(
      FEEDBACK_API_BASE_URL + "delete/" + feedbackId + "/" + user_id
    );
  }

  addFeedback(productId, user_id, feedback) {
    return axios.post(
      FEEDBACK_API_BASE_URL + "add/" + productId + "/" + user_id,
      feedback
    );
  }

  getAverageRatingByProductId(productId) {
    return axios.get(FEEDBACK_API_BASE_URL + "averageRating/" + productId);
  }

  getTotalFeedbackbyRating(productId, rating) {
    return axios.get(FEEDBACK_API_BASE_URL + productId + "/" + rating);
  }
}

export default new FeedbackServices();
