/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  faCamera,
  faCircleXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrescriptionServices from "../services/PrescriptionServices";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import Dropzone from "react-dropzone";
import { useAuth } from "../AuthContext";

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

const CreatePrescriptionComponent = ({ history }) => {
  const { accountId, token } = useAuth();

  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    imageFile: null,
    note: "",
    errors: {},
    showModal: false,
    droppedImage: null,
  });

  const validateForm = () => {
    const errors = {};

    if (!state.imageFile) {
      errors.imageFile = "Please upload an image";
    }
    if (!state.name) {
      errors.name = "Name is required";
    }
    if (!state.phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(state.phone)) {
      errors.phone = "Phone number must have exactly 10 digits";
    }
    if (!state.email) {
      errors.email = "Email is required";
    } else if (!state.email.includes("@")) {
      errors.email = "Email cannot contain the @ symbol";
    }

    setState((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  const changeInputHandler = (event) => {
    const { name, value } = event.target;
    const errors = { ...state.errors };
    errors[name] = "";
    setState((prevState) => ({ ...prevState, [name]: value, errors }));
  };

  const changeImageHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      imageFile: event.target.files[0],
    }));
  };

  const sendPrescription = (e) => {
    e.preventDefault();
    if (validateForm()) {
      openModal();
    }
  };

  const handleConfirm = () => {
    const formData = new FormData();
    formData.append("account_id", accountId);
    formData.append("imageFile", state.imageFile);
    formData.append("name", state.name);
    formData.append("phone", state.phone);
    formData.append("email", state.email);
    formData.append("note", state.note);

    PrescriptionServices.createPrescriptions(formData, accountId, token)
      .then((res) => {
        closeModal();
        // history.push(`/profile/${accountId}`);
        window.location.href = `/profile/${accountId}`;
        toast.success("Send prescription successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to send prescription");
      });
  };

  const openModal = () => {
    setState((prevState) => ({ ...prevState, showModal: true }));
  };

  const closeModal = () => {
    setState((prevState) => ({ ...prevState, showModal: false }));
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setState((prevState) => ({
        ...prevState,
        imageFile: acceptedFiles[0],
        droppedImage: URL.createObjectURL(acceptedFiles[0]),
      }));
    }
  };
  const openImageModal = () => {
    window.open(state.droppedImage, "_blank");
  };
  const deleteImage = () => {
    setState((prevState) => ({
      ...prevState,
      imageFile: null,
      droppedImage: null,
    }));
  };
  return (
    <>
      <ReactModal
        isOpen={state.showModal}
        contentLabel="Confirmation Modal"
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Confirmation</h2>
        <p>Are you sure you want to send this prescription?</p>
        <button onClick={handleConfirm} className="btn btn-primary">
          Confirm
        </button>
        &nbsp;
        <button onClick={closeModal} className="btn btn-primary">
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
                The prescription must be valid: complete and clear information,
                intact and valid (within 5 days).{" "}
                <span className="label-require">*</span>
              </p>
              <div className="mb-3">
                <Dropzone onDrop={onDrop} multiple={false}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                      {...getRootProps()}
                      style={{
                        ...dropzoneStyles,
                        ...(isDragActive ? dropzoneActive : {}),
                      }}
                    >
                      <input {...getInputProps()} accept="image/*" />
                      {state.droppedImage ? (
                        // Check if a dropped image exists
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={openImageModal}
                            style={{
                              cursor: "pointer",
                              position: "relative",
                              maxWidth: "20%",
                            }}
                          >
                            {/* Add onClick to open the image in a larger view */}
                            <img
                              src={state.droppedImage}
                              alt="Dropped Imagee"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <button
                            onClick={deleteImage}
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="text-danger"
                            />
                          </button>
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

                {state.errors.imageFile && (
                  <div className="invalid-feedback">
                    {state.errors.imageFile}
                  </div>
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
                  className={`form-control ${
                    state.errors.name && "is-invalid"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  required
                  value={state.name}
                  onChange={changeInputHandler}
                />
                {state.errors.name && (
                  <div className="invalid-feedback">{state.errors.name}</div>
                )}
              </div>
              <div className="control-group">
                <label>
                  Phone number <span className="label-require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    state.errors.phone && "is-invalid"
                  }`}
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  required="required"
                  value={state.phone}
                  onChange={changeInputHandler}
                />
                {state.errors.phone && (
                  <div className="invalid-feedback">{state.errors.phone}</div>
                )}
              </div>
              <div className="control-group">
                <label>
                  Email <span className="label-require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    state.errors.email && "is-invalid"
                  }`}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required="required"
                  value={state.email}
                  onChange={changeInputHandler}
                />
                {state.errors.email && (
                  <div className="invalid-feedback">{state.errors.email}</div>
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
                  value={state.note}
                  onChange={changeInputHandler}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                  onClick={sendPrescription}
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
};

export default CreatePrescriptionComponent;
