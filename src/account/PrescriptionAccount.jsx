import {
  faCircleInfo,
  faCopy,
  faEye,
  faFile,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "react-modal";

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

const PrescriptionAccount = ({
  prescriptions,
  handleDeleteConfirmed,
  copyToClipboard,
  handleRemoveFromCart,
  editEmployee,
  toPrescription,
  isDeleteConfirmationOpen,
  closeDeleteConfirmation,
  prescriptionItemToDelete,
  openDeleteConfirmation,
}) => {
  return (
    <>
      <Modal
        isOpen={isDeleteConfirmationOpen}
        onRequestClose={closeDeleteConfirmation}
        contentLabel="Delete Confirmation"
        style={customStyles}
      >
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete this item from your cart?</p>
        <button
          onClick={() => handleDeleteConfirmed(prescriptionItemToDelete)}
          className="btn btn-danger"
        >
          Delete
        </button>
        &nbsp;
        <button onClick={closeDeleteConfirmation} className="btn btn-info">
          Cancel
        </button>
      </Modal>
      <div className="tab-pane fade active show m-3" id="account-prescripitons">
        <h5>Manage My Prescriptions</h5>{" "}
        {prescriptions.length === 0 ? (
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
                  I'm sorry! DrugMart couldn't find any products in your cart.
                </h6>
                <button
                  className="btn btn-primary mb-4"
                  onClick={toPrescription}
                >
                  Create a prescription
                </button>
              </div>
            </div>
          </div>
        ) : (
          prescriptions.map((prescriptionItem) => (
            <div className="card mb-2 p-0" key={prescriptionItem.id}>
              <div className="card-header bg-light">
                <h6 className="card-title m-0 p-0">
                  Code: <span>#{prescriptionItem.id}</span>
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => copyToClipboard(prescriptionItem)}
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
                    src={`../assets/images/${prescriptionItem.imageUrls}`}
                    className="w-100 h-100 "
                    alt="..."
                  />
                </div>
                <div className="card-body ">
                  <p className="card-title mb-0">
                    Create date: {prescriptionItem.createdTime}
                    &nbsp;
                    {prescriptionItem.createdDate}
                  </p>
                  <p
                    className={
                      prescriptionItem.status === 1
                        ? "text-success"
                        : "text-warning"
                    }
                  >
                    {prescriptionItem.status === 0
                      ? "Waiting for advice"
                      : prescriptionItem.status === 1
                      ? "Confirmed"
                      : prescriptionItem.status}
                  </p>
                </div>
              </div>
              <div className="card-footer bg-light p-0 m-0 pl-2">
                <button
                  data-toggle="modal"
                  data-target={`#myModal${prescriptionItem.id}`}
                  className="btn"
                >
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                </button>
                <button
                  className="btn"
                  onClick={() => handleRemoveFromCart(prescriptionItem)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="btn"
                  onClick={() => editEmployee(prescriptionItem.id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </div>
          ))
        )}
        {prescriptions.map((prescriptionItem) => (
          <div className="container" key={prescriptionItem.id}>
            <div
              className="modal fade modal-lg"
              id={`myModal${prescriptionItem.id}`}
              role="dialog"
              style={{
                top: "70%",
                left: "50%",
                right: "auto",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Prescription detail
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Code:
                      <span className="text-dark">
                        {" "}
                        #{prescriptionItem.id}{" "}
                        <FontAwesomeIcon
                          icon={faCopy}
                          onClick={() => copyToClipboard(prescriptionItem)}
                        />
                      </span>
                    </p>
                    <p>
                      Status:
                      <span
                        className={
                          prescriptionItem.status === 1
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        {prescriptionItem.status === 0
                          ? " Waiting for advice"
                          : prescriptionItem.status === 1
                          ? " Confirmed"
                          : prescriptionItem.status}
                      </span>
                    </p>
                    <p>
                      {prescriptionItem.updatedDate &&
                      prescriptionItem.updatedTime ? (
                        <>
                          Update date:
                          <span className="text-dark">
                            {" "}
                            {prescriptionItem.updatedDate} &nbsp;
                            {prescriptionItem.updatedTime}
                          </span>
                        </>
                      ) : null}
                    </p>

                    <p>
                      Ghi chú:
                      <span className="text-dark">
                        {" "}
                        {prescriptionItem.note}
                      </span>
                    </p>
                    <p>
                      Image: {prescriptionItem.imageUrls}
                      <FontAwesomeIcon icon={faFile} />
                    </p>
                    <p>
                      Contact: {prescriptionItem.email} -{" "}
                      {prescriptionItem.phone}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
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
      </div>
    </>
  );
};

export default PrescriptionAccount;
