import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./CSS/Navbar.css";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../context/shopingCartContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <header>
      <nav className="navbar  navbar-expand-md">
        <div className="container">
          <Link className="navbar-brand" to="/" id="logo">
            VEM
          </Link>
          <button
            className="navbar-toggler shadow-none border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header ms-auto">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" id="navbarNav">
              <ul
                className="navbar-nav justify-content-end mx-auto"
                id="linksHolder"
              >
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/Projects">
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/Store">
                    Store
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/About">
                    About
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/Contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
              <Button
                onClick={openCart}
                variant="outline-primary"
                className="rounded-circle me-3 mt-3 mt-md-0"
                style={{ position: "relative" }}
              >
                <i className="bi bi-cart4 text-light"></i>
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    bottom: "0",
                    right: "0",
                    transform: "translate(50%,-90%)",
                  }}
                >
                  {cartQuantity}
                </div>
              </Button>
              <Link
                className="btn btn-outline-primary mt-3 mt-md-0"
                to="/Signin"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
