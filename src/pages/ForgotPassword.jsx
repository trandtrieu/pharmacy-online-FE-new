import React, { Component } from "react";
import { toast } from "react-toastify";
import "../style/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "bootstrap";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      message: "",
      emailValid: true,
      showModal: false,
      emailSent: false,
    };
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  validateEmail = (mail) => {
    const mailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return mailPattern.test(mail);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.emailValid) {
      toast.error("Invalid email address");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/auth/forgot-password?mail=" + this.state.mail,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: this.state.mail }),
        }
      );

      if (response.status === 200) {
        this.setState({ emailSent: true });
        const data = await response.json();
        this.setState({ message: data });
      }
    } catch (error) {
      // this.setState({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
    }
  };

  handleEmailChange = (e) => {
    this.setState({ mail: e.target.value });
  };

  render() {
    return (
      <div className="container-forgot">
        <form onSubmit={this.handleSubmit}>
          <h1 className="title-forgot">FORGOT PASSWORD</h1>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              value={this.state.mail}
              onChange={this.handleEmailChange}
              required
              placeholder="Email"
              className={this.state.emailValid ? "input" : "input input-error"}
            />
          </div>
          <button type="submit" className="btn-forgot">
            Send
          </button>
        </form>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleModalClose}
          contentLabel="Email Popup"
        >
          <h2>Email Exists!</h2>
          <p>Email exists in the database.</p>
          <button onClick={this.handleModalClose}>Close</button>
        </Modal>
        {this.state.emailSent && (
          <div className="email-sent-message">
            <p>Please check your email.</p>
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
