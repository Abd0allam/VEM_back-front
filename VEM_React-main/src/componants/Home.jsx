import React, { Fragment } from "react";
import "./CSS/Home.css";
import "bootstrap/dist/css/bootstrap.css";
// import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
// import { Card, Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
// import jwtDecode from 'jwt-decode';
import CarouselComp from "./Carousel";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import AboutComp from "./AboutComp";
import sImage from "../assets/car1.jpg";
import Cards from "./Cards";
// ..
AOS.init();

const Home = () => {
  // const settings = {
  // dots: true,
  // fade: true,
  // infinite: true,
  // speed: 500,
  // slidesToShow: 1,
  // slidesToScroll: 1
  // };

  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    axios
      .get("http://127.0.0.1:8000/shop/rated", {
        headers: {
          // "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setShopInfo(response.data["Shop"]);
        // console.log(response.data["Shop"]);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("shop info: " + shopInfo);

  return (
    <Fragment>
      <div className="container">
        <div className="row py-5 shadow">
          <div
            className="col"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="d-flex flex-column gap-3 justify-content-center text-md-start text-center">
              <h1 className="fs-1">Build Free Ecommerce Website with VEM</h1>
              <p className="fs-5 fw-bolder">
                It's easy to build a Website but it's hard to satisfy the
                client.
              </p>
              <p>
                VEM platform, understands the clients and their requirments. We
                are ready to fullfil all the needs that is essential to make a
                fully interactive and professional Ecommerce websites
              </p>
              <div className="">
              {!localStorage.getItem('access')?(
                <Link to="/Signin">
                  <button type="submit" className="btn btn-primary me-3">
                    Login Now
                  </button>
                </Link>
                ):("")}
                <Link to="/shops">
                  <button type="submit" className="btn btn-danger">
                    Go To Our Shops
                  </button>
                </Link>
              </div>
              
            </div>
          </div>
          <div
            className="col d-flex align-items-center"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="">
              <img
                className="shadow"
                src={require("../assets/preview.png")}
                width={"600px"}
                alt="VEM platform"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ========================================================================================================= */}
      <section
        className="position-relative"
        style={{ color: `var(--text-color)` }}
      >
        <div
          className="position-absolute top-0 start-0 bottom-0 end-0"
          style={{ zIndex: "-2", overflow: "hidden" }}
        >
          <img
            src={sImage}
            alt=""
            srcSet=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="position-absolute top-0 start-0 bottom-0 end-0"
          style={{
            backgroundColor: `var(--bg-color)`,
            zIndex: "-1",
            overflow: "hidden",
            opacity: "0.7",
          }}
        ></div>
        <div className="container text-center py-4" style={{ zIndex: "1" }}>
          <AboutComp />
        </div>
      </section>

      {/* ========================================================================================================= */}
      <div className="bg-secondary">

      <div className="container py-5">
        <h1 className="text-center">Our Latest Shops</h1>
      </div>

      {/* <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      /> */}

      <div className="container pb-5">
        <Cards />
      </div>
      </div>

      {/* ========================================================================================================= */}
     <div className="bg-secondary">

      <div className="container">
        <h1 className="text-center pb-3">Our Top Rated Shops</h1>
      </div>
      <CarouselComp data={shopInfo} />
      {/* =========================================== http://127.0.0.1:8000/shop/shops/ ============================================================== */}
      {/* ========================================================================================================= */}
      {/* ========================================================================================================= */}
      {/* ========================================================================================================= */}
     </div>
    </Fragment>
  );
};

export default Home;
