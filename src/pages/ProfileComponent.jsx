import React, { useState, useEffect } from "react";
import PrescriptionServices from "../services/PrescriptionServices";
import NavbarProfile from "../account/NavbarProfile";
import { toast } from "react-toastify";
import DeliveryAddressServices from "../services/DeliveryAddressServices";
import PrescriptionAccount from "../account/PrescriptionAccount";
import DeliveryAddressAccount from "../account/DeliveryAddressAccount";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import CheckoutComponent from "./CheckoutComponent";

const ProfileComponent = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [prescriptionItemToDelete, setPrescriptionItemToDelete] =
    useState(null);
  const history = useHistory();
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [fullNameRecipient, setFullNameRecipient] = useState("");
  const [phoneRecipient, setPhoneRecipient] = useState("");
  const [specificAddressRecipient, setSpecificAddressRecipient] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { accountId, token } = useAuth();
  useEffect(() => {
    PrescriptionServices.getPrescriptionsByAccountId(accountId, token)
      .then((res) => {
        console.log(accountId + "+ " + token);
        setPrescriptions(res.data);
        console.log("Prescriptions loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading prescriptions:", error);
      });

    DeliveryAddressServices.getDeliveryAddressByUserid(accountId, token)
      .then((res) => {
        setDeliveryAddress(res.data);
        console.log("DeliveryAddress loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading DeliveryAddress:", error);
      });

    fetch("https://vapi.vnappmob.com/api/province/")
      .then((response) => response.json())
      .then((data) => {
        let provinces = data.results;
        provinces.forEach((value) => {
          document.getElementById(
            "provinces"
          ).innerHTML += `<option value='${value.province_id}'>${value.province_name}</option>`;
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
    const cityDropdown = document.getElementById("provinces");
    cityDropdown.addEventListener("change", getProvinces);
    const districtDropdown = document.getElementById("districts");
    districtDropdown.addEventListener("change", getDistricts);

    return () => {
      cityDropdown.removeEventListener("change", getProvinces);
      districtDropdown.removeEventListener("change", getDistricts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, token]);

  const fetchDistricts = (provincesID) => {
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
  };

  const fetchWards = (districtsID) => {
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
  };

  const getProvinces = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceName =
      event.target.options[event.target.selectedIndex].text;
    setProvince(selectedProvinceName);

    // Tiếp tục với các thay đổi khác nếu cần
    fetchDistricts(selectedProvince);
    document.getElementById(
      "wards"
    ).innerHTML = `<option value=''>Select Ward</option>`;
  };

  const getDistricts = (event) => {
    // const selectedDistrict = event.target.value;
    const selectedDistrictName =
      event.target.options[event.target.selectedIndex].text;
    setDistrict(selectedDistrictName);
    fetchWards(event.target.value);
  };

  const getWards = (event) => {
    const selectedWardName =
      event.target.options[event.target.selectedIndex].text;
    setWard(selectedWardName);
  };

  const changeFullNameRecipient = (event) => {
    setFullNameRecipient(event.target.value);
  };
  const changePhoneRecipient = (event) => {
    setPhoneRecipient(event.target.value);
  };
  const changeSpecificAddressRecipient = (event) => {
    setSpecificAddressRecipient(event.target.value);
  };
  const createNewDeliveryAddress = (accountId) => {
    // e.preventDefault();

    let deliveryAddressData = {
      recipient_full_name: fullNameRecipient,
      recipient_phone_number: phoneRecipient,
      specific_address: `${specificAddressRecipient}, ${ward}, ${district}, ${province}.`,
    };
    console.log("deliveryAddress => " + JSON.stringify(deliveryAddress));

    if (
      !deliveryAddressData.recipient_full_name ||
      !deliveryAddressData.recipient_phone_number ||
      !deliveryAddressData.specific_address
    ) {
      toast.error("Please Enter full info!");
    } else {
      DeliveryAddressServices.addDeliveryAddress(
        accountId,
        deliveryAddressData,
        token
      ).then((res) => {
        window.location.reload();
      }, 100000);
    }
    toast.success("Created new delivery addresss successfully!");
  };
  const setDefaultAddress = (accountId, address_id) => {
    DeliveryAddressServices.setDefaultDeliveryAddress(
      accountId,
      address_id,
      token
    )
      .then((res) => {
        window.location.reload();
        toast.success("Set default delivery address successfully!");
      })
      .catch((error) => {
        console.log(token);
        // Xử lý lỗi ở đây nếu cần
        toast.error("Error setting default delivery address:", error);
      });
  };
  const deleteDeliveryAddress = (user_id, address_id) => {
    console.log("token" + token);
    DeliveryAddressServices.deleteDeliveryAddress(user_id, address_id, token)
      .then((res) => {
        setDeliveryAddress(
          deliveryAddress.filter(
            (delivery) => delivery.address_id !== address_id
          )
        );
        toast.success("Delete Address successfully!");
      })
      .catch((err) => {
        toast.error("Error deleting Address!");
      });
    // .catch((error) => {
    //   console.error("Error deleting Address:", error);
    // });
  };

  const handleRemoveFromCart = (prescriptionItem) => {
    openDeleteConfirmation(prescriptionItem);
  };

  const handleDeleteConfirmed = (prescriptionItem) => {
    PrescriptionServices.removePrescription(prescriptionItem.id)
      .then(() => {
        const updatedPrescriptions = prescriptions.filter(
          (prescription) => prescription.id !== prescriptionItem.id
        );
        setPrescriptions(updatedPrescriptions);
        setIsDeleteConfirmationOpen(false);
        setPrescriptionItemToDelete(null);
        toast.success("Delete prescription successfully!");
      })
      .catch((error) => {
        console.error("Error deleting prescription:", error);
        closeDeleteConfirmation();
      });
  };

  const openDeleteConfirmation = (prescriptionItem) => {
    setIsDeleteConfirmationOpen(true);
    setPrescriptionItemToDelete(prescriptionItem);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setPrescriptionItemToDelete(null);
  };

  const toPrescription = () => {
    history.push(`/create-prescription`);
  };

  const copyToClipboard = (presciptionItem) => {
    const idToCopy = presciptionItem.id;
    const tempInput = document.createElement("input");
    tempInput.value = idToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Copy prescription successfully");
  };

  const editEmployee = (id) => {
    history.push(`/update-prescription/${id}`);
  };

  return (
    <>
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
                      <label className="form-label">Repeat new password</label>
                    </div>{" "}
                    {/* <input type="password" className="form-control" /> */}
                  </div>
                </div>

                <PrescriptionAccount
                  prescriptions={prescriptions}
                  handleDeleteConfirmed={handleDeleteConfirmed}
                  copyToClipboard={copyToClipboard}
                  handleRemoveFromCart={handleRemoveFromCart}
                  editEmployee={editEmployee}
                  toPrescription={toPrescription}
                  isDeleteConfirmationOpen={isDeleteConfirmationOpen}
                  closeDeleteConfirmation={closeDeleteConfirmation}
                  prescriptionItemToDelete={prescriptionItemToDelete}
                  openDeleteConfirmation={openDeleteConfirmation}
                />

                <DeliveryAddressAccount
                  deliveryAddress={deliveryAddress}
                  deleteDeliveryAddress={deleteDeliveryAddress}
                  changeFullNameRecipient={changeFullNameRecipient}
                  changePhoneRecipient={changePhoneRecipient}
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                  getProvinces={getProvinces}
                  getDistricts={getDistricts}
                  getWards={getWards}
                  changeSpecificAddressRecipient={
                    changeSpecificAddressRecipient
                  }
                  setDefaultAddress={setDefaultAddress}
                  createNewDeliveryAddress={createNewDeliveryAddress}
                  accountId={accountId}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
