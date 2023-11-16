import React, { useState, useEffect } from "react";
import CartServices from "../services/CartServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
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

const CheckoutComponent = () => {
  const history = useHistory();
  const [subTotalCost, setSubTotalCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCostAfterDiscount, setTotalCostAfterDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [carts, setCarts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [isChecked, setIsChecked] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [deliveryAddressStatusDefault, setDeliveryAddressStatusDefault] = useState("")
  const { accountId, token } = useAuth();

  useEffect(() => {
    CartServices.getListCartByAccountId(accountId, token)
      .then((res) => {
        setCarts(res.data);
      })
      .catch((error) => {
        console.error("Error loading carts:", error);
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
        setTotalCostAfterDiscount(res.data);
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

  const applyCoupon = () => {
    // Chuyển nút Apply thành trạng thái Checking
    setCheckingCoupon(true);

    setTimeout(() => {
      CheckoutServices.applyCode(accountId, 0, couponCode, token)
        .then((res) => {
          if (res && res.discountAmount !== undefined) {
            setCouponDiscount(res.discountAmount);
            setTotalCostAfterDiscount(res.totalCostAfterDiscount);
            setAppliedCoupon(couponCode);
            toast.success("Apply coupon successfully");
          } else {
            console.error("Invalid response format for applying coupon:", res);
            toast.error("Apply coupon failed");
          }
        })
        .catch((error) => {
          console.error("Error applying the coupon:", error);
          toast.error("Apply coupon failed");
        })
        .finally(() => {
          // Chuyển nút Checking thành trạng thái Apply
          setCheckingCoupon(false);
        });
    }, 3000); // Thời gian chờ 3 giây
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
    const dataToPass = {
      name: "John Doe",
      address: "123 Main Street",
      phoneNumber: "123456789",
      subTotalCost: subTotalCost,
      shippingCost: shippingCost,
    };

    localStorage.getItem("token");
    console.log(token);

    fetch("http://localhost:8080/payment/create_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: totalCostAfterDiscount.toString(),
        orderInfo: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const paymentUrl = data.url;

        window.location.href = paymentUrl;

        console.log(paymentUrl);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
    // history.push({
    //   pathname: "/bill",
    //   state: { data: dataToPass },
    // });
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
                    Cart (10 products) - $200
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
                            src={`../assets/images/${cartItem.productDetail.imageUrls}`}
                            alt="em"
                            width={70}
                            height={85}
                          />
                        </td>
                        <td className="">{cartItem.productDetail.name}</td>
                        <td className="">$ {cartItem.productDetail.price}</td>
                        <td className="">{cartItem.quantity}</td>
                        <td className=" text-danger">
                          $ {cartItem.productDetail.price * cartItem.quantity}
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
                    <button
                      className="btn text-primary"
                      onClick={openNoteModal}
                    >
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
              <div className="bg-light p-3 mb-3">
                <div className="row">
                  <div className="col-md-11 d-flex align-items-center">
                    <div className="card bg-transparent">
                      <div className="card-body p-0">
                        <blockquote className="d-flex flex-column m-0">
                          <p className="m-0">
                            <FontAwesomeIcon icon={faPhone} /> {deliveryAddressStatusDefault.recipient_phone_number} &bull;{" "}
                            <span>{deliveryAddressStatusDefault.recipient_full_name}</span>
                          </p>
                          <hr />
                          <p className="m-0">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span style={{ marginLeft: '9px' }}>
                              {deliveryAddressStatusDefault.specific_address}
                            </span>
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
                  onClick={applyCoupon}
                  disabled={checkingCoupon}
                >
                  {checkingCoupon ? "Checking..." : "Apply Coupon"}
                </button>
              </div>
            </div>{" "}
            {appliedCoupon && (
              <p className="text-success ml-1" style={{ fontSize: "15px" }}>
                Applied coupon: {appliedCoupon}
              </p>
            )}
            <h5 className="section-title position-relative text-uppercase mb-3 mt-4">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <div className="bg-light p-20 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between ">
                  <h6>Subtotal</h6>
                  <h6>${subTotalCost}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">
                    {" "}
                    {shippingCost === 0 ? "Free" : `+ $ ${shippingCost}`}
                  </h6>
                </div>
                {couponDiscount !== 0 && (
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Discount coupon</h6>
                    <h6 className="font-weight-medium">
                      {" "}
                      - ${couponDiscount}{" "}
                    </h6>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h6>Total</h6>
                  <h6>${totalCostAfterDiscount}</h6>
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

                {/* <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="banktransfer"
                    >
                      <img
                        src="../assets/images/momo.png"
                        width={30}
                        height={30}
                        alt=""
                      />
                      &nbsp; Momo
                    </label>
                  </div>
                </div> */}
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer1"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;
