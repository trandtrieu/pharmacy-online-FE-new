/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unused-vars */
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

  togglePasswordVisibilitys = () => {
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

    // Kiểm tra độ dài mật khẩu
    if (
      this.state.newPassword.length < 8 ||
      this.state.newPassword.length > 16
    ) {
      toast.error("Password must be between 8 and 16 characters");
      return;
    }

    // Kiểm tra có ít nhất một chữ hoa, một chữ số, không chứa ký tự đặc biệt
    if (!/(?=.*[A-Z])(?=.*\d)^[a-zA-Z\d]{8,16}$/.test(this.state.newPassword)) {
      toast.error(
        "Password must contain at least one uppercase letter, one digit, and no special characters"
      );
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
        newPassword: this.state.newPassword,
      },
      body: JSON.stringify({
        mail: this.state.mail,
        newPassword: this.state.newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("change password successfully");
          this.setState({ success: true });
          toast.success("Password was successfully changed");
          this.props.history.push("/home");
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
          <input
            type={this.state.mail}
            value={this.state.mail}
            onChange={this.handleEmailChange}
            required
            placeholder="Email"
            className="input-setpass"
          />
          <div className="password-input">
            <input
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.newPassword}
              onChange={this.handlePasswordChange}
              required
              placeholder="New Password"
              className="input-setpass"
            />
            <button
              type="button"
              onClick={this.togglePasswordVisibility}
              className="password-toggle"
            >
              <FontAwesomeIcon
                icon={this.state.showPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          <div className="password-input">
            <input
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              required
              placeholder="Confirm Password"
              className="input-setpass"
            />
            <button
              type="button"
              onClick={this.togglePasswordVisibilitys}
              className="password-toggle"
            >
              <FontAwesomeIcon
                icon={this.state.showPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>

          <button type="submit" className="btn-setpass">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

export default SetNewPass;
