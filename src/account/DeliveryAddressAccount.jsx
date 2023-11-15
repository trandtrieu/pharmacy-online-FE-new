import { faBandage, faCheckDouble, faLocationDot, faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";



const DeliveryAddressAccount = ({
  deliveryAddress,
  selectedAddressId,
  setSelectedAddressId,
  deleteDeliveryAddress,
  changeFullNameRecipient,
  changePhoneRecipient,
  getProvinces,
  getDistricts,
  getWards,
  changeSpecificAddressRecipient,
  createNewDeliveryAddress,
  setDefaultAddress,
  accountId,
}) => {
  const handleAddressClick = (addressId) => {
    // Đặt địa chỉ được chọn khi click vào đó
    setSelectedAddressId(addressId);
    console.log(addressId)
  };
  return (
    <>
      {" "}
      <div className="tab-pane fade" id="account-delivery-address">
        <div className="card-body pb-2">
          <div className="form-group d-flex align-items-center justify-content-between">
            <div>Manage Delivery Address</div>
            <div>
              <button
                data-toggle="modal"
                data-target={`#setDefault`}
                className="btn btn-info rounded "
              >
                Set Default Delivery Address
              </button>
            </div>
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

          <div className="form-group mt-4">
            <div>
              {deliveryAddress.length === 0 ? (
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
                        I'm sorry! DrugMart couldn't find any delivery addresses
                        in your cart.
                      </h6>
                    </div>
                  </div>
                </div>
              ) : (
                deliveryAddress.map((delivery) => (

                  <div
                    style={{
                      border: "1px solid #ccc",
                      backgroundColor: delivery.status_default === 1 ? "#d7ffcb" : "#f2f6fe",
                      position: 'relative'
                    }}
                    className="row mt-3 mb-3 rounded p-3"
                  >
                    <div style={{ position: 'absolute', top: '0', left: '0', margin: '5px 10px' }}>
                      {delivery.status_default === 1 && (
                        <FontAwesomeIcon icon={faCheckDouble} size="lg" />
                      )}
                    </div>

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
                        <strong>{delivery.recipient_full_name}</strong>{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <span>{delivery.recipient_phone_number}</span>
                      </p>
                      <p>{delivery.specific_address}</p>
                    </div>
                    <div className="col-md-1">
                      <button
                        onClick={() =>
                          deleteDeliveryAddress(accountId, delivery.address_id)
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
      </div >
      {/* model create */}
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
                      onChange={changeFullNameRecipient}
                      className="form-control rounded"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      onChange={changePhoneRecipient}
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
                      onchange={getProvinces}
                    >
                      <option value="">Select Province/City</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <select
                      style={{ color: "757575", opacity: "1" }}
                      className="form-control rounded"
                      id="districts"
                      onchange={getDistricts}
                    >
                      <option value="">Select District</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <select
                      style={{ color: "757575", opacity: "1" }}
                      className="form-control rounded"
                      id="wards"
                      onChange={getWards}
                    >
                      <option value="">Select Ward</option>
                    </select>
                  </div>

                  <textarea
                    onChange={changeSpecificAddressRecipient}
                    name="opinion"
                    cols="30"
                    rows="5"
                    placeholder="Enter a specific address"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="modal-body">
                {/* <form action=""> */}
                <div className="btn btn-info rounded">
                  <button
                    onClick={() => createNewDeliveryAddress(accountId)}
                    style={{ color: "#fff" }}
                    type="submit"
                    className="btn submit"
                  >
                    Create
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* model set default */}
      <div class="container">
        <div
          class="modal fade modal-lg rounded "
          style={{
            maxWidth: "10000px",
            margin: "0 auto",
            marginTop: "",
            paddingRight: "0",
          }}
          id={`setDefault`}
          role="dialog"
        >
          <div
            style={{
              maxWidth: "700px",
              overflowY: "auto",
              maxHeight: "86%",
            }}
            class="modal-dialog rounded "
          >
            {/* <!-- Modal content--> */}
            <div class="modal-content">
              <div class="modal-header">
                <h4 style={{ textAlign: "center" }} class="modal-title">
                  Set Default Delivery Address <b></b>
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className=" container mt-3">
                {deliveryAddress.map((delivery) => (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      position: 'relative',
                      backgroundColor:
                        selectedAddressId === delivery.address_id
                          ? "#d7ffcb"
                          : "#f2f6fe",
                      cursor: "pointer",
                      marginRight: '15px',
                      marginLeft: '15px'
                    }}
                    className="row mt-3 mb-3 rounded p-3"
                    onClick={() => handleAddressClick(delivery.address_id)}
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
                        <strong>{delivery.recipient_full_name}</strong>{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <span>{delivery.recipient_phone_number}</span>
                      </p>
                      <p>{delivery.specific_address}</p>
                    </div>
                  </div>
                ))}
                <div class="modal-body">
                  <div className="btn btn-info rounded">
                    <button
                      onClick={() => setDefaultAddress(accountId, selectedAddressId)}
                      style={{ color: "#fff" }}
                      type="submit"
                      className="btn submit"
                    >
                      Set
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default DeliveryAddressAccount;
