import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "/api/login";

const Login = () => {
  const { auth, setAuth } = useAuth(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // see if it we came from a previous path

  // Login State
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // Successful submission: Show the Success JSX  (only use this for prototyping)
  // Now replaced with the Navigate feature
  // const [success, setSuccess] = useState(false);
  // Error Message
  const [errMsg, setErrMsg] = useState("");
  // Set User Focus on page load

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.stringify({ user, pwd });

      const response = await axios.post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const accessToken = response?.data?.token;

      setUser("");
      setPwd("");
      console.log(response);
      // Reponse from server
      if (response.status === 200) {
        // Login success
        if (response.data.status === "OK") {
          // clear previous local storage
          localStorage.clear();

          console.log("Response Data", user, pwd, accessToken);
          setAuth({ user, pwd, accessToken });
          console.log("AUTH:", auth);

          // store the login token
          console.log(
            "Successful login: received token and set to local storage:",
            response.data
          );
          localStorage.setItem("token", JSON.stringify(response.data));

          if (location?.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrMsg("Incorrect username or password. Please try again.");
        }
      }
      // Axios Post Fails
    } catch (err) {
      if (err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Username is taken");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };
  return (
    <section className="login">
      <div className="login__container-left">
        <h1 className="login__header">Sign In</h1>
        <p className="login__description mb-1p5 text--bold mb-">
          Enter your account details
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username" className="login-form__label">
            Username
          </label>
          <input
            onChange={(e) => {
              setUser(e.target.value);
            }}
            type="text"
            id="username"
            autoComplete="off"
            value={user}
            required
            placeholder="example@email.com"
            className="login-form__input"
          />
          <label htmlFor="pwd" className="login-form__label mb-1">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            id="pwd"
            required
            placeholder="password"
            className="login-form__input login-form__input--password"
          />
          <p id="uidnote" className="login-form__instructions">
            Forgot Password?
          </p>

          <div className="flex-col-center">
            {errMsg ? (
              <p aria-live="assertive" className="login__error">
                {errMsg}
              </p>
            ) : (
              ""
            )}

            <button
              disabled={user && pwd ? false : true}
              onSubmit={handleSubmit}
              className="login__btn-cta"
            >
              Sign In
            </button>
            <p className="register__text register__text--subtle">
              New here?{" "}
              <Link
                to="/register"
                className="register__text register__text--subtle text--underline"
              >
                Sign Up instead
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;