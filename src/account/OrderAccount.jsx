import React from "react";
import {
  convertDollarToVND,
  convertFirstLetter,
  customStylespro,
} from "../utils/cartutils";
import OrderServices from "../services/OrderServices";
import { toast } from "react-toastify";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import Modal from "react-modal";

const OrderAccount = ({
  order_wait,
  order_confirmed,
  order_delivering,
  order_delivered,
  order_cancel,
  accountId,
  token,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);

  const viewDetailOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeProductDetailModal = () => {
    setSelectedOrderId(null);
    setIsModalOpen(false);
  };

  const openCancelConfirmation = (orderId) => {
    setCancelOrderId(orderId);
    setIsCancelConfirmationOpen(true);
  };

  const closeCancelConfirmation = () => {
    setCancelOrderId(null);
    setIsCancelConfirmationOpen(false);
  };

  const cancelOrder = async (orderId) => {
    try {
      await OrderServices.updateOrderStatus(orderId, token);
      toast.success("Order canceled successfully");
      closeCancelConfirmation(); // Đóng hộp thoại sau khi hủy đơn hàng thành công
      window.location.reload();
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  return (
    <>
      <div className="tab-pane fade" id="account-orders">
        <nav class="nav nav-tabs nav-justified  d-flex">
          <a
            style={{ color: "#000", fontSize: "15px" }}
            class="nav-item nav-link active "
            data-toggle="tab"
            href="#order-wait"
          >
            Processing
          </a>
          <a
            style={{ color: "#000", fontSize: "15px" }}
            class="nav-item nav-link"
            data-toggle="tab"
            href="#order-confirmed"
          >
            Confirmed
          </a>
          <a
            style={{ color: "#000", fontSize: "15px" }}
            class="nav-item nav-link"
            data-toggle="tab"
            href="#order-delievering"
          >
            {" "}
            Delivering
          </a>
          <a
            style={{ color: "#000", fontSize: "15px" }}
            class="nav-item nav-link"
            data-toggle="tab"
            href="#order-delivered"
          >
            {" "}
            Delivered
          </a>
          <a
            style={{ color: "#000", fontSize: "15px" }}
            class="nav-item nav-link"
            data-toggle="tab"
            href="#order-cancel"
          >
            Cancel
          </a>
        </nav>

        <div className="tab-content mt-4">
          <div id="order-wait" className="tab-pane fade show active">
            {order_wait.length > 0 ? (
              order_wait.map((order, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    boxShadow: "0 0 12px rgba(15,61,145,.12)",
                    padding: "20px",
                  }}
                  className="parent mb-4 "
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      border: "1px solid #0072bc",
                      backgroundColor: "#f2f6fe",
                      borderRadius: "20px",
                      width: "20%",
                      color: "#000",
                    }}
                    className="childs text-center"
                  >
                    <span>{convertFirstLetter(order.deliveryMethod)}</span>
                  </div>
                  <div className="row">
                    <div style={{ fontSize: "14px" }} className="col-md-9 ml-2">
                      <p>
                        {" "}
                        <strong>ID order: </strong> {order.id}{" "}
                        <strong>Name:</strong> {order.name}{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {convertDollarToVND(Number.parseInt(order.amount))} VND
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Date:</strong> {order.date}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Payment method:</strong> {order.paymentMethod}
                      </p>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-center ">
                      <div className="">
                        <button
                          className="btn btn-danger rounded"
                          onClick={() => openCancelConfirmation(order.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex m-2">
                      <div className="">
                        <button
                          className="btn btn-info"
                          onClick={() => viewDetailOrder(order.id)}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No processing orders available.</p>
            )}
          </div>

          <div id="order-confirmed" class="tab-pane fade">
            {order_confirmed.length > 0 ? (
              order_confirmed.map((confirmed, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    boxShadow: "0 0 12px rgba(15,61,145,.12)",
                    padding: "20px",
                  }}
                  className="parent mb-4 "
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      border: "1px solid #0072bc",
                      backgroundColor: "#f2f6fe",
                      borderRadius: "20px",
                      width: "20%",
                      color: "#000",
                    }}
                    className="childs text-center"
                  >
                    <span>{convertFirstLetter(confirmed.deliveryMethod)}</span>
                  </div>
                  <div className="row">
                    <div style={{ fontSize: "14px" }} className="col-md-9 ml-2">
                      <p>
                        <strong>Name:</strong> {confirmed.name}{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Phone:</strong> {confirmed.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {convertDollarToVND(Number.parseInt(confirmed.amount))}{" "}
                        VND
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Date:</strong> {confirmed.date}
                      </p>
                      <p>
                        <strong>Address:</strong> {confirmed.address}
                      </p>
                      <p>
                        <strong>Payment method:</strong>{" "}
                        {confirmed.paymentMethod}
                      </p>
                    </div>{" "}
                    <div className="col-md-2 d-flex align-items-center justify-content-center ">
                      <div className="">
                        <button
                          className="btn btn-info rounded"
                          onClick={() => viewDetailOrder(confirmed.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No confirmed orders available.</p>
            )}
          </div>

          <div id="order-delievering" class="tab-pane fade">
            {order_delivering.length > 0 ? (
              order_delivering.map((delivering, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    boxShadow: "0 0 12px rgba(15,61,145,.12)",
                    padding: "20px",
                  }}
                  className="parent mb-4 "
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      border: "1px solid #0072bc",
                      backgroundColor: "#f2f6fe",
                      borderRadius: "20px",
                      width: "20%",
                      color: "#000",
                    }}
                    className="childs text-center"
                  >
                    <span>{convertFirstLetter(delivering.deliveryMethod)}</span>
                  </div>
                  <div className="row">
                    <div style={{ fontSize: "14px" }} className="col-md-9 ml-2">
                      <p>
                        <strong>Name:</strong> {delivering.name}{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Phone:</strong> {delivering.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {convertDollarToVND(Number.parseInt(delivering.amount))}{" "}
                        VND
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Date:</strong> {delivering.date}
                      </p>
                      <p>
                        <strong>Address:</strong> {delivering.address}
                      </p>
                      <p>
                        <strong>Payment method:</strong>{" "}
                        {delivering.paymentMethod}
                      </p>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-center ">
                      <div className="">
                        <button
                          className="btn btn-info rounded"
                          onClick={() => viewDetailOrder(delivering.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No delivering orders available.</p>
            )}
          </div>

          <div id="order-delivered" class="tab-pane fade">
            {order_delivered.length > 0 ? (
              order_delivered.map((delivered, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    boxShadow: "0 0 12px rgba(15,61,145,.12)",
                    padding: "20px",
                  }}
                  className="parent mb-4 "
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      border: "1px solid #0072bc",
                      backgroundColor: "#f2f6fe",
                      borderRadius: "20px",
                      width: "20%",
                      color: "#000",
                    }}
                    className="childs text-center"
                  >
                    <span>{convertFirstLetter(delivered.deliveryMethod)}</span>
                  </div>
                  <div className="row">
                    <div style={{ fontSize: "14px" }} className="col-md-9 ml-2">
                      <p>
                        <strong>Name:</strong> {delivered.name}{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Phone:</strong> {delivered.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {convertDollarToVND(Number.parseInt(delivered.amount))}{" "}
                        VND
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Date:</strong> {delivered.date}
                      </p>
                      <p>
                        <strong>Address:</strong> {delivered.address}
                      </p>
                      <p>
                        <strong>Payment method:</strong>{" "}
                        {delivered.paymentMethod}
                      </p>
                    </div>
                    <div className="col-md-2  d-flex align-items-center justify-content-center">
                      <div>
                        <span
                          style={{
                            backgroundColor: "#5dac46",
                            padding: 10,
                            color: "#fff",
                            borderRadius: 20,
                          }}
                        >
                          Received
                        </span>
                      </div>
                    </div>{" "}
                    <div className="col-md-2 d-flex align-items-center justify-content-center ">
                      <div className="">
                        <button
                          className="btn btn-info rounded"
                          onClick={() => viewDetailOrder(delivered.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No delivered orders available.</p>
            )}
          </div>

          <div id="order-cancel" class="tab-pane fade">
            {order_cancel.length > 0 ? (
              order_cancel.map((order, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    boxShadow: "0 0 12px rgba(15,61,145,.12)",
                    padding: "20px",
                  }}
                  className="parent mb-4 "
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      border: "1px solid #0072bc",
                      backgroundColor: "#f2f6fe",
                      borderRadius: "20px",
                      width: "20%",
                      color: "#000",
                    }}
                    className="childs text-center"
                  >
                    <span>{convertFirstLetter(order.deliveryMethod)}</span>
                  </div>
                  <div className="row">
                    <div style={{ fontSize: "14px" }} className="col-md-9 ml-2">
                      <p>
                        <strong>Name:</strong> {order.name}{" "}
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {convertDollarToVND(Number.parseInt(order.amount))} VND
                        <span className="ml-2 mr-2"> | </span>{" "}
                        <strong>Date:</strong> {order.date}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Payment method:</strong> {order.paymentMethod}
                      </p>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-center ">
                      <div className="">
                        <button
                          className="btn btn-info rounded"
                          onClick={() => viewDetailOrder(order.id)}
                        >
                          Detail product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No cancel orders available.</p>
            )}
          </div>
        </div>
      </div>{" "}
      {isCancelConfirmationOpen && (
        <Modal
          isOpen={isCancelConfirmationOpen}
          onRequestClose={closeCancelConfirmation}
          contentLabel="Cancel Confirmation"
          style={customStylespro}
        >
          <h3>Cancel your order?</h3>
          <p>Are you sure you want to cancel this order?</p>
          <button
            className="btn btn-danger"
            onClick={() => cancelOrder(cancelOrderId)}
          >
            Yes
          </button>{" "}
          <button className="btn btn-info" onClick={closeCancelConfirmation}>
            No
          </button>
        </Modal>
      )}
      <ProductDetailModal
        isOpen={isModalOpen}
        onRequestClose={closeProductDetailModal}
        orderId={selectedOrderId}
        token={token}
      />
    </>
  );
};

export default OrderAccount;
