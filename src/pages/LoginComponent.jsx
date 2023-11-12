/* eslint-disable no-unused-vars */
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
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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

  // Function to toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidEmail = emailRegex.test(value);

      setErrors({
        ...errors,
        email: isValidEmail ? "" : "Invalid email address",
      });
    } else if (name === "password") {
      const passwordRegex = /^.{8,16}$/;
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

    if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidEmail = emailRegex.test(value);

      setErrors({
        ...errors,
        email: isValidEmail ? "" : "Invalid email address",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password:
          value.length >= 8 ? "" : "Password must be at least 8 characters",
      });
    } else if (name === "username") {
      const usernameRegex = /^.{8,16}$/;
      const isValidUsername = usernameRegex.test(value);
      setErrors({
        ...errors,
        username: isValidUsername
          ? ""
          : "Username must be between 8 and 16 characters",
      });
    }
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

        history.push("/cart");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Function to handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username } = signupFormData;
    const {
      email: emailError,
      password: passwordError,
      username: usernameError,
    } = errors;

    if (
      !email ||
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
    }
  };

  return (
    <div className="container" id="container">
      <div class="form-container register-container">
        <form onSubmit={handleSignupSubmit} className="auth">
          <h1>Register here</h1>
          <div class="form-control-auth">
            <input
              name="username"
              class="email-2"
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleSignupChange}
            />
            <small id="username-error">{errors.username}</small>
            <span></span>
          </div>
          <div class="form-control-auth">
            <input
              name="mail"
              class="email-2"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleSignupChange}
            />
            <small id="email-error">{errors.mail}</small>
            <span></span>
          </div>
          <div class="form-control-auth">
            <input
              name="password"
              class="email-2"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleSignupChange}
            />
            <small id="password-error">{errors.password}</small>
            <span></span>
          </div>
          <button type="submit" value="submit" className="btn-login">
            Register
          </button>
          <span>Or use your account</span>
          <div class="social-container">
            <a href="/" class="social">
              <i class="">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </i>
            </a>
            <a href="/" class="social">
              <i class="">
                <FontAwesomeIcon icon={faGoogle} />
              </i>
            </a>
          </div>
        </form>
      </div>
      {/* Login */}
      <div class="form-container login-container">
        <form class="form-lg auth" onSubmit={handleLoginSubmit}>
          <h1>Login here.</h1>
          <div class="form-control2">
            <input
              type="username"
              class="email-2"
              placeholder="Username"
              name="username"
              value={loginFormData.username}
              onChange={handleLoginChange}
            />
            <small class="email-error-2">{errors.username}</small>
            <span></span>
          </div>
          <div class="form-control2">
            <input
              type={showPassword ? "text" : "password"}
              class="password-2"
              placeholder="Password"
              value={loginFormData.password}
              onChange={handleLoginChange}
              name="password"
            ></input>
            <small class="password-error-2"> {errors.password}</small>
            <span className="error"></span>
            <span></span>
            <p
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </p>
          </div>

          <div class="content">
            <div class="checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                onChange={handleRememberMeChange}
              />
              <label for="">Remember me</label>
            </div>
            <div class="pass-link">
              <Link to="/forgotpass">Forgot password</Link>
            </div>
          </div>
          <button type="submit" value="submit" className="btn-login">
            Login
          </button>
          <span>Or use your account</span>
          <div class="social-container">
            <a href="/" class="social">
              <i class="">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </i>
            </a>
            <a href="/" class="social">
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

export default LoginComponent;
