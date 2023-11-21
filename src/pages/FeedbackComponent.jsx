import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import FeedbackServices from "../services/FeedbackServices";
import ReplyServices from "../services/ReplyServices";
import { toast } from "react-toastify";
import ProductServices from "../services/ProductServices";
import { AuthContext } from "../AuthContext";

class FeedbackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      products: [],
      // feedbacks: props.feedbacks,
      star: "",
      replies: props.replies,
      rating: 0,
      ratingText: "",
      opinion: "",
      average: "",
      feedbackOneStar: "",
      feedbackTwoStar: "",
      feedbackThreeStar: "",
      feedbackFourStar: "",
      feedbackFiveStar: "",
      replyByFeedback: "",
      totalFeedback: "",
      product: "",
      imageUrls: [],
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    ProductServices.getProductById(this.state.productId).then((res) => {
      const productData = res.data;
      const imageUrls = productData.imageUrls || [];
      this.setState({ product: productData, imageUrls });
    });
  }
  deleteFeedback(id) {
    FeedbackServices.deleteFeedback(id).then((res) => {
      this.setState({
        feedbacks: this.state.feedbacks.filter(
          (feedback) => feedback.feedback_id !== id
        ),
      });
    });
  }

  calculateStarRatingPercentage(starRating) {
    const {
      feedbackOneStar,
      feedbackTwoStar,
      feedbackThreeStar,
      feedbackFourStar,
      feedbackFiveStar,
    } = this.state;

    // Tính tổng số lượng feedback
    const totalFeedback =
      feedbackOneStar +
      feedbackTwoStar +
      feedbackThreeStar +
      feedbackFourStar +
      feedbackFiveStar;

    if (totalFeedback === 0) {
      return 0;
    }

    let ratingCount;
    switch (starRating) {
      case 1:
        ratingCount = feedbackOneStar;
        break;
      case 2:
        ratingCount = feedbackTwoStar;
        break;
      case 3:
        ratingCount = feedbackThreeStar;
        break;
      case 4:
        ratingCount = feedbackFourStar;
        break;
      case 5:
        ratingCount = feedbackFiveStar;
        break;
      default:
        ratingCount = 0;
    }

    const ratingPercentage = (ratingCount / totalFeedback) * 100;
    return ratingPercentage;
  }

  handleRatingChange = (e) => {
    const selectedRating = parseInt(e.target.value, 10);
    this.setState({ rating: selectedRating });

    // Cập nhật nội dung của thẻ <p> dựa trên giá trị chọn
    switch (selectedRating) {
      case 1:
        this.setState({ ratingText: "Disappointed" });
        break;
      case 2:
        this.setState({ ratingText: "Dissatisfied" });
        break;
      case 3:
        this.setState({ ratingText: "Normal" });
        break;
      case 4:
        this.setState({ ratingText: "Satisfy" });
        break;
      case 5:
        this.setState({ ratingText: "Excellent" });
        break;
      default:
        this.setState({ ratingText: "Unrated" });
    }
    console.log(selectedRating);
  };

  changeOpinion = (e) => {
    this.setState({ opinion: e.target.value });
    console.log(e.target.value);
  };
  changeReply = (e) => {
    this.setState({ replyByFeedback: e.target.value });
    console.log(e.target.value);
  };
  postFeedback = (e) => {
    e.preventDefault();
    const { accountId, token } = this.context;

    if (this.state.opinion.trim() === "") {
      toast.error("Opinion cannot be empty");
    } else if (this.state.rating < 1 || this.state.rating > 5) {
      toast.error("Rating must be between 1 and 5");
    } else {
      let feedback = {
        comment: this.state.opinion,
        rating: this.state.rating,
      };
      FeedbackServices.addFeedback(
        this.state.productId,
        accountId,
        feedback,
        token
      ).then((res) => {
        toast.success("Feedback submitted successfully");
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  postReply = (feedbackId) => {
    // e.preventDefault();
    const { accountId, token } = this.context;

    if (this.state.replyByFeedback.trim() === "") {
      toast.error("Reply cannot be empty");
    } else {
      let reply = {
        reply_feedback: this.state.replyByFeedback,
      };
      ReplyServices.addReplyByFeedback(
        feedbackId,
        accountId,
        reply,
        token
      ).then((res) => {
        toast.success("Reply submitted successfully");
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  openReply = (feedbackId) => {
    const replyDiv = document.getElementById(`replyDiv${feedbackId}`);
    if (replyDiv) {
      replyDiv.style.display = "block";
    }
    console.log(replyDiv);
  };

  hiddenReply = (feedbackId) => {
    const replyDiv = document.getElementById(`replyDiv${feedbackId}`);
    if (replyDiv) {
      replyDiv.style.display = "none";
    }
  };
  starRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <FontAwesomeIcon key={i} style={{ color: "orange" }} icon={faStar} />
      );
    }
    return stars;
  };

  render() {
    return (
      <div className="container-fluid mb-5 mt-5">
        <div className="card">
          <div className="row">
            <h4 className=" mb-1">Feedback Product</h4>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  {this.props.feedbacks.map((feedback) => (
                    <div className="media mt-5 mb-5">
                      <img
                        className="mr-3 rounded-circle"
                        alt="Bootstrap Media Preview"
                        src="https://tse1.mm.bing.net/th?id=OIP.a1qV9wx2tjVVv86EW-lZaAHaE8&pid=Api&P=0&h=220"
                      />

                      <div className="media-body">
                        <div className="row">
                          <div className="col-8 d-flex">
                            <h5>
                              <b className="mr-2">{feedback.user_name}</b>
                              <span>{this.starRating(feedback.rating)}</span>
                            </h5>
                          </div>
                          <div className="col-4">
                            <div className="pull-right reply">
                              <button
                                className="btn  btn-sm shadow-none"
                                style={{ color: "#003973" }}
                                href=""
                              >
                                <span
                                  onClick={() =>
                                    this.openReply(feedback.feedback_id)
                                  }
                                  className="m-1"
                                >
                                  <FontAwesomeIcon icon={faReply} /> Reply
                                </span>
                                {feedback.user_id === 3 && (
                                  <span
                                    className="m-1"
                                    onClick={() =>
                                      this.deleteFeedback(feedback.feedback_id)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      style={{ color: "#dc3545" }}
                                      icon={faTrash}
                                    />{" "}
                                    Delete
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        {feedback.comment}
                        <br></br>
                        {feedback.created_at_time} - {feedback.created_date}
                        {/* reply form */}
                        <div className="wrap">
                          <div
                            key={feedback.feedback_id}
                            id={`replyDiv${feedback.feedback_id}`}
                            style={{ display: "none" }}
                            className="media mt-4"
                          >
                            <form style={{ width: "80%" }} action="">
                              <div className="bg-light p-2">
                                <div className="d-flex flex-row align-items-start">
                                  <img
                                    alt=""
                                    className="rounded-circle mr-3 "
                                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/396643098_1499022063974040_6274169702054090360_n.jpg?stp=dst-jpg_s206x206&_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=D5IR0pjWX8AAX-3e1p1&_nc_oc=AQlze1JL0dPlVA6q8X__lZrwqW59WXORB-6wWvS0WqGuxjMbhD7nsErQPomniGxzUx1-JAAejyWqyGjT-0tgYGHl&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTxfLI6tXHQ4Wl3HDm0xqqn_gMq5ee9SqlKuKEeukBhXg&oe=6567E054"
                                  />
                                  <textarea
                                    className="form-control ml-1 shadow-none textarea rounded"
                                    defaultValue={""}
                                    onChange={this.changeReply}
                                  />
                                </div>
                                <div className="mt-2 text-right">
                                  <button
                                    className="btn btn-info btn-sm shadow-none rounded"
                                    type="button"
                                    onClick={() =>
                                      this.postReply(feedback.feedback_id)
                                    }
                                  >
                                    Reply
                                  </button>
                                  <button
                                    onClick={() =>
                                      this.hiddenReply(feedback.feedback_id)
                                    }
                                    className="btn btn-danger btn-sm ml-1 shadow-none rounded"
                                    type="button"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          {feedback.replies &&
                            feedback.replies.map((reply) => (
                              <div key={reply.reply_id} className="media mt-4 ">
                                <img
                                  className="rounded-circle mr-3"
                                  alt="Bootstrap Media Another Preview"
                                  src="https://tse3.mm.bing.net/th?id=OIP.-eS1RlYwKg5bUqgPtV_WYAHaHa&pid=Api&P=0&h=220"
                                />
                                <div className="media-body">
                                  <div className="row">
                                    <div className="col-12 d-flex">
                                      <h5>
                                        <b>{reply.user_name}</b>
                                        {/* <span style={{ opacity: '0.7' }}></span> */}
                                      </h5>
                                    </div>
                                  </div>
                                  {reply.reply_feedback} <br></br>
                                  <span>
                                    {reply.created_at_time} {reply.created_date}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* //model send reviews */}
                  <div class="container">
                    <div
                      class="modal fade modal-lg "
                      style={{
                        maxWidth: "10000px",
                        width: "100p0x",
                        margin: "0 auto",
                        marginTop: "",
                        paddingRight: "0",
                      }}
                      id={`myModal`}
                      role="dialog"
                    >
                      <div style={{ maxWidth: "700px" }} class="modal-dialog">
                        {/* <!-- Modal content--> */}
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4
                              style={{ textAlign: "center" }}
                              class="modal-title"
                            >
                              Review Product <b></b>
                            </h4>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                          </div>
                          <div className=" container row mt-3">
                            <div className="col-md-3 col-sm-3 ">
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={`../assets/images/${this.state.product.imageUrls}`}
                                alt="loi"
                                srcSet=""
                                width={100}
                              />
                            </div>
                            <div className="col-md-9 col-sm-9 d-flex align-items-center ">
                              {/* <h4>{this.state.product.name}</h4> */}
                            </div>
                          </div>
                          <div class="modal-body">
                            <form action="">
                              <div
                                style={{
                                  height: "30px",
                                  marginBottom: "0.5rem",
                                  fontSize: "1.3rem",
                                }}
                                className="rating mt-3 mb-3"
                              >
                                <input type="number" name="rating" hidden />
                                <select
                                  required
                                  value={this.state.rating}
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    outline: "none",
                                  }}
                                  className="form-select rounded"
                                  name=""
                                  id=""
                                  onChange={this.handleRatingChange}
                                >
                                  <option value="0" selected>
                                    Star
                                  </option>
                                  <option value="1"> 1 Star </option>
                                  <option value="2"> 2 Star </option>
                                  <option value="3"> 3 Star </option>
                                  <option value="4"> 4 Star </option>
                                  <option value="5"> 5 Star </option>
                                </select>
                                <div
                                  style={{
                                    width: "30%",
                                    marginLeft: "7%",
                                  }}
                                >
                                  {this.starRating(this.state.rating)}
                                </div>
                                <div>
                                  <p
                                    style={{
                                      marginBottom: "0.5rem",
                                      marginTop: "12px",
                                      color: "#FFBD13",
                                    }}
                                    id="ratingText"
                                  >
                                    {this.state.ratingText}
                                  </p>
                                </div>
                              </div>
                              <textarea
                                onChange={this.changeOpinion}
                                name="opinion"
                                cols="30"
                                rows="5"
                                placeholder="Your opinion..."
                                required
                              ></textarea>
                              <div className="btn btn-info rounded">
                                <button
                                  onClick={this.postFeedback}
                                  style={{ color: "#fff" }}
                                  type="submit"
                                  className="btn submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackComponent;
