import React, { Component } from "react";
import ProductServices from "../services/ProductServices";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import FeedbackServices from "../services/FeedbackServices";
import ReplyServices from "../services/ReplyServices";
import FeedbackComponent from "./FeedbackComponent";
import { AuthContext } from "../AuthContext";
import Modal from "react-modal";
import addProductToCart, { convertDollarToVND } from "../utils/cartutils";
import addWishListProduct from "../utils/wishlistutils";

class DetailProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.match.params.productId,
      product: {},
      products: [],
      imageUrls: [],
      feedbacks: [],
      replies: [],
      quantity: 1,
      isModalOpen: false,
      countFeedback: "",
    };
    this.openReply = this.openReply.bind(this);
    this.hiddenReply = this.hiddenReply.bind(this);
    this.starRating = this.starRating.bind(this);
    // this.deleteFeedback = this.deleteFeedback.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.changeOpinion = this.changeOpinion.bind(this);
    this.changeReply = this.changeReply.bind(this);
    this.postReply = this.postReply.bind(this);
  }
  static contextType = AuthContext;

  componentDidMount() {
    Modal.setAppElement("#root");
    ProductServices.getProductById(this.state.productId)
      .then((res) => {
        const productData = res.data;
        const imageUrls = productData.imageUrls || [];
        this.setState({ product: productData, imageUrls });
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error fetching product:", error);
        this.props.history.push("/home");
      });

    ProductServices.get5ProductsRandom()
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });

    FeedbackServices.getAverageRatingByProductId(this.state.productId).then(
      (res) => {
        this.setState({ average: res.data });
      }
    );

    FeedbackServices.getTotalFeedbackbyRating(this.state.productId, 1).then(
      (res) => {
        this.setState({
          feedbackOneStar: res.data,
        });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.productId, 2).then(
      (res) => {
        this.setState({ feedbackTwoStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.productId, 3).then(
      (res) => {
        this.setState({ feedbackThreeStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.productId, 4).then(
      (res) => {
        this.setState({ feedbackFourStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.productId, 5).then(
      (res) => {
        this.setState({ feedbackFiveStar: res.data });
      }
    );

    FeedbackServices.countFeedbackByProductId(this.state.productId).then(
      (res) => {
        this.setState({
          countFeedback: res.data,
        });
      }
    );

    FeedbackServices.getFeedbackByProductId(this.state.productId).then(
      (res) => {
        this.setState({
          feedbacks: res.data,
          star: res.data.rating,
        });
        console.log(res.data);

        // Lặp qua danh sách các phản hồi và lấy phản hồi cho từng phản hồi
        res.data.forEach((feedback) => {
          ReplyServices.getReplyByFeedbackId(feedback.feedback_id).then(
            (replyRes) => {
              feedback.replies = replyRes.data; // Lưu danh sách phản hồi vào phản hồi tương ứng
              this.forceUpdate(); // Cập nhật lại giao diện sau khi có dữ liệu
            }
          );
          console.log(feedback.replies);
        });
      }
    );
    if (this.state.product.type === 0) {
      this.openModal();
      console.log("check type: " + this.state.product.type);
    }
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
    console.log("opened");
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  // deleteFeedback(id) {
  //   FeedbackServices.deleteFeedback(id).then((res) => {
  //     this.setState({
  //       feedbacks: this.state.feedbacks.filter(
  //         (feedback) => feedback.feedback_id !== id
  //       ),
  //     });
  //   });
  // }

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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    }
  };

  postReply = (feedbackId) => {
    // e.preventDefault();

    if (this.state.replyByFeedback.trim() === "") {
      toast.error("Reply cannot be empty");
    } else {
      let reply = {
        reply_feedback: this.state.replyByFeedback,
      };
      ReplyServices.addReplyByFeedback(feedbackId, 1, reply).then((res) => {
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
  handleQuantityChange = (change) => {
    // Hàm này cập nhật số lượng dựa trên sự thay đổi (+1 hoặc -1)
    this.setState((prevState) => {
      const newQuantity = prevState.quantity + change;
      return { quantity: newQuantity };
    });
  };
  handleAddToCart = async (productId, quantity) => {
    const { accountId, token } = this.context;
    await addProductToCart(accountId, productId, quantity, token);
    await window.location.reload();
  };
  handleAddtoWishlist = (productId) => {
    const { accountId, token } = this.context;
    addWishListProduct(accountId, productId, token);
  };
  createPrescription = () => {
    const { accountId, token } = this.context;

    if (accountId && token) {
      this.props.history.push(`/create-prescription`);
    } else {
      this.props.history.push(`/login`);
    }
  };

  render() {
    const { accountId, token } = this.context;

    return (
      <>
        {/* Shop Detail Start */}
        <div className="container-fluid pb-5">
          <div className="row px-xl-5">
            <div className="col-lg-4 mb-30">
              <div
                id="product-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner bg-light">
                  {this.state.imageUrls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        className="w-100 h-100"
                        // src={imageUrl}
                        // src={
                        //   imageUrl?.startsWith("https")
                        //     ? imageUrl
                        //     : `../assets/images/${imageUrl}`
                        // }
                        src={
                          imageUrl?.startsWith("https")
                            ? imageUrl
                            : `../assets/images/${imageUrl}`
                        }
                        alt={`Imagee ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                {this.state.imageUrls.length === 1 ? null : (
                  <>
                    <a
                      className="carousel-control-prev"
                      href="#product-carousel"
                      data-slide="prev"
                    >
                      <i className="fa fa-2x fa-angle-left text-dark" />
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#product-carousel"
                      data-slide="next"
                    >
                      <i className="fa fa-2x fa-angle-right text-dark" />
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-8 bg-light pt-3">
              <div className="ps-lg-3">
                <p className="">Brand: {this.state.product.brand}</p>

                <h4 className="title text-dark">{this.state.product.name}</h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <span className="mr-1">{this.state.average}</span>
                    <FontAwesomeIcon icon={faStar} />
                    {/* <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} /> */}
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1 " />
                    {this.state.product.quantity}
                  </span>
                  {this.state.product.quantity !== 0 ? (
                    <span className="text-success ms-2 ml-1"> In stock</span>
                  ) : (
                    <span className="text-danger ms-2 ml-1"> Out of Stock</span>
                  )}
                </div>
                <div className="mb-3">
                  <span className="h2">
                    {convertDollarToVND(this.state.product.price)} VND
                  </span>
                  <span className="text-muted">/per box</span>
                </div>
                <div className="row">
                  <dt className="col-3">Category</dt>
                  <dd className="col-9">{this.state.product.category_name}</dd>
                  <dt className="col-3">Made In</dt>
                  <dd className="col-9">{this.state.product.madeIn}</dd>
                  <dt className="col-3">Ingredients</dt>
                  <dd className="col-9">{this.state.product.ingredients}</dd>
                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">{this.state.product.brand}</dd>
                </div>
                <hr />
                {this.state.product.type === 0 ? (
                  <div className="d-flex flex-column align-items-start mb-4 pt-2">
                    {this.state.product.quantity !== 0 ? (
                      <div
                        className="input-group quantity mb-3"
                        style={{ width: "130px" }}
                      >
                        {this.state.quantity > 0 ? (
                          <div className="input-group-btn">
                            <button
                              className="btn btn-primary btn-minus"
                              onClick={() => this.handleQuantityChange(-1)}
                            >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                        ) : (
                          <div className="input-group-btn">
                            <button
                              className="btn btn-primary btn-minus"
                              onClick={() => this.handleQuantityChange(-1)}
                              disabled
                            >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                        )}
                        <input
                          type="text"
                          className="form-control bg-secondary border-0 text-center"
                          value={this.state.quantity}
                          min={1}
                        />
                        <div className="input-group-btn">
                          <button
                            className="btn btn-primary btn-plus"
                            onClick={() => this.handleQuantityChange(1)}
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <div className="d-flex flex-column">
                      {this.state.product.quantity !== 0 ? (
                        <button
                          className="btn btn-primary px-3 mb-3"
                          onClick={() =>
                            this.handleAddToCart(
                              this.state.product.productId,
                              this.state.quantity,
                              accountId,
                              token
                            )
                          }
                        >
                          <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                        </button>
                      ) : null}
                      <button
                        className="btn btn-primary px-3"
                        onClick={() =>
                          this.handleAddtoWishlist(
                            this.state.product.productId,
                            accountId,
                            token
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faHeart} /> Add To Wishlist
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-start">
                    <p className="note-block-addcart">
                      <span>Note:</span> This product is only sold when
                      prescribed by a doctor, all information on the Website and
                      App is for reference only. Please confirm that you are a
                      pharmacist, doctor, or medical staff member who wants to
                      learn about this product
                    </p>

                    <button
                      className="btn btn-primary px-3 mr-3"
                      onClick={() => {
                        this.createPrescription();
                      }}
                    >
                      <FontAwesomeIcon icon={faFileInvoice} /> Buy with
                      prescription
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-xl-5 mt-5">
            <div className="col-lg-8">
              <div className="bg-light p-30">
                <div className="nav nav-tabs mb-4">
                  <a
                    className="nav-item nav-link text-dark active"
                    data-toggle="tab"
                    href="#tab-pane-1"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link text-dark"
                    data-toggle="tab"
                    href="#tab-pane-2"
                  >
                    Information
                  </a>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <h4 className="mb-3">Product Guidelines</h4>
                    <p>
                      <b>Precautions: </b>{" "}
                      <span>{this.state.product.precautions} </span>
                    </p>
                    <p>
                      <b>Storage: </b>{" "}
                      <span>{this.state.product.storage} </span>
                    </p>
                    <p>
                      <b>Contraindications: </b>{" "}
                      <span>{this.state.product.contraindications} </span>
                    </p>
                    <p>
                      <b>Dosage and usage: </b>{" "}
                      <span>{this.state.product.dosageAndUsage} </span>
                    </p>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-2">
                    <h4 className="mb-3">Additional Information</h4>

                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            <b>Drug interactions:</b>{" "}
                            <span>{this.state.product.drugInteractions} </span>
                          </li>
                          <li className="list-group-item px-0">
                            <b>Packaging: </b>{" "}
                            <span>{this.state.product.packaging} </span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            <b>Indications: </b>{" "}
                            <span>{this.state.product.indications} </span>
                          </li>
                          <li className="list-group-item px-0">
                            <b>Side effects: </b>{" "}
                            <span>{this.state.product.sideEffects} </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Other items</h5>
                    {this.state.products.map((product) => (
                      <div className="d-flex mb-3" key={product.product_id}>
                        <a href="/" className="me-3">
                          <img
                            className="img-md img-thumbnail"
                            src={product.imageUrls[0]}
                            alt={`Imagee 0`}
                            style={{ width: "100px", height: "96px" }}
                          />
                        </a>
                        <div className="info ml-3">
                          <p>{product.name}</p>
                          <strong className="text-dark">
                            {" "}
                            {convertDollarToVND(product.price)} VND{" "}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mb-5 mt-5">
              <h4 style={{ color: "#3D464D" }} className="mb-5 mt-5">
                Reviews <span>({this.state.countFeedback} reviews)</span>
              </h4>
              <div className="row">
                <div className="row col-md-10">
                  <div className="col-md-3">
                    <h5>Average</h5>
                    <h2>
                      {this.state.average} {this.starRating(1)}
                    </h2>{" "}
                    <br />
                    <button
                      data-toggle="modal"
                      data-target={`#myModal`}
                      className="btn btn-info rounded "
                    >
                      Send Review
                    </button>
                    <p />
                  </div>
                  <div className="col-md-9">
                    <div className="row d-flex justify-content-center">
                      <div className="row col-md-12 col-sm-12 align-items-center">
                        <div className=" col-sm-6 col-6 col-lg-4 col-md-4">
                          <div> {this.starRating(5)}</div>
                          <div>
                            {" "}
                            {this.starRating(4)}
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                          <div>
                            {" "}
                            {this.starRating(3)}
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                          <div>
                            {" "}
                            {this.starRating(2)}
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                          <div>
                            {" "}
                            {this.starRating(1)}
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                        </div>
                        <div
                          style={{ padding: 0 }}
                          className="col-md-6 col-sm-5 col-5 col-lg-5"
                        >
                          <div className="progress  mb-2 rounded ">
                            <div
                              className="progress-bar bg-warning "
                              role="progressbar"
                              style={{
                                width: `${this.calculateStarRatingPercentage(
                                  5
                                )}%`,
                              }}
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="progress mb-2 rounded">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{
                                width: `${this.calculateStarRatingPercentage(
                                  4
                                )}%`,
                              }}
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="progress mb-2 rounded">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{
                                width: `${this.calculateStarRatingPercentage(
                                  3
                                )}%`,
                              }}
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="progress mb-1 rounded">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{
                                width: `${this.calculateStarRatingPercentage(
                                  2
                                )}%`,
                              }}
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="progress mt-2 rounded">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              // style={{ width: "75%" }}
                              style={{
                                width: `${this.calculateStarRatingPercentage(
                                  1
                                )}%`,
                              }}
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                        <div className="col-md-2 col-1 col-sm-1 col-lg-1 text-center">
                          <span>{this.state.feedbackFiveStar}</span> <br />
                          <span>{this.state.feedbackFourStar}</span> <br />
                          <span>{this.state.feedbackThreeStar}</span> <br />
                          <span>{this.state.feedbackTwoStar}</span> <br />
                          <span>{this.state.feedbackOneStar}</span> <br />
                        </div>
                      </div>
                    </div>
                    <p />
                  </div>
                </div>
              </div>
            </div>

            {/* feedback */}

            <FeedbackComponent
              productId={this.state.productId}
              feedbacks={this.state.feedbacks}
              replies={this.state.replies}
            />
          </div>
          {/* send review */}
        </div>
        {/* Shop Detail End */}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Product Type Modal"
        >
          <h2>Product Type 0 Modal</h2>
          <p>This is a modal for products with type 0.</p>
          {/* Add any additional content for your modal */}
          <button onClick={this.closeModal}>Close Modal</button>
        </Modal>
      </>
    );
  }
}

export default DetailProductComponent;
