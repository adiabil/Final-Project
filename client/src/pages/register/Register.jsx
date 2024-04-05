import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/token";
import { useNavigate } from "react-router-dom";

import "./register.css";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", res.data.token);

        // Set the token in the authentication context
        auth.setToken(res.data.token);

        // Redirect to login page
        if (!auth.loading) {
          navigate("/login");
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Registration successful!");
      }
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {errorMessage && (
        <span style={{ color: "green", marginTop: "10px" }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
