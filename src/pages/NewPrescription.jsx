import React, { Component } from "react";
import PropTypes from "prop-types";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrescriptionServices from "../services/PrescriptionServices";
import { toast } from "react-toastify";
const accountId = 1;
class NewPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      imageFile: null,
      note: "",
      errors: {},
    };
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  validateForm = () => {
    const errors = {};

    if (!this.state.imageFile) {
      errors.imageFile = "Please upload an image";
    }
    if (!this.state.name) {
      errors.name = "Name is required";
    }
    if (!this.state.phone) {
      errors.phone = "Phone is required";
    }
    if (!this.state.email) {
      errors.email = "Email is required";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  changeInputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeImageHandler = (event) => {
    this.setState({ imageFile: event.target.files[0] });
  };

  sendPrescription = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const formData = new FormData();
      formData.append("account_id", accountId);
      formData.append("imageFile", this.state.imageFile);
      formData.append("name", this.state.name);
      formData.append("phone", this.state.phone);
      formData.append("email", this.state.email);
      formData.append("note", this.state.note);

      PrescriptionServices.createPrescriptions(formData)
        .then((res) => {
          this.props.history.push(`/profile/${accountId}`);
          toast.success("Send request prescription successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to send request prescription");
        });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <div className="row center-form px-xl-5">
          <div className="col-lg-6">
            <div className="contact-form bg-light p-30">
              <h4>
                <FontAwesomeIcon icon={faCamera} className="icon1" /> Take a
                photo of the prescription
              </h4>
              <p>
                The prescription must be valid: complete and clear information,
                intact and valid (within 5 days).{" "}
                <span className="label-require">*</span>
              </p>
              <div className="mb-3">
                <input
                  type="file"
                  className={`form-control ${errors.imageFile && "is-invalid"}`}
                  name="imageFile"
                  accept="image/*"
                  onChange={this.changeImageHandler}
                />
                {errors.imageFile && (
                  <div className="invalid-feedback">{errors.imageFile}</div>
                )}
              </div>
              <h4>
                <FontAwesomeIcon icon={faUser} className="icon1" /> Enter
                contact information
              </h4>
              <div className="control-group mb-3">
                <label>
                  Full name <span className="label-require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name && "is-invalid"}`}
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  required
                  value={this.state.name}
                  onChange={this.changeInputHandler}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="control-group">
                <label>
                  Phone number <span className="label-require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.phone && "is-invalid"}`}
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  required="required"
                  value={this.state.phone}
                  onChange={this.changeInputHandler}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
              <div className="control-group">
                <label>
                  Email <span className="label-require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required="required"
                  value={this.state.email}
                  onChange={this.changeInputHandler}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="control-group mb-3">
                <label>Note</label>
                <input
                  type="text"
                  className="form-control"
                  id="note"
                  name="note"
                  placeholder="Enter note"
                  value={this.state.note}
                  onChange={this.changeInputHandler}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                  onClick={this.sendPrescription}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-4 mb-5">
            <div className="bg-light p-30 mb-30">
              <h4>Illustrated prescription</h4>

              <img
                src="../assets/images/prescription.svg"
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
          </div>
        </div>
      </div>
    );
  }
}

export default NewPrescription;
