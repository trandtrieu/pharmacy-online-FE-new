import React, { useState, useEffect } from "react";
import PrescriptionServices from "../services/PrescriptionServices";
import NavbarProfile from "../account/NavbarProfile";
import { toast } from "react-toastify";
import DeliveryAddressServices from "../services/DeliveryAddressServices";
import PrescriptionAccount from "../account/PrescriptionAccount";
import DeliveryAddressAccount from "../account/DeliveryAddressAccount";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import {
  getAccountById,
  updateAccount,
  updateImage,
} from "../services/AccountService";
import OrderServices from "../services/OrderServices";
import OrderAccount from "../account/OrderAccount";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Test from "../account/Test";

const imagePath = "../assets/images/";

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
  const [account, setAccount] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [r, setR] = useState(null);
  const { accountId, token } = useAuth();
  const [order_wait, setOrder_wait] = useState([]);
  const [order_confirmed, setOrder_confirmed] = useState([]);
  const [order_delivering, setOrder_delivering] = useState([]);
  const [order_delivered, setOrder_delivered] = useState([]);
  const [order_cancel, setOrder_cancel] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAccountById(accountId, token)
      .then((response) => {
        setAccount(response.data);
        console.log("Account info:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching account:", error);
      });
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
    //order-wait-for-confirmation
    OrderServices.getOrderUserIdByWaitForConfirmation(accountId, token)
      .then((res) => {
        setOrder_wait(res.data);
        console.log("Order-wait loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
    //confirmed
    OrderServices.getOrderUserIdByConfirmed(accountId, token)
      .then((res) => {
        setOrder_confirmed(res.data);
        console.log("Order-confirmed loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
    //delivering
    OrderServices.getOrderUserIdByDelivering(accountId, token)
      .then((res) => {
        setOrder_delivering(res.data);
        console.log("Order-delivering loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
    //delivered
    OrderServices.getOrderUserIdByDelivered(accountId, token)
      .then((res) => {
        setOrder_delivered(res.data);
        console.log("Order-delivered loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
    //cancel
    OrderServices.getOrderUserIdByCancel(accountId, token)
      .then((res) => {
        setOrder_cancel(res.data);
        console.log("Order-cancel loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
    fetch("https://provinces.open-api.vn/api/p/")
      .then((response) => response.json())
      .then((data) => {
        let provinces = data;
        provinces.forEach((value) => {
          document.getElementById(
            "provinces"
          ).innerHTML += `<option value='${value.code}'>${value.name}</option>`;
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
  const fetchOrderProcessing = () => {
    OrderServices.getOrderUserIdByWaitForConfirmation(accountId, token)
      .then((res) => {
        setOrder_wait(res.data);
        console.log("Order-wait loaded successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error loading Order:", error);
      });
  };
  const fetchDistricts = (provincesID) => {
    fetch(`https://provinces.open-api.vn/api/p/${provincesID}/?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        let districts = data.districts;
        document.getElementById(
          "districts"
        ).innerHTML = `<option value=''>Select District</option>`;
        if (districts !== undefined) {
          districts.map(
            (value) =>
              (document.getElementById(
                "districts"
              ).innerHTML += `<option value='${value.code}'>${value.name}</option>`)
          );
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  const fetchWards = (districtsID) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtsID}/?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        let wards = data.wards;
        document.getElementById(
          "wards"
        ).innerHTML = `<option value=''>Select Ward</option>`;
        if (wards !== undefined) {
          wards.map(
            (value) =>
              (document.getElementById(
                "wards"
              ).innerHTML += `<option value='${value.code}'>${value.name}</option>`)
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
    let deliveryAddressData = {
      recipient_full_name: fullNameRecipient,
      recipient_phone_number: phoneRecipient,
      specific_address: `${specificAddressRecipient}, ${ward}, ${district}, ${province}.`,
    };
    const isValidPhoneNumber = /^0[0-9]{9}$/.test(
      deliveryAddressData.recipient_phone_number
    );
    if (!isValidPhoneNumber) {
      toast.error("Phone must be 10 digits");
      return;
    }
    if (
      !deliveryAddressData.recipient_full_name ||
      !deliveryAddressData.recipient_phone_number ||
      !deliveryAddressData.specific_address
    ) {
      toast.error("Please enter full information!");
    } else {
      DeliveryAddressServices.addDeliveryAddress(
        accountId,
        deliveryAddressData,
        token
      )
        .then((res) => {
          window.location.reload();
          toast.success("Created new delivery address successfully!");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error creating new delivery address");
        });
    }
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

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const form = new FormData();
      form.append("image", selectedFile);

      // console.log(form.get('image'))

      updateImage(accountId, token, form).then((response) => {
        console.log(response);
        setR(Math.random());
      });
    }
  };

  const handleNameChange = (e) => {
    setAccount((pre) => ({
      ...pre,
      name: e.target.value,
    }));
  };

  const handleDOBChange = (e) => {
    setAccount((pre) => ({
      ...pre,
      dob: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    setAccount((pre) => ({
      ...pre,
      phone: e.target.value,
    }));
  };

  const handleNameBlur = (e) => {
    if (e.target.value == "") {
      setErrors((pre) => ({
        ...pre,
        nameError: "Name can't be empty",
      }));
    } else {
      setErrors((pre) => ({
        ...pre,
        nameError: "",
      }));
    }
  };

  const handlePhoneBlur = (e) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(e.target.value)) {
      setErrors((pre) => ({
        ...pre,
        phoneError: "Phone must be 10 digits",
      }));
    } else {
      setErrors((pre) => ({
        ...pre,
        phoneError: "",
      }));
    }
  };

  const handleDOBBlur = (e) => {
    const selectedDOB = new Date(account.dob);

    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18); // Minimum age of 10 years
    if (selectedDOB > minAgeDate) {
      setErrors((pre) => ({
        ...pre,
        dobError: "you must be 18 years old",
      }));
    } else {
      setErrors((pre) => ({
        ...pre,
        dobError: "",
      }));
    }
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    if (errors.phoneError || errors.dobError || errors.nameError) {
      toast.warning("Fill all required feild");
    } else {
      let accountUpdate = {
        name: account.name,
        dob: account.dob,
        phone: account.phone,
        mail: account.mail,
      };

      updateAccount(accountId, accountUpdate, token)
        .then((response) => {
          console.log(response.data);
          toast.success("Update information successfully.");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleMailChange = (e) => {};
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
                    <div style={{ border: "1px solid black" }}>
                      <img
                        src={`${imagePath}/${account.avatar}`}
                        alt="avatar"
                        className="d-block ui-w-80"
                      />
                    </div>
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Upload new photo
                        <input
                          type="file"
                          className="account-settings-fileinput"
                          onChange={imageChangeHandler}
                        />
                      </label>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-default md-btn-flat"
                        onClick={handlerSubmit}
                      >
                        Apply
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
                        readOnly
                        className="form-control mb-1"
                        value={account.username}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        onChange={handleNameChange}
                        className="form-control"
                        value={account.name}
                        onBlur={handleNameBlur}
                      />
                    </div>
                    <p className="text-danger">{errors.nameError}</p>

                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input
                        type="text"
                        readOnly
                        onChange={handleMailChange}
                        className="form-control mb-1"
                        value={account.mail}
                      />
                      {/* <div className="alert alert-warning mt-3">
                        Your email is not confirmed. Please check your inbox.
                        <br />
                        <a href="/">Resend confirmation</a>
                      </div> */}
                    </div>
                    <div className="form-group">
                      <label className="form-label">DOB</label>
                      <input
                        type="date"
                        onChange={handleDOBChange}
                        onBlur={handleDOBBlur}
                        className="form-control"
                        value={account.dob}
                      />
                    </div>
                    <p className="text-danger">{errors.dobError}</p>

                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        value={account.phone}
                      />
                    </div>
                    <p className="text-danger">{errors.phoneError}</p>

                    <button
                      onClick={handleUpdateAccount}
                      className="btn btn-success"
                      style={{ float: "right" }}
                    >
                      Save
                    </button>
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
                <OrderAccount
                  order_wait={order_wait}
                  order_confirmed={order_confirmed}
                  order_delivering={order_delivering}
                  order_delivered={order_delivered}
                  order_cancel={order_cancel}
                  accountId={accountId}
                  token={token}
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
