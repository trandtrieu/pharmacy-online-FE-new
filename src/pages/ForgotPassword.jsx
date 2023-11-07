import React, { Component } from "react";
import { toast } from "react-toastify";
import "../style/ForgotPassword.css";
import "../style/ModalStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
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
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      message: "",
      emailValid: true,
      isModalOpen: false,
      emailSent: false,
      emailNotExists: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    if (this.state.emailNotExists) {
      this.setState({ emailNotExists: false });
    } else {
      this.setState({ isModalOpen: false });
    }
  };

  validateEmail = (mail) => {
    const mailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return mailPattern.test(mail);
  };

  handleEmailChange = (e) => {
    this.setState({ mail: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.emailValid) {
      toast.error("Invalid email address");
      return;
    }

    const email = this.state.mail;
    const url = `http://localhost:8080/auth/forgot-password?mail=${email}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.openModal();
      } else if (response.status === 403) {
        this.setState({ emailNotExists: true });
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error calling forgotPassword API:", error);
    }
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
          isOpen={this.state.isModalOpen || this.state.emailNotExists}
          onRequestClose={this.closeModal}
          contentLabel="Email Sent Modal"
          style={customStyles}
        >
          {this.state.emailNotExists ? (
            <div className="ModalContent">
              <h2>Email Not Found</h2>
              <p className="content">The provided email does not exist.</p>
              <button onClick={this.closeModal} className="ModalCloseButton">
                Close
              </button>
            </div>
          ) : (
            <div className="ModalContent">
              <h2>Email Sent!</h2>
              <p className="content">Please check your email.</p>
              <button onClick={this.closeModal} className="ModalCloseButton">
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default ForgotPassword;
