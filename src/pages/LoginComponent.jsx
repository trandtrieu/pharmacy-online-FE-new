import React, { useState, useEffect, useContext } from "react";
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
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import "../style/Login.css";

export function LoginComponent() {
  const history = useHistory();
  const { setAccountId, setToken } = useContext(AuthContext);

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    rememberMe: false, // Added rememberMe state
  });

  const [signupFormData, setSignupFormData] = useState({
    username: "",
    mail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    mail: "",
    password: "",
    username: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [data, setData] = useState("");

  // Removed token and userName states as they are not used

  // Use the react-cookie hook to access and set cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);

  useEffect(() => {
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");

    const handleRegisterClick = () => {
      container.classList.add("right-panel-active");
    };

    const handleLoginClick = () => {
      container.classList.remove("right-panel-active");
    };

    registerButton.addEventListener("click", handleRegisterClick);
    loginButton.addEventListener("click", handleLoginClick);

    return () => {
      registerButton.removeEventListener("click", handleRegisterClick);
      loginButton.removeEventListener("click", handleLoginClick);
    };
  }, []);

  useEffect(() => {
    // Load saved username and password from cookies on component mount
    const savedUsername = cookies.username;
    const savedPassword = cookies.password;

    if (savedUsername && savedPassword) {
      setLoginFormData({
        ...loginFormData,
        username: savedUsername,
        password: savedPassword,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle the "Remember Me" checkbox change
  const handleRememberMeChange = (e) => {
    const { name, checked } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: checked,
    });
  };

  // Function to check if an active session is stored in the browser's sessionStorage
  const checkActiveSession = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setLoginFormData({
        username: userData.username, // Fixed typo (usernmae to username)
        password: userData.password,
      });
      setIsLoggedIn(true);
    }
  };

  // Function to handle changes in the login form input fields
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });

    if (name === "email") {
      const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidMail = mailRegex.test(value);

      setErrors({
        ...errors,
        mail: isValidMail ? "" : "Invalid email address",
      });
    } else if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z]).{8,16}$/;
      const isValidPassword = passwordRegex.test(value);
      setErrors({
        ...errors,
        password: isValidPassword
          ? ""
          : "Password is not in the correct format",
      });
    }
  };

  // Function to handle changes in the signup form input fields
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === "mail"
          ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? ""
            : "Invalid email address"
          : name === "password"
          ? /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/.test(value)
            ? ""
            : "Password must be 8 to 16 characters with at least one uppercase letter"
          : name === "username"
          ? /^[a-zA-Z0-9]{8,16}$/.test(value)
            ? ""
            : "Username must be between 8 and 16 characters"
          : prevErrors[name],
    }));
  };

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let accountId = null;

      var raw = JSON.stringify({
        username: loginFormData.username,
        password: loginFormData.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/auth/token",
        requestOptions
      );
      if (!response.ok) {
        toast.error("Invalid username or password");
        throw Error(response.status);
      } else {
        accountId = await response.text();
        // setData(accountId);
        localStorage.setItem("token", accountId);
        if (loginFormData.rememberMe) {
          setCookie("username", loginFormData.username, { path: "/" });
          setCookie("password", loginFormData.password, { path: "/" });
        }
        localStorage.setItem("id", accountId);

        const tokenData = localStorage.getItem("token");

        const tokenObject = JSON.parse(tokenData);

        const token = tokenObject.token;

        const idData = localStorage.getItem("id");

        const idObject = JSON.parse(idData);

        const id = idObject.id;

        if (token && id) {
          console.log("Token:", token);
          console.log("ID:", id);
          localStorage.setItem("id", id);
          localStorage.setItem("token", token);
          setAccountId(id);
          setToken(token);
        } else {
          console.log("Token hoặc ID không tồn tại trong local storage.");
        }

        history.push("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { mail, password, username } = signupFormData;
    const {
      mail: mailError,
      password: passwordError,
      username: usernameError,
    } = errors;

    if (
      !mail ||
      !password ||
      !username ||
      mailError ||
      passwordError ||
      usernameError
    ) {
      console.log("signupFormData", signupFormData);
      console.log("errors", errors);
      toast.error("Please fix the form errors!!!");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });

    if (response.status === 200) {
      setLoginFormData({
        ...loginFormData,
        message: "User registered successfully!",
      });
      toast.success("User registered successfully!");
    } else {
      setLoginFormData({
        ...loginFormData,
        message: "Registration failed. Please check your input.",
      });
      toast.error("Registration failed. Please check your input.");
    }
  };

  return (
    <div class="container-auth login-linh" id="container">
      <div class="form-container register-container">
        <form onSubmit={handleSignupSubmit} className="form-login">
          <h1 className="h1-title-login">Register here</h1>
          <div class="form-control2">
            <input
              className="email-2"
              type="text"
              id="username"
              placeholder="Name"
              name="username"
              onChange={handleSignupChange}
            />
            <small id="username-error"></small>
            <span></span>
          </div>
          <div class="form-control2">
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="mail"
              className="email-2"
              onChange={handleSignupChange}
            />
            <small id="email-error"></small>
            <span></span>
          </div>
          <div class="form-control2">
            <input
              className="password-2"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleSignupChange}
            />
            <small id="password-error"></small>
            <span></span>
          </div>
          <button type="submit" value="submit" className="btn-login">
            Register
          </button>
          <span className="span-login">or use your account</span>
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

      <div class="form-container login-container">
        <form class="form-lg" onSubmit={handleLoginSubmit}>
          <h1 className="h1-title-login">Login here.</h1>
          <div class="form-control2">
            <input
              type="username"
              className="email-2"
              placeholder="Username"
              name="username"
              onChange={handleLoginChange}
            />
            <small class="email-error-2"></small>
            <span></span>
          </div>
          <div class="form-control2">
            <input
              type="password"
              className="password-2"
              placeholder="Password"
              name="password"
              onChange={handleLoginChange}
            />
            <small class="password-error-2"></small>
            <span></span>
          </div>

          <div class="content">
            <div class="checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={loginFormData.rememberMe}
                onChange={handleRememberMeChange}
              />
              <label for="rememberMe" style={{ marginTop: "10px" }}>
                Remember me
              </label>
            </div>
            <div class="pass-link">
              <a
                href="/forgotpass"
                style={{ textDecoration: "none" }}
                className="forgot-password"
              >
                Forgot password
              </a>
            </div>
          </div>
          <button type="submit" value="submit" className="btn-login">
            Login
          </button>
          <span className="span-login">Or use your account</span>
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
            <p className="notification">
              If you have an account, login here and have fun
            </p>
            <button class="ghost btn-login" id="login">
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
            <p className="notification">
              If you don'n have an account yet, join us and start your journey
            </p>
            <button class="ghost btn-login" id="register">
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

export default LoginComponent;
