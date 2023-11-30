import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/ReturnVnpay.css";
const ReturnPage = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [orderData, setOrderData] = useState();
  const urlParams = new URLSearchParams(window.location.href);
  const orderInfo = urlParams.get("vnp_OrderInfo");
  const responseCode = urlParams.get("vnp_ResponseCode");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/payment/order/${orderInfo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("abc");
        console.log(response);

        // Assuming the response is in JSON format
        const data = await response.json();

        console.log("response", data.orderInfo);
        setOrderData(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, [orderInfo]);

  const formatCurrency = (amount) => {
    if (typeof amount === "string" && amount.includes("đ")) {
      // Xóa ký tự "đ" bằng cách sử dụng replace
      const cleanedAmount = amount.replace("đ", "");

      return parseFloat(cleanedAmount).toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
    }

    return parseFloat(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  const handleReturnToHomePage = () => {
    try {
      fetch("http://localhost:8080/payment/save-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      console.log(orderData);
      history.push(`/`);
    } catch (error) {
      console.error("Error handling response:", error);
    }
  };

  if (responseCode == "00") {
    if (!orderData) {
      return <h1 className="loading">Loading...</h1>;
    }
    return (
      <div className="return-page">
        <h1 className="title">Bill Payment</h1>
        <div>
          <p className="content">
            Amount: {formatCurrency(orderData.amount)} VND
          </p>
          <p className="content">Name: {orderData.name}</p>
          <p className="content">Address: {orderData.address}</p>
          <p className="content">Phone: {orderData.phone}</p>
        </div>
        <button onClick={handleReturnToHomePage} className="btn-return">
          Return to home page
        </button>
      </div>
    );
  } else {
    return (
      <div className="transaction_container">
        <h1 className="transaction_failed">Transaction failed</h1>
        <p>Please check and pay again</p>
        <Link to="/">
          <button className="btn_failed">Return to home page</button>
        </Link>
      </div>
    );
  }
};

export default ReturnPage;
