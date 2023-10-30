import axios from "axios";


const REPLY_API_BASE_URL = "http://localhost:8080/pharmacy-online/";

class ReplyServices {
    getReplyByFeedbackId(feedbackId) {
        return axios.get(REPLY_API_BASE_URL + "byFeedbackId/" + feedbackId);
    }
}

export default new ReplyServices();