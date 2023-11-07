import {
  faCircleInfo,
  faCopy,
  faEye,
  faFile,
  faLocationDot,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import PrescriptionServices from "../services/PrescriptionServices";
import NavbarProfile from "../account/NavbarProfile";
import { toast } from "react-toastify";
import Modal from "react-modal";
import DeliveryAddress from "../services/DeliveryAddressServices";
import DeliveryAddressServices from "../services/DeliveryAddressServices";

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
      deliveryAddress: [],
      fullNameRecipient: "",
      phoneRecipient: "",
      specificAddressRecipient: "",
      province: "",
      district: "",
      ward: "",
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

    DeliveryAddress.getDeliveryAddressByUserid(accountId)
      .then((res) => {
        this.setState({ deliveryAddress: res.data });
        console.log("DeliveryAddress loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading DeliveryAddress:", error);
      });

    fetch("https://vapi.vnappmob.com/api/province/")
      .then((response) => response.json())
      .then((data) => {
        let provinces = data.results;
        provinces.map(
          (value) =>
            (document.getElementById(
              "provinces"
            ).innerHTML += `<option value='${value.province_id}'>${value.province_name}</option>`)
        );
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
    const cityDropdown = document.getElementById("provinces");
    cityDropdown.addEventListener("change", this.getProvinces);
    const districtDropdown = document.getElementById("districts");
    districtDropdown.addEventListener("change", this.getDistricts);
  }

  fetchDistricts(provincesID) {
    fetch(`https://vapi.vnappmob.com/api/province/district/${provincesID}`)
      .then((response) => response.json())
      .then((data) => {
        let districts = data.results;
        document.getElementById(
          "districts"
        ).innerHTML = `<option value=''>Select District</option>`;
        if (districts !== undefined) {
          districts.map(
            (value) =>
              (document.getElementById(
                "districts"
              ).innerHTML += `<option value='${value.district_id}'>${value.district_name}</option>`)
          );
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }

  fetchWards(districtsID) {
    fetch(`https://vapi.vnappmob.com/api/province/ward/${districtsID}`)
      .then((response) => response.json())
      .then((data) => {
        let wards = data.results;
        document.getElementById(
          "wards"
        ).innerHTML = `<option value=''>Select Ward</option>`;
        if (wards !== undefined) {
          wards.map(
            (value) =>
              (document.getElementById(
                "wards"
              ).innerHTML += `<option value='${value.ward_id}'>${value.ward_name}</option>`)
          );
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }

  getProvinces = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceName =
      event.target.options[event.target.selectedIndex].text;
    console.log("Selected Province:", selectedProvinceName);
    this.setState({ province: selectedProvinceName });

    // Tiếp tục với các thay đổi khác nếu cần
    this.fetchDistricts(selectedProvince);
    document.getElementById(
      "wards"
    ).innerHTML = `<option value=''>Select Ward</option>`;
  };

  getDistricts = (event) => {
    // const selectedDistrict = event.target.value;
    const selectedDistrictName =
      event.target.options[event.target.selectedIndex].text;
    console.log("Selected District:", selectedDistrictName);
    this.setState({ district: selectedDistrictName });
    this.fetchWards(event.target.value);
  };

  getWards = (event) => {
    const selectedWardName =
      event.target.options[event.target.selectedIndex].text;
    console.log("Selected Wards:", selectedWardName);
    this.setState({ ward: selectedWardName });
  };

  changeFullNameRecipient = (event) => {
    console.log(event.target.value);
    this.setState({ fullNameRecipient: event.target.value });
  };
  changePhoneRecipient = (event) => {
    console.log(event.target.value);
    this.setState({ phoneRecipient: event.target.value });
  };
  changeSpecificAddressRecipient = (event) => {
    console.log(event.target.value);
    this.setState({ specificAddressRecipient: event.target.value });
  };

  createNewDeliveryAddress = (accountId) => {
    // e.preventDefault();

    let deliveryAddress = {
      recipient_full_name: this.state.fullNameRecipient,
      recipient_phone_number: this.state.phoneRecipient,
      specific_address:
        this.state.specificAddressRecipient +
        ", " +
        this.state.ward +
        ", " +
        this.state.district +
        ", " +
        this.state.province +
        ".",
    };
    console.log("deliveryAddress => " + JSON.stringify(deliveryAddress));
    DeliveryAddressServices.addDeliveryAddress(accountId, deliveryAddress).then(
      (res) => {
        setTimeout(() => {
          window.location.reload();
        }, 100000);
      }
    );
    toast.success("New Delivery Address Created successfully");
  };
  deleteDelivery_Address(user_id, address_id) {
    DeliveryAddress.deleteDeliveryAddress(user_id, address_id).then((res) => {
      this.setState({
        deliveryAddress: this.state.deliveryAddress.filter(
          (delivery) => delivery.address_id !== address_id
        ),
      });
    });
    toast.success("Delete Address successfully!");
    // .catch((error) => {
    //   console.error("Error deleting Address:", error);
    // });
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
    this.props.history.push(`/update-prescription/${id}`);
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
                        {/* <input type="password" className="form-control" /> */}
                      </div>
                      <div className="form-group">
                        <label className="form-label">New password</label>
                        {/* <input type="password" className="form-control" /> */}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Repeat new password
                        </label>
                      </div>{" "}
                      {/* <input type="password" className="form-control" /> */}
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
                          <div className="card-header bg-light">
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
                          <div className="card-footer bg-light p-0 m-0 pl-2">
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
                  <div className="tab-pane fade" id="account-delivery-address">
                    <div className="card-body pb-2">
                      <div className="form-group d-flex align-items-center justify-content-between">
                        <div>Manage Delivery Address</div>
                        <div>
                          <button
                            data-toggle="modal"
                            data-target={`#myModal`}
                            className="btn btn-primary rounded "
                          >
                            Add New Delivery Address
                          </button>
                        </div>
                      </div>
                      {/* <div className="form-group">
                        <label className="form-label"></label>
                      </div> */}
                      <div className="form-group mt-4">
                        <div>
                          {this.state.deliveryAddress.length === 0 ? (
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
                                    I'm sorry! DrugMart couldn't find any
                                    delivery addresses in your cart.
                                  </h6>
                                  {/* <button
                                    className="btn btn-primary mb-4"
                                    onClick={() => this.toPrescription()}
                                  >
                                    Create a prescription
                                  </button> */}
                                </div>
                              </div>
                            </div>
                          ) : (
                            this.state.deliveryAddress.map((delivery) => (
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  backgroundColor: "#f2f6fe",
                                }}
                                className="row mt-3 mb-3 rounded p-3"
                              >
                                <div className="col-md-1">
                                  <div
                                    className="text-center  pt-1 pb-1"
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#d7ffcb",
                                      borderRadius: "50%",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      style={{ color: "" }}
                                      icon={faLocationDot}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-10">
                                  <p>
                                    <strong>
                                      {delivery.recipient_full_name}
                                    </strong>{" "}
                                    <span className="ml-2 mr-2"> | </span>{" "}
                                    <span>
                                      {delivery.recipient_phone_number}
                                    </span>
                                  </p>
                                  <p>{delivery.specific_address}</p>
                                </div>
                                <div className="col-md-1">
                                  <button
                                    onClick={() =>
                                      this.deleteDelivery_Address(
                                        accountId,
                                        delivery.address_id
                                      )
                                    }
                                    className="btn "
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>{" "}
                      {/* <input type="password" className="form-control" /> */}
                    </div>
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
        {/* model add delivery address */}
        <div class="container">
          <div
            class="modal fade modal-lg rounded "
            style={{
              maxWidth: "10000px",
              margin: "0 auto",
              marginTop: "",
              paddingRight: "0",
            }}
            id={`myModal`}
            role="dialog"
          >
            <div
              style={{
                maxWidth: "700px",
                overflowY: "scroll",
                maxHeight: "86%",
              }}
              class="modal-dialog rounded "
            >
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <h4 style={{ textAlign: "center" }} class="modal-title">
                    Create New Delivery Address <b></b>
                  </h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className=" container row mt-3">
                  <div className=" modal-body col-md-12  ">
                    <p style={{ fontSize: "1.2rem" }}>Recipient Information </p>
                    <div class="form-group">
                      <input
                        onChange={this.changeFullNameRecipient}
                        className="form-control rounded"
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        onChange={this.changePhoneRecipient}
                        className="form-control rounded"
                        type="text"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className=" modal-body col-md-12  ">
                    <p style={{ fontSize: "1.2rem" }}>Shipping Address</p>
                    <div class="form-group">
                      <select
                        style={{ color: "757575", opacity: "1" }}
                        className="form-control rounded"
                        id="provinces"
                        onchange={this.getProvinces}
                      >
                        <option value="">Select Province/City</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <select
                        style={{ color: "757575", opacity: "1" }}
                        className="form-control rounded"
                        id="districts"
                        onchange={this.getDistricts}
                      >
                        <option value="">Select District</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <select
                        style={{ color: "757575", opacity: "1" }}
                        className="form-control rounded"
                        id="wards"
                        onChange={this.getWards}
                      >
                        <option value="">Select Ward</option>
                      </select>
                    </div>

                    <textarea
                      onChange={this.changeSpecificAddressRecipient}
                      name="opinion"
                      cols="30"
                      rows="5"
                      placeholder="Enter a specific address"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="modal-body">
                  <form action="">
                    <div className="btn btn-info rounded">
                      <button
                        onClick={() => this.createNewDeliveryAddress(accountId)}
                        style={{ color: "#fff" }}
                        type="submit"
                        className="btn submit"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfileComponent;
