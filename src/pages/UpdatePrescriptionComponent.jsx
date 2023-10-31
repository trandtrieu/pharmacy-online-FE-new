import React, { Component } from "react";
import PropTypes from "prop-types";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrescriptionServices from "../services/PrescriptionServices";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import Dropzone from "react-dropzone"; // Import the dropzone hook

const accountId = 1;
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    transform: "translate(-40%, -10%)",
  },
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const dropzoneActive = {
  borderColor: "green",
};
class UpdatePrescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      phone: "",
      email: "",
      imageFile: null,
      note: "",
      errors: {},
      showModal: false,
      droppedImage: null, // Add this property
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
    } else if (!/^\d{10}$/.test(this.state.phone)) {
      errors.phone = "Phone number must have exactly 10 digits";
    }
    if (!this.state.email) {
      errors.email = "Email is required";
    } else if (!this.state.email.includes("@")) {
      errors.email = "Email cannot contain the @ symbol";
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
  updatePrescription = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.openModal();
    }
  };

  handleConfirm = () => {
    const formData = new FormData();
    formData.append("account_id", accountId);
    formData.append("imageFile", this.state.imageFile);
    formData.append("name", this.state.name);
    formData.append("phone", this.state.phone);
    formData.append("email", this.state.email);
    formData.append("note", this.state.note);

    PrescriptionServices.updatePrescription(formData, this.state.id)
      .then((res) => {
        toast.success("Update prescription successfully");
        window.location.href = `/profile/${accountId}`;
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to update prescription");
      });
  };
  componentDidMount() {
    PrescriptionServices.getPrescriptionsDetail(this.state.id).then((res) => {
      let prescription = res.data;
      this.setState({
        name: prescription.name,
        phone: prescription.phone,
        email: prescription.email,
        note: prescription.note,
        imageFile: prescription.imageFile || null,
      });
    });
  }
  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      this.setState({
        imageFile: acceptedFiles[0],
        droppedImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Confirmation Modal"
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2>Confirmation</h2>
          <p>Are you sure you want to send this prescription?</p>
          <button onClick={this.handleConfirm} className="btn btn-primary">
            Confirm
          </button>
          &nbsp;
          <button onClick={this.closeModal} className="btn btn-primary">
            Cancel
          </button>
        </ReactModal>
        <div className="container-fluid">
          <div className="row center-form px-xl-5">
            <div className="col-lg-6">
              <div className="contact-form bg-light p-30">
                <h4>
                  <FontAwesomeIcon icon={faCamera} className="icon1" /> Take a
                  photo of the prescription
                </h4>
                <p>
                  The prescription must be valid: complete and clear
                  information, intact and valid (within 5 days).{" "}
                  <span className="label-require">*</span>
                </p>
                <div className="mb-3">
                  {/* Use the Dropzone component here */}
                  <Dropzone onDrop={this.onDrop} multiple={false}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          ...dropzoneStyles,
                          ...(isDragActive ? dropzoneActive : {}),
                        }}
                      >
                        <input {...getInputProps()} accept="image/*" />
                        {this.state.droppedImage ? ( // Check if a dropped image exists
                          <div>
                            <img
                              src={this.state.droppedImage}
                              alt="Dropped Imagee"
                              style={{ maxWidth: "20%" }}
                            />
                          </div>
                        ) : isDragActive ? (
                          <p>Drop the image here ...</p>
                        ) : (
                          <p>
                            Drag 'n' drop an image here, or click to select an
                            image
                          </p>
                        )}
                      </div>
                    )}
                  </Dropzone>

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
                    onClick={this.updatePrescription}
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
      </>
    );
  }
}

export default UpdatePrescriptionComponent;
