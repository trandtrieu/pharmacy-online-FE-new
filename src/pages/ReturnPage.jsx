import React from "react";
import "../style/ReturnVnpay.css";
const ReturnPage = () => {
  const returnObject = {
    status: "OK",
    message: "Successfully",
    data: "",
  };

  return (
    <div className="return-page">
      <h1 className="title">Hóa đơn thanh toán</h1>
      <p className="content">Status: {returnObject.status}</p>
      <p className="content">Message: {returnObject.message}</p>
    </div>
  );
};

export default ReturnPage;
