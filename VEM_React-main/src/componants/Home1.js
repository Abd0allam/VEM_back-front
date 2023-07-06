import React from "react";
import "./CSS/Home.css";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import { Card, Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const Home = () => {
  const settings = {
    // dots: true,
    fade: true,
    // infinite: true,
    speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1
  };
  const [shopInfo, setShopInfo] = useState(null);
  
  useEffect(() => {
    // const accessToken = localStorage.getItem("access");
    // ,{headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },}
    axios.get('http://127.0.0.1:8000/shop/rated')
      .then(response => setShopInfo(response.data))

      .catch(error => console.log(error));
  }, []);
  console.log("shop info: " + shopInfo )
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    const decodedToken = jwt_decode(accessToken);
    console.log(decodedToken.user_id);
  }

  if(!accessToken){
    window.location.href='http://127.0.0.1:3000/Signin'
  }
  return (
    <>
      <div className="container w-100   full">
        <div className="row flex-row-reverse align-content-around h-100 " >
          <div className="col-md-6 w-50">
            <img
              className=" w-full object-contain img_header sm:h-90 md:h-96 lg:w-full lg:h-full wow animate__animated animate__fadeInLeft"
              src={require("../assets/preview.png")} width={"600px"}
              alt="VEM platform"
            />
          </div>
          <div className="col-md-6 w-50">
            <div
              className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
            >

              <div>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

                <div
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                ></div>
              </div>

              <main
                className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
              >
                <div
                  className="sm:text-center lg:text-right wow animate__animated animate__fadeInRight"
                >
                  <h1
                    className="text-3xl mb-5 font-bold text-gray-800 lg:max-w-[80%]"
                  >
                    Build Free Ecommerce Website with VEM
                  </h1>
                  <h3
                    className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-3xl lg:max-w-[80%]"
                  >
                    <span className="block text-emerald-600">
                      It's easy to build a Website but it's hard to satisfy the client.
                    </span>
                  </h3>
                  <p
                    className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  >
                    VEM platform, understands the clients and their requirments.
                    <br /> We are ready to fullfil all the needs that is essential to make a fully interactive and professional Ecommerce websites
                  </p>
                  <div
                    className="d-flex align-items-end"
                  >
                    <div className="rounded-md shadow">
                      <Link className="btn btn-primary m-1" to="/Signin">
                        Register now </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ms-3">
                      <Link
                        to="/Projects"
                        target="_blank"
                        className="btn btn-danger m-1"
                      >
                        Watch demo
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {/* ========================================================================================================= */}

      <Carousel {...settings} >
        {shopInfo ? (
          <>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://127.0.0.1:8000/shop_images/${shopInfo.Shop.image}` || require("../assets/user.jpg")}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>{shopInfo.Shop.title || "no name"}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </>
        ) : (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/kitchen.jpg")}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/bag.png")}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Card>
        <Card.Body>

          <Container>
            <Row>
              <Col sm={8}> <img src={require("../assets/user.jpg")} alt="user"/></Col>
              <Col sm={4}>Like Dropshipping?</Col>
            </Row>
          </Container>

        </Card.Body>
      </Card>


    </>
  );
};

export default Home;