import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Pop from "../Pop/Pop";
import "./Navbar.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = (current) => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light ${
        isSticky ? "stickynav" : "normalnav"
      }`}
      expand="lg"
    >
      <Toaster />
      <div className="container-fluid">
        <div className="navbar-heading">
          <h4>
            <Link className="navbar-h" to="/">
              Mental Health and Support Network
            </Link>
          </h4>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <a className={`nav-link ${current.current=="home"&& `active`} me-3`} aria-current="page" href="/">
                HOME
              </a>
            </li>

            {(user && user.isDoctor) ? <li className="nav-item">
              <a
className={`nav-link ${current.current=="dashboard"&& `active`} me-3`}

                href="/dashboard"
              >
                DASHBOARD
              </a>
            </li> : <li className="nav-item">
              <a

className={`nav-link ${current.current=="search"&& `active`} me-3`}
                href="/search"
              >
                MAKE AN APPOINTMENT
              </a>
            </li>  }


            <li className="nav-item">
              <a className={`nav-link ${current.current=="forum"&& `active`} me-3`} aria-current="page" href="/chat">
                FORUM
              </a>
            </li>

            <div className="dropdown">
              <li className="nav-item">
                {user?.email ? (
                  <Pop />
                ) : (
                  <span>
                    <Link className={`nav-link me-3 textDark`} to="/login">
                      LOGIN
                    </Link>
                  </span>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
