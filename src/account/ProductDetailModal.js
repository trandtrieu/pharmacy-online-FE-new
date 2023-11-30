import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { convertDollarToVND, customStylespro } from "../utils/cartutils";
import OrderServices from "../services/OrderServices";

const ProductDetailModal = ({ isOpen, onRequestClose, orderId, token }) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await OrderServices.getListProductByOrderId(
          orderId,
          token
        );
        setDetails(response.data || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (isOpen && orderId) {
      fetchProductDetails();
    }
  }, [isOpen, orderId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details Modal"
      style={customStylespro}
    >
      <h2>Product Details: {orderId} </h2>

      {Array.isArray(details) && details.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {details.map((product, index) => (
              <tr key={index}>
                <td>{product.nameproduct}</td>
                <td>
                  {convertDollarToVND(product.price)} VND x {product.quantity}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No product details available.</p>
      )}
      <button className="btn btn-danger mt-2" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default ProductDetailModal;
