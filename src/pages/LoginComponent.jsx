import React, { Component } from "react";
import "../style/Login.css";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormData: {
        username: "",
        password: "",
        redirectToHome: false,
      },
      signupFormData: {
        username: "",
        mail: "",
        password: "",
      },
      Errors: {
        mail: "",
        password: "",
        username: "",
      },
      isLoggedIn: false,
      showPassword: false,
    };
  }

  togglePasswordVisibility = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  componentDidMount() {
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");

    registerButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    const cookies = new Cookies();
    const userCookie = cookies.get("user");
    if (userCookie) {
      const { mail, password } = userCookie;

      this.setState((prevState) => ({
        loginFormData: {
          ...prevState.loginFormData,
          mail,
          password,
        },
      }));
    }

    registerButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
    this.checkActiveSession();
  }

  checkActiveSession = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.setState({
        loginFormData: {
          usernmae: userData.username,
          password: userData.password,
        },
        isLoggedIn: true,
      });
    }
  };

  handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("user");
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleLoginChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value,
      },
    }));

    if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidEmail = emailRegex.test(value);

      this.setState((prevState) => ({
        Errors: {
          ...prevState.Errors,
          mail: isValidEmail ? "" : "Invalid email address",
        },
      }));
    } else if (name === "password") {
      const passwordRegex = /^.{8,16}$/;
      const isValidPassword = passwordRegex.test(value);
      this.setState((prevState) => ({
        Errors: {
          ...prevState.Errors,
          password: isValidPassword ? "" : "Password is not in correct format",
        },
      }));
    }
  };

  handleSignupChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      signupFormData: {
        ...prevState.signupFormData,
        [name]: value,
      },
    }));
    if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidEmail = emailRegex.test(value);

      this.setState((prevState) => ({
        Errors: {
          ...prevState.Errors,
          mail: isValidEmail ? "" : "Invalid email address",
        },
      }));
    } else if (name === "password") {
      this.setState((prevState) => ({
        Errors: {
          ...prevState.Errors,
          password:
            value.length >= 8 ? "" : "Password must be at least 8 characters",
        },
      }));
    } else if (name === "username") {
      const usernameRegex = /^.{8,16}$/;

      const isValidUsername = usernameRegex.test(value);
      this.setState((prevState) => ({
        Errors: {
          ...prevState.Errors,
          username: isValidUsername
            ? ""
            : "Username must be between 8 and 16 characters.",
        },
      }));
    }
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: this.state.loginFormData.username,
      password: this.state.loginFormData.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/auth/token", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw Error(response.status);
      })
      .then((token) => {
        localStorage.setItem("token", token);
        this.setState({ redirectToHome: true });
      })
      .catch((error) => console.log("error", error));
  };

  handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { mail, password, username } = this.state.signupFormData;
    const {
      mail: emailError,
      password: passwordError,
      username: usernameError,
    } = this.state.Errors;

    if (
      !mail ||
      !password ||
      !username ||
      emailError ||
      passwordError ||
      usernameError
    ) {
      toast.error("Please fix the form errors!!!");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.signupFormData),
    });

    if (response.status === 200) {
      this.setState({ message: "User registered successfully!" });
      toast.success("User registered successfully!");
    } else {
      this.setState({
        message: "Registration failed. Please check your input.",
      });
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/home" />;
    }
    return (
      <div class="container" id="container">
        <div class="form-container register-container">
          <form onSubmit={this.handleSignupSubmit} className="auth">
            <h1>Register here</h1>
            <div class="form-control-auth">
              <input
                name="username"
                class="email-2"
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.handleSignupChange}
              />
              <small id="username-error">{this.state.Errors.username}</small>
              <span></span>
            </div>
            <div class="form-control-auth">
              <input
                name="mail"
                class="email-2"
                type="email"
                id="email"
                placeholder="Email"
                onChange={this.handleSignupChange}
              />
              <small id="email-error">{this.state.Errors.mail}</small>
              <span></span>
            </div>
            <div class="form-control-auth">
              <input
                name="password"
                class="email-2"
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleSignupChange}
              />
              <small id="password-error">{this.state.Errors.password}</small>
              <span></span>
            </div>
            <button type="submit" value="submit" className="btn-login">
              Register
            </button>
            <span>Or use your account</span>
            <div class="social-container">
              <a href="#" class="social">
                <i class="">
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </i>
              </a>
              <a href="#" class="social">
                <i class="">
                  <FontAwesomeIcon icon={faGoogle} />
                </i>
              </a>
            </div>
          </form>
        </div>
        {/* Login */}
        <div class="form-container login-container">
          <form class="form-lg auth" onSubmit={this.handleLoginSubmit}>
            <h1>Login here.</h1>
            <div class="form-control2">
              <input
                type="username"
                class="email-2"
                placeholder="Username"
                name="username"
                value={this.state.loginFormData.username}
                onChange={this.handleLoginChange}
              />
              <small class="email-error-2">{this.state.Errors.username}</small>
              <span></span>
            </div>
            <div class="form-control2">
              <input
                type={this.state.showPassword ? "text" : "password"}
                class="password-2"
                placeholder="Password"
                value={this.state.loginFormData.password}
                onChange={this.handleLoginChange}
                name="password"
              ></input>
              <small class="password-error-2">
                {" "}
                {this.state.Errors.password}
              </small>
              <span className="error"></span>
              <span></span>
              <p
                className="toggle-password-icon"
                onClick={this.togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={this.state.showPassword ? faEye : faEyeSlash}
                />
              </p>
            </div>

            <div class="content">
              <div class="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label for="">Remember me</label>
              </div>
              <div class="pass-link">
                <Link to="/forgotpass">
                  <a href="#">Forgot password</a>
                </Link>
              </div>
            </div>
            <button type="submit" value="submit" className="btn-login">
              Login
            </button>
            <span>Or use your account</span>
            <div class="social-container">
              <a href="#" class="social">
                <i class="">
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </i>
              </a>
              <a href="#" class="social">
                <i class="">
                  <FontAwesomeIcon icon={faGoogle} />
                </i>
              </a>
            </div>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1 class="title">
                Hello <br />
                friends
              </h1>
              <p>If you have an account, login here and have fun</p>
              <button class="ghost" id="login" className="btn-login">
                Login
                <i class="">
                  <FontAwesomeIcon
                    icon={faLeftLong}
                    style={{ color: "#f1f1f4" }}
                  />
                </i>
              </button>
            </div>

            <div class="overlay-panel overlay-right">
              <h1 class="title">
                Start your <br />
                journey now
              </h1>
              <p>
                If you don'n have an account yet, join us and start your journey
              </p>
              <button class="ghost" id="register" className="btn-login">
                Register
                <i class="">
                  <FontAwesomeIcon
                    icon={faRightLong}
                    style={{ color: "#f1f1f4" }}
                  />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
