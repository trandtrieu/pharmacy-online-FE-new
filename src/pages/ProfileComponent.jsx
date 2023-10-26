import {
  faCircleInfo,
  faCopy,
  faEye,
  faFile,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import PrescriptionServices from "../services/PrescriptionServices";
import NavbarProfile from "../account/NavbarProfile";
import { toast } from "react-toastify";
import Modal from "react-modal";

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

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presciptions: [],
      isDeleteConfirmationOpen: false,
      presciptionItemToDelete: null,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    PrescriptionServices.getPrescriptionsByAccountId(accountId)
      .then((res) => {
        this.setState({ presciptions: res.data });
        console.log("Prescriptions loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading prescriptions:", error);
      });
  }

  handleDeleteConfirmed = (presciptionItem) => {
    PrescriptionServices.removePrescription(presciptionItem.id)
      .then(() => {
        const updatedPrescriptions = this.state.presciptions.filter(
          (prescription) => prescription.id !== presciptionItem.id
        );
        this.setState({
          presciptions: updatedPrescriptions,
          isDeleteConfirmationOpen: false,
          presciptionItemToDelete: null,
        });
        toast.success("Delete prescription successfully!");
      })
      .catch((error) => {
        console.error("Error deleting prescription:", error);
        this.closeDeleteConfirmation();
      });
  };

  handleRemoveFromCart = (presciptionItem) => {
    this.openDeleteConfirmation(presciptionItem);
  };

  openDeleteConfirmation = (presciptionItem) => {
    this.setState({
      isDeleteConfirmationOpen: true,
      presciptionItemToDelete: presciptionItem,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({
      isDeleteConfirmationOpen: false,
      presciptionItemToDelete: null,
    });
  };
  toPrescription() {
    this.props.history.push(`/create-prescription`);
  }
  copyToClipboard = (presciptionItem) => {
    const idToCopy = presciptionItem.id;
    const tempInput = document.createElement("input");
    tempInput.value = idToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Copy prescription successfully");
  };

  editEmployee(id) {
    this.props.history.push(`/edit-prescription/${id}`);
  }
  render() {
    return (
      <>
        <Modal
          isOpen={this.state.isDeleteConfirmationOpen}
          onRequestClose={this.closeDeleteConfirmation}
          contentLabel="Delete Confirmation"
          style={customStyles}
        >
          <h4>Confirm Deletion</h4>
          <p>Are you sure you want to delete this item from your cart?</p>
          <button
            onClick={() =>
              this.handleDeleteConfirmed(this.state.presciptionItemToDelete)
            }
            className="btn btn-danger"
          >
            Delete
          </button>
          &nbsp;
          <button
            onClick={this.closeDeleteConfirmation}
            className="btn btn-info"
          >
            Cancel
          </button>
        </Modal>
        <div className="container light-style flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <NavbarProfile />
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade " id="account-general">
                    <div className="card-body media align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="d-block ui-w-80"
                      />
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input
                            type="file"
                            className="account-settings-fileinput"
                          />
                        </label>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-default md-btn-flat"
                        >
                          Reset
                        </button>
                        <div className="text-light small mt-1">
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </div>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control mb-1"
                          defaultValue="nmaxwell"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Nelle Maxwell"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input
                          type="text"
                          className="form-control mb-1"
                          defaultValue="nmaxwell@mail.com"
                        />
                        <div className="alert alert-warning mt-3">
                          Your email is not confirmed. Please check your inbox.
                          <br />
                          <a href="/">Resend confirmation</a>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Company Ltd."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Current password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Repeat new password
                        </label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade active show m-3"
                    id="account-prescripitons"
                  >
                    {this.state.presciptions.length === 0 ? (
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12 d-flex flex-column align-items-center">
                            <div
                              className="empty-img mt-4"
                              style={{ width: "150px", height: "100px" }}
                            >
                              <img
                                src="../assets/images/empty-image.png"
                                alt=""
                                className="w-100 h-100"
                              />
                            </div>
                            <h6 className="mb-2">
                              I'm sorry! DrugMart couldn't find any products in
                              your cart.
                            </h6>
                            <button
                              className="btn btn-primary mb-4"
                              onClick={() => this.toPrescription()}
                            >
                              Create a prescription
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      this.state.presciptions.map((presciptionItem) => (
                        <div className="card mb-2" key={presciptionItem.id}>
                          <div class="card-header bg-light">
                            <h6 className="card-title m-0 p-0">
                              Code: <span>#{presciptionItem.id}</span>
                              <FontAwesomeIcon
                                icon={faCopy}
                                onClick={() =>
                                  this.copyToClipboard(presciptionItem)
                                }
                                className="pl-2"
                              />
                            </h6>
                          </div>
                          <div
                            className="card-prescription d-flex"
                            style={{ height: "100px" }}
                          >
                            <div className="pres-img">
                              <img
                                src={`../assets/images/${presciptionItem.imageUrls}`}
                                className="w-100 h-100 "
                                alt="..."
                              />
                            </div>
                            <div className="card-body ">
                              <p className="card-title">
                                Create date: {presciptionItem.createdTime}
                                &nbsp;
                                {presciptionItem.createdDate}
                              </p>
                              <p
                                className={
                                  presciptionItem.status === 1
                                    ? "text-success"
                                    : "text-warning"
                                }
                              >
                                {presciptionItem.status === 0
                                  ? "Waiting for advice"
                                  : presciptionItem.status === 1
                                  ? "Confirmed"
                                  : presciptionItem.status}
                              </p>
                            </div>
                          </div>
                          <div class="card-footer bg-light p-0 m-0 pl-2">
                            <button
                              data-toggle="modal"
                              data-target={`#myModal${presciptionItem.id}`}
                              className="btn"
                            >
                              <span>
                                <FontAwesomeIcon icon={faEye} />
                              </span>
                            </button>
                            <button
                              className="btn"
                              onClick={() =>
                                this.handleRemoveFromCart(presciptionItem)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              className="btn"
                              onClick={() =>
                                this.editEmployee(presciptionItem.id)
                              }
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.presciptions.map((presciptionItem) => (
          <div className="container">
            <div
              className="modal fade modal-lg"
              id={`myModal${presciptionItem.id}`}
              role="dialog"
              style={{
                top: "70%",
                left: "50%",
                right: "auto",
                transform: "translate(-50%, -50%)",
              }}
              key={presciptionItem.id}
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Prescription detail
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>
                      Code:
                      <span className="text-dark">
                        {" "}
                        #{presciptionItem.id}{" "}
                        <FontAwesomeIcon
                          icon={faCopy}
                          onClick={() => this.copyToClipboard(presciptionItem)}
                        />
                      </span>
                    </p>
                    <p>
                      Status:
                      <span
                        className={
                          presciptionItem.status === 1
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        {presciptionItem.status === 0
                          ? " Waiting for advice"
                          : presciptionItem.status === 1
                          ? " Confirmed"
                          : presciptionItem.status}
                      </span>
                    </p>
                    <p>
                      {presciptionItem.updatedDate &&
                      presciptionItem.updatedTime ? (
                        <>
                          Update date:
                          <span className="text-dark">
                            {" "}
                            {presciptionItem.updatedDate} &nbsp;
                            {presciptionItem.updatedTime}
                          </span>
                        </>
                      ) : null}
                    </p>

                    <p>
                      Ghi chú:
                      <span className="text-dark"> {presciptionItem.note}</span>
                    </p>
                    <p>
                      Image: {presciptionItem.imageUrls}
                      <FontAwesomeIcon icon={faFile} />
                    </p>
                    <p>
                      Contact: {presciptionItem.email} - {presciptionItem.phone}
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default ProfileComponent;
