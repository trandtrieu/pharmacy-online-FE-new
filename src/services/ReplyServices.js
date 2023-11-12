import axios from "axios";

const REPLY_API_BASE_URL = "http://localhost:8080/pharmacy-online/reply";

class ReplyServices {
  getReplyByFeedbackId(feedbackId) {
    return axios.get(REPLY_API_BASE_URL + "/byFeedbackId/" + feedbackId);
  }

  addReplyByFeedback(feedbackId, userId, reply) {
    return axios.post(
      REPLY_API_BASE_URL + "/add/" + feedbackId + "/" + userId,
      reply
    ); //http://localhost:8080/pharmacy-online/reply/add/34/5
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReplyServices();
