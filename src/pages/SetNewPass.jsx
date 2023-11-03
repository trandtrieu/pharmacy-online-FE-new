import React, { Component } from "react";
import "../style/SetPassword.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
class SetNewPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleMailChange = (event) => {
    this.setState({ mail: event.target.value });
  };

  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSubmitConfirmPass = (event) => {
    event.preventDefault();

    if (this.state.newPassword !== this.state.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    const apiUrl =
      "http://localhost:8080/auth/set-password?mail=" + this.state.mail;
    const { mail, newPassword } = this.state.mail;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        newPassword: newPassword,
      },
      body: JSON.stringify({
        mail: this.state.mail,
        newPassword: this.state.newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Password was successfully changed");
          this.setState({ success: true });
        } else {
          toast.error("Change failed" + data.message);
        }
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  };

  handleEmailChange = (e) => {
    this.setState({ mail: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ newPassword: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  togglePasswordVisibility = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    return (
      <div className="container-setpass">
        <form onSubmit={this.handleSubmitConfirmPass} className="form-setpass">
          <h2>Reset Password</h2>
          <FontAwesomeIcon
            icon={this.state.showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={this.togglePasswordVisibility}
          />
          <input
            type="email"
            value={this.state.mail}
            onChange={this.handleEmailChange}
            required
            placeholder="Email"
            className="input-setpass"
            name="mail"
          />

          <input
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.newPassword}
            onChange={this.handlePasswordChange}
            required
            placeholder="New Password"
            className="input-setpass"
          />

          <input
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
            required
            placeholder="Confirm Password"
            className="input-setpass"
          />
          <FontAwesomeIcon
            icon={this.state.showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={this.togglePasswordVisibility}
          />
          <button type="submit" className="btn-setpass">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

export default SetNewPass;
