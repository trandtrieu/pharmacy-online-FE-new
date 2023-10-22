import { fa1, fa2 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import PrescriptionServices from "../services/PrescriptionServices";
import { toast } from "react-toastify";
const accountId = 4;
class PrescriptionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // accountId: this.props.match.params.accountId,
      name: "",
      phone: "",
      email: "",
      imageUrls: "",
      note: "",
      errorMessage: "", // Thêm trạng thái lỗi
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.changeNoteHandler = this.changeNoteHandler.bind(this);
    this.sendPresciption = this.sendPresciption.bind(this);
  }
  changeNoteHandler = (event) => {
    this.setState({ note: event.target.value });
  };
  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };
  changeImageHandler = (event) => {
    this.setState({ imageUrls: event.target.value });
  };
  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  sendPresciption = (e) => {
    e.preventDefault();

    if (
      this.state.name.trim() === "" ||
      this.state.phone.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.imageUrls.trim() === ""
    ) {
      this.setState({ errorMessage: "Vui lòng điền đầy đủ thông tin." });

      return;
    }

    if (!/^\d{10}$/.test(this.state.phone)) {
      this.setState({
        errorMessage: "Số điện thoại phải có đúng 10 chữ số.",
      });

      return;
    }
    this.setState({ errorMessage: "" });

    let prescription = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      note: this.state.note,
      imageUrls: this.state.imageUrls,
    };
    console.log("prescription => " + JSON.stringify(prescription));

    PrescriptionServices.createPrescriptions(prescription, accountId).then(
      (res) => {
        this.props.history.push("/home");
        toast.success("Send request presciption successfully");
      }
    );
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row center-form px-xl-5 ">
            <div className="col-lg-6">
              <div className="contact-form bg-light p-30">
                <div id="success" />
                <form name="sentMessage" id="contactForm">
                  <h4>
                    <FontAwesomeIcon icon={fa1} className="icon1" /> Take a
                    photo of the prescription{" "}
                  </h4>

                  <p>
                    The prescription must be valid: complete and clear
                    information, intact and valid (within 5 days).{" "}
                    <span className="label-require">*</span>
                  </p>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="file"
                      value={this.state.imageUrls}
                      onChange={this.changeImageHandler}
                    />
                    {this.state.errorMessage && (
                      <div className="help-block text-danger">
                        {this.state.errorMessage}
                      </div>
                    )}
                  </div>

                  <h4>
                    <FontAwesomeIcon icon={fa2} className="icon1" /> Enter
                    contact information
                  </h4>
                  <div className="control-group mb-3">
                    <label>
                      Full name <span className="label-require">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      required="required"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                    {this.state.errorMessage && (
                      <div className="help-block text-danger">
                        {this.state.errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="control-group">
                    <label>
                      Phone number <span className="label-require">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      required="required"
                      value={this.state.phone}
                      onChange={this.changePhoneHandler}
                    />
                    <p className="help-block text-danger" />
                  </div>
                  <div className="control-group">
                    <label>
                      Email <span className="label-require">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter email"
                      required="required"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                    <p className="help-block text-danger" />
                  </div>
                  <div className="control-group mb-3">
                    <label>Note</label>
                    <input
                      type="text"
                      className="form-control"
                      id="note"
                      placeholder="Enter note"
                      required="required"
                      value={this.state.note}
                      onChange={this.changeNoteHandler}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary py-2 px-4"
                      type="submit"
                      id="sendMessageButton"
                      onClick={this.sendPresciption}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="bg-light p-30 mb-30">
                <h4>Illustrated prescription</h4>

                <img
                  src="../assets/images/prescription-tips.png"
                  alt=""
                  className="w-100"
                />
                <p className="mb-2 mt-2">
                  1. Have information about the unit issuing the prescription
                </p>
                <p className="mb-2">
                  2. Has detailed patient information and disease diagnosis
                </p>
                <p className="mb-2">
                  3. Has drug name, content, quantity, and dosage
                </p>
                <p className="mb-2">
                  4. Valid: The prescription is only valid for 5 days from the
                  date of prescription
                </p>
                <p className="mb-2">
                  5. Have the signature and full name of the prescribing doctor
                  Note: The prescription image must be complete, not cropped or
                  out of focus
                </p>
              </div>

              {/* <div className="bg-light p-30 mb-3"></div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PrescriptionComponent;
