/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CartServices from "../services/CartServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircleXmark,
  faLocationDot,
  faPhone,
  faStore,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CheckoutServices from "../services/CheckoutServices";
import { toast } from "react-toastify";
import DeliveryAddressServices from "../services/DeliveryAddressServices";
import { convertDollarToVND } from "../utils/cartutils";
import { useDataContext } from "../services/DataContext";
import "../style/CheckOutModal.css";
import DiscountServices from "../services/DiscountServices";
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
const customStyles1 = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    transform: "translate(-40%, -10%)",
    // height: "400px",
  },
};

const CheckoutComponent = () => {
  const history = useHistory();
  const { setOrderData } = useDataContext();
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [listDiscount, setListDiscount] = useState([]);

  const [couponCode, setCouponCode] = useState("");
  const [carts, setCarts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [isChecked, setIsChecked] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [deliveryAddressStatusDefault, setDeliveryAddressStatusDefault] =
    useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subTotalCost, setSubTotalCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCostAfterDiscount, setTotalCostAfterDiscount] = useState(0);
  const [totalCostBeforeDiscount, setTotalCostBeforeDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  const { accountId, token } = useAuth();

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleRadioChanges = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleCouponAction = () => {
    if (isCouponApplied) {
      cancelCoupon();
    } else {
      setCheckingCoupon(true);

      setTimeout(() => {
        CheckoutServices.applyCode(accountId, 0, couponCode, token)
          .then((res) => {
            if (res && res.discountAmount !== undefined) {
              setCouponDiscount(res.discountAmount);
              setTotalCostBeforeDiscount(res.totalCostAfterDiscount);
              setAppliedCoupon(couponCode);
              setIsCouponApplied(true);
              toast.success("Apply coupon successfully");
            } else {
              console.error(
                "Invalid response format for applying coupon:",
                res
              );
              toast.error("Apply coupon failed");
            }
          })
          .catch((error) => {
            console.error("Error applying the coupon:", error);
            toast.error("Apply coupon failed");
          })
          .finally(() => {
            setCheckingCoupon(false);
          });
      }, 3000);
    }
  };

  const applyDiscountCoupon = (selectedCoupon) => {
    setCheckingCoupon(true);

    setTimeout(() => {
      CheckoutServices.applyCode(accountId, 0, selectedCoupon.code, token)
        .then((res) => {
          if (res && res.discountAmount !== undefined) {
            setCouponDiscount(res.discountAmount);
            setTotalCostBeforeDiscount(res.totalCostAfterDiscount);
            setAppliedCoupon(selectedCoupon.code);
            setIsCouponApplied(true);
            toast.success("Apply coupon successfully");
          } else {
            toast.error("Apply coupon failed");
          }
        })
        .catch((error) => {
          toast.error("Apply coupon failed");
        })
        .finally(() => {
          setCheckingCoupon(false);
          closeDiscountModal(); // Close the discount modal after applying the coupon
        });
    }, 1000);
  };

  useEffect(() => {
    CartServices.getListCartByAccountId(accountId, 0, token)
      .then((res) => {
        setCarts(res.data);
      })
      .catch((error) => {
        console.error("Error loading carts:", error);
      });

    CheckoutServices.getTotalQuantity(accountId, 0, token)
      .then((res) => {
        setTotalQuantity(res.data);
      })
      .catch((error) => {
        console.error("Error fetching total quantity:", error);
      });
    CheckoutServices.getSubtotalAndShippingCost(accountId, 0, token)
      .then((res) => {
        setTotalCostBeforeDiscount(res.data);
      })
      .catch((error) => {
        console.error("Error fetching total quantity:", error);
      });
  }, [accountId, token]);

  useEffect(() => {
    loadSubTotalCost();
    loadShippingCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, token]);
  useEffect(() => {
    DeliveryAddressServices.getDeliveryAddressByUserid(accountId, token)
      .then((res) => {
        setDeliveryAddress(res.data);
        console.log("delivery-address: " + res.data);
      })
      .catch((error) => {
        console.error("Error loading delivery-address:", error);
      });
  }, [accountId, token]);

  useEffect(() => {
    DiscountServices.getListDiscountByAccountId(accountId)
      .then((res) => {
        setListDiscount(res.data);
        console.log("list discount " + res.data);
      })
      .catch((error) => {
        console.error("Error loading list discount:", error);
      });
  }, [accountId]);

  useEffect(() => {
    DeliveryAddressServices.getDeliveryAddressByStatusDefault(accountId, token)
      .then((res) => {
        setDeliveryAddressStatusDefault(res.data);
        console.log("delivery-address status: " + res.data);
      })
      .catch((error) => {
        console.error("Error loading delivery-address status default:", error);
      });
  }, [accountId, token]);
  const loadSubTotalCost = () => {
    CheckoutServices.getSubTotalCart(accountId, 0, token)
      .then((res) => {
        setSubTotalCost(res.data);

        setTotalCostAfterDiscount(res.data + shippingCost);
        console.log("subtotal: " + res.data);
      })
      .catch((error) => {
        console.error("Error fetching total cost:", error);
      });
  };

  const loadShippingCost = () => {
    CheckoutServices.getShippingCost(accountId, 0, token)
      .then((res) => {
        setShippingCost(res.data);
        console.log("shipping cost: " + res.data);
      })
      .catch((error) => {
        console.error("Error fetching total cost:", error);
      });
  };

  const cancelCoupon = () => {
    setCouponDiscount(0);
    setTotalCostBeforeDiscount(subTotalCost + shippingCost);
    setAppliedCoupon("");
    setIsCouponApplied(false);
    setCouponCode("");
    toast.info("Coupon canceled");
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const openNoteModal = () => {
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  const saveNote = (event) => {
    setNote(event.target.value);
  };

  const toCart = () => {
    history.push(`/cart`);
  };
  const handlePlaceOrder = () => {
    localStorage.getItem("token");
    if (selectedOptions === "cash") {
      const orderData = {
        amount: totalCostAfterDiscount,
        paymentMethod: selectedOptions,
        deliveryMethod: selectedOption,
        name: deliveryAddressStatusDefault.recipient_full_name,
        phone: deliveryAddressStatusDefault.recipient_phone_number,
        address: deliveryAddressStatusDefault.specific_address,
        note,
      };
      fetch("http://localhost:8080/payment/create_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
      openSuccessModal();
    } else {
      const orderData = {
        amount: totalCostBeforeDiscount,
        paymentMethod: selectedOptions,
        deliveryMethod: selectedOption,
        name: deliveryAddressStatusDefault.recipient_full_name,
        phone: deliveryAddressStatusDefault.recipient_phone_number,
        address: deliveryAddressStatusDefault.specific_address,
        note,
      };
      setOrderData(orderData);

      fetch("http://localhost:8080/payment/create_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const paymentUrl = data.url;

          window.location.href = paymentUrl;
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    }
  };
  const handleAddressClick = (addressId) => {
    // Đặt địa chỉ được chọn khi click vào đó
    setSelectedAddressId(addressId);
    console.log(addressId);
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
        toast.error("Error setting default delivery address:", error);
      });
  };
  const openDiscountModal = () => {
    setIsDiscountModalOpen(true);
  };

  const closeDiscountModal = () => {
    setIsDiscountModalOpen(false);
  };

  return (
    <>
      <ReactModal
        isOpen={isNoteModalOpen}
        onRequestClose={closeNoteModal}
        style={customStyles}
      >
        <h4>Enter Note</h4>
        <textarea value={note} onChange={saveNote} />
        <button className="btn btn-primary" onClick={closeNoteModal}>
          Cancel
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={closeNoteModal}>
          Save Note
        </button>
      </ReactModal>

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Checkout</span>
            </h5>
            <div className="bg-light p-30 mb-3">
              <div className="row">
                <div className="table-header pb-4">
                  <h6>
                    Cart ({totalQuantity} products) -{" "}
                    {convertDollarToVND(subTotalCost)} VND
                    <span
                      className="click-to-change pl-3 "
                      onClick={() => toCart()}
                    >
                      Click to change
                    </span>
                  </h6>
                </div>

                <table className="table table-light borderless">
                  <tbody className="">
                    {carts.map((cartItem) => (
                      <tr key={cartItem.productId}>
                        <td className="pr-0">
                          <img
                            src={cartItem.productDetail.imageUrls}
                            alt="em"
                            width={70}
                            height={85}
                          />
                        </td>
                        <td className="">{cartItem.productDetail.name}</td>
                        <td className="">
                          {" "}
                          {convertDollarToVND(cartItem.productDetail.price)} VND
                        </td>
                        <td className="">{cartItem.quantity}</td>
                        <td className=" text-danger">
                          {convertDollarToVND(
                            cartItem.productDetail.price * cartItem.quantity
                          )}{" "}
                          VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="col-md-6 px-xl-0">
                  <p className="mb-md-0 text-md-left text-dark ">
                    <p className="pt-2">Note</p>
                    <div>{note}</div>
                  </p>
                </div>
                <div className="col-md-6 px-xl-0">
                  <p className="mb-md-0 text-md-right">
                    <button className="btn btn-primary" onClick={openNoteModal}>
                      Enter note
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="d-flex justify-content-center">
                <div className="radio-button-container">
                  <div className="radio-button">
                    <input
                      type="radio"
                      className="radio-button__input"
                      id="radio1"
                      name="radio-group"
                      value="delivery"
                      checked={selectedOption === "delivery"}
                      onChange={handleRadioChange}
                    />
                    <label className="radio-button__label" for="radio1">
                      <span className="radio-button__custom"></span>
                      <FontAwesomeIcon icon={faTruckFast} /> Delivery
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      type="radio"
                      className="radio-button__input"
                      id="radio2"
                      name="radio-group"
                      value="pharmacy"
                      checked={selectedOption === "pharmacy"}
                      onChange={handleRadioChange}
                    />
                    <label className="radio-button__label" for="radio2">
                      <span className="radio-button__custom"></span>
                      <FontAwesomeIcon icon={faStore} /> Get it at the pharmacy
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {selectedOption === "delivery" && (
              <>
                {deliveryAddressStatusDefault === "" ? (
                  <div
                    style={{ backgroundColor: "#fff" }}
                    className="container-fluid"
                  >
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
                          I'm sorry! DrugMart couldn't find any delivery
                          addresses in your cart.
                        </h6>
                        <button className="btn btn-primary mb-4">
                          Create a New Address
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-light p-3 mb-3">
                    <div className="row">
                      <div className="col-md-11 d-flex align-items-center">
                        <div className="card bg-transparent">
                          <div className="card-body p-0">
                            <blockquote className="d-flex flex-column m-0">
                              <p className="m-0">
                                <FontAwesomeIcon icon={faPhone} />{" "}
                                {
                                  deliveryAddressStatusDefault.recipient_phone_number
                                }{" "}
                                &bull;{" "}
                                <span>
                                  {
                                    deliveryAddressStatusDefault.recipient_full_name
                                  }
                                </span>
                              </p>
                              <hr />
                              <p className="m-0">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span style={{ marginLeft: "9px" }}>
                                  {
                                    deliveryAddressStatusDefault.specific_address
                                  }
                                </span>
                              </p>
                            </blockquote>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-1 d-flex align-items-center">
                        <button
                          className="btn"
                          data-toggle="modal"
                          data-target="#setDefault"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {selectedOption === "pharmacy" && (
              <div className="bg-light p-3 mb-3">
                <div className="row">
                  <div className="col-md-11 d-flex align-items-center">
                    <div className="card bg-transparent">
                      <div className="card-body p-0">
                        <blockquote className="d-flex flex-column m-0">
                          <p className="m-0">
                            <FontAwesomeIcon icon={faPhone} /> DrugMart &bull;{" "}
                            <span>093243738</span>
                          </p>
                          <hr />
                          <p className="m-0">
                            <FontAwesomeIcon icon={faStore} /> Hoa Hai, Ngu Hanh
                            Son, Da Nang
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 d-flex align-items-center">
                    <button className="btn">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-4">
            {!isCouponApplied && (
              <div className="form-group mb-1">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-1"
                    placeholder=" Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="btn btn-primary p-1"
                    onClick={handleCouponAction}
                    disabled={checkingCoupon}
                  >
                    {checkingCoupon ? "Checking..." : "Apply Coupon"}
                  </button>
                </div>
              </div>
            )}
            {isCouponApplied && appliedCoupon && (
              <div className="form-group">
                <div className="input-group">
                  <p className="text-success border-0 p-1 form-control">
                    Applied coupon: {appliedCoupon}
                  </p>
                  <button
                    className="btn btn-danger p-1"
                    onClick={handleCouponAction}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <p className="ml-1" style={{ fontSize: "13px" }}>
              <span className="text-danger">(*) </span>Only one voucher per
              order
            </p>
            <button className="btn btn-primary" onClick={openDiscountModal}>
              Choose discount coupon
            </button>

            <h5 className="section-title position-relative text-uppercase mb-3 mt-4">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <div className="bg-light p-20 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between ">
                  <h6>Subtotal</h6>
                  <h6>{convertDollarToVND(subTotalCost)} VND</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">
                    {" "}
                    {shippingCost === 0
                      ? "Free"
                      : `+  ${convertDollarToVND(shippingCost)} VND`}
                  </h6>
                </div>
                {couponDiscount !== 0 && (
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Discount coupon</h6>
                    <h6 className="font-weight-medium">
                      {" "}
                      - {convertDollarToVND(couponDiscount)} VND
                    </h6>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h6>Total</h6>
                  <h6>{convertDollarToVND(totalCostBeforeDiscount)} VND</h6>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                      value="cash"
                      onChange={handleRadioChanges}
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      <img
                        src="../assets/images/cash.png"
                        width={30}
                        height={30}
                        alt=""
                      />
                      &nbsp; Cash
                    </label>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer1"
                      value="VNPay"
                      onChange={handleRadioChanges}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="banktransfer1"
                    >
                      <img
                        src="../assets/images/vnpay.png"
                        width={30}
                        height={30}
                        alt=""
                      />
                      &nbsp; VnPay
                    </label>
                  </div>
                </div>
                <hr />
                <div>
                  <div className="custom-control custom-checkbox mb-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="terms-btn"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="custom-control-label" htmlFor="terms-btn">
                      By checking the box, you agree to purchase according to
                      the <span className="text-success"> Drug Mart Terms</span>
                    </label>
                  </div>
                  <button
                    className="btn btn-block btn-primary font-weight-bold py-3"
                    disabled={!isChecked}
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                  <ReactModal
                    isOpen={isSuccessModalOpen}
                    onRequestClose={() => setIsSuccessModalOpen(false)}
                    style={customStyles}
                  >
                    <h3>Order Success!</h3>
                    <p>Please pay after receiving the goods.</p>
                    <button onClick={() => setIsSuccessModalOpen(false)}>
                      Close
                    </button>
                  </ReactModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                      position: "relative",
                      backgroundColor:
                        selectedAddressId === delivery.address_id
                          ? "#d7ffcb"
                          : "#f2f6fe",
                      cursor: "pointer",
                      marginRight: "15px",
                      marginLeft: "15px",
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
                      onClick={() =>
                        setDefaultAddress(accountId, selectedAddressId)
                      }
                      style={{ color: "#fff" }}
                      type="submit"
                      className="btn submit"
                    >
                      Set
                    </button>
                  </div>
                </div>

                <ReactModal
                  isOpen={isDiscountModalOpen}
                  onRequestClose={closeDiscountModal}
                  style={customStyles1}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <h4 className="mr-5">Your discount coupons </h4>
                    <h3>
                      {" "}
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-danger"
                        onClick={closeDiscountModal}
                      />
                    </h3>
                  </div>

                  <div
                    className=""
                    style={{ height: "255px", overflowY: "auto" }}
                  >
                    {listDiscount.map((discountItem) => (
                      <div className="row coupon ">
                        <div class="col-md-8 ">
                          <div className="coupon-list-detail">
                            <h4>{discountItem.code}</h4>
                            <p>Discount: {discountItem.discountPercentage} %</p>
                            <p>Expired date: {discountItem.expiryDate}</p>
                            <p>
                              Condition:
                              {convertDollarToVND(discountItem.condition)} VND
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                          <button
                            className="btn btn-info"
                            onClick={() => applyDiscountCoupon(discountItem)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ReactModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;
