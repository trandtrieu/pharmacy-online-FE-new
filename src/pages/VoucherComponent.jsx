// Import necessary hooks and components
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import {
  getAllDiscountCodeById,
  getAllDiscountCode,
  addDiscountToAccount,
} from "../services/VoucherService";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassEnd,
  faStopwatch20,
  faTicket,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTimesCircle,
  faTimesRectangle,
} from "@fortawesome/free-regular-svg-icons";
import { convertDollarToVND } from "../utils/cartutils";

// ... other import statements ...

const VoucherComponent = () => {
  const VOUCHER_IMGS_URL = "../assets/img/voucher";
  const { accountId, token } = useAuth();
  const [discounts, setDiscounts] = useState([]);
  const [isOpen, setIsOpone] = useState(false);
  const [currentDiscountId, setCurrentDiscountId] = useState();

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

  const modelOpen = (id) => {
    setIsOpone(!isOpen);
    setCurrentDiscountId(id);
  };

  useEffect(() => {
    getAllDiscountCode(token)
      .then((res) => {
        setDiscounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateRemainingTime = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const current = new Date();

    const timeDifference = expiry - current;

    if (timeDifference <= 0) {
      return "Discount has expired";
    }

    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
  };

  const saveToAccount = (id) => {
    addDiscountToAccount(token, accountId, id)
      .then(toast.success("Saved, shop now?"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-fluid text-center">
      <img
        src={`${VOUCHER_IMGS_URL}/vouchervip.jpg`}
        className="rounded"
        height="550px"
        width="85%"
        alt=""
      />

      <h1 className="mt-5 mb-5">Special Discount</h1>

      <div className="row m-5 bg-primary pb-3">
        {discounts.map((d) => (
          <div key={d.id} className="row col-md-6">
            <img
              className="col-md-4 ml-4"
              src="https://static.thenounproject.com/png/4727320-200.png"
              alt=""
            />
            <div className="col-md-7 mt-5">
              <h4 className="text-dark">Sale {d.discountPercentage}%</h4>
              <h5>For {convertDollarToVND(d.condition)} VND minimun order</h5>
              <button
                className="btn btn-danger"
                onClick={() => saveToAccount(d.id)}
              >
                Save
              </button>{" "}
              <button
                className="btn btn-warning"
                onClick={() => modelOpen(d.id)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReactModal isOpen={isOpen} style={customStyles}>
        {discounts.map((discount) => {
          if (discount.id === currentDiscountId) {
            return (
              <div key={discount.id} className="container-fluid">
                <div className="bg-primary rounded p-1 pl-3 mb-3">
                  <h4 className="text-success">
                    <FontAwesomeIcon icon={faTicket} /> {discount.code}
                  </h4>
                  <p className="text-danger">
                    {calculateRemainingTime(discount.expiryDate)}{" "}
                    <FontAwesomeIcon icon={faHourglassEnd} />
                  </p>
                  <p>
                    Sale off {discount.discountPercentage}% for{" "}
                    {convertDollarToVND(discount.condition)} VND minimun order
                  </p>
                </div>

                <div>
                  <h6>Applies to products</h6>
                  <p>
                    Products that are restricted from running promotions
                    according to State regulations will not be displayed if they
                    are in the selected product list.
                  </p>
                </div>
                <div>
                  <h6>Payment</h6>
                  <p>All forms of payment</p>
                </div>
                <div>
                  <h6>Shipping unit</h6>
                  <p>All shipping units</p>
                </div>
              </div>
            );
          }
          return null;
        })}
        <button
          style={{ float: "right" }}
          onClick={() => modelOpen(null)}
          className="btn btn-primary "
        >
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default VoucherComponent;
