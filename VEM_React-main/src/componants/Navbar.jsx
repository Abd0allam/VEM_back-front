import { Link, NavLink, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../context/shopingCartContext";
import React, { useState, useEffect
} from 'react';
import axios from 'axios';

  
const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()
 

function handleRemoveClick() {
  localStorage.clear();
  navigate("/Signin")
}


useEffect(() => {
  
  const accessToken = localStorage.getItem("access");
  if ( accessToken ) {

    axios.get('http://127.0.0.1:8000/profile/',{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => setUserInfo(response.data), 
      )
      
      .catch(error => console.log(error));
  }

   

}, []);
console.log(userInfo)

  return (
    <header >
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
            <div className="offcanvas-body"  style={{ alignItems:" center" }} id="navbarNav">
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
                  <NavLink className="nav-link" to="/shops">
                    Mall
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
                style={{ position: "relative" , left: "-12px" }}
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
{/* ============================================================================================================== */}
         {userInfo ?(
          
          <div className="flexnav">
            <Link href="/profile" target="_blank" className="btn text-light fs-6 ">
            {userInfo.first_name} {userInfo.last_name}
            </Link>
          <span className="nav-item dropdown">
            <a className="nav-link nav-icon-hover" href="http" id="drop2" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src={userInfo.profile_picture ? `http://localhost:8000/${userInfo.profile_picture}` : require("../assets/user.jpg")} alt="" width="35" height="35" className="rounded-circle"/>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
              <div className="message-body">
                <a href="/profile" className="d-flex align-items-center gap-2 dropdown-item">
                  {/* <i className="ti ti-user fs-4"></i> */}
                  <p className="mb-0 fs-6">My Profile</p>
                </a>
                <a href='/shop/myshop' className="d-flex align-items-center gap-2 dropdown-item">
                  {/* <i class="ti ti-mail fs-4"></i> */}
                  <p className="mb-0 fs-6">My shop</p>
                </a>
                
                <button  onClick={handleRemoveClick}  className="btn btn-outline-primary mx-2 mt-2 d-block">Logout</button>
              </div>
            </div>
          </span>
          </div>
          
         ):(
              <Link
                className="btn btn-outline-primary mt-2 mt-md-0"
                to="/Signin"
              >
                Sign in
              </Link>
)}  



            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
