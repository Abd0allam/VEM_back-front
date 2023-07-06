import React from "react";
import AboutComp from "./AboutComp";
import { Link } from "react-router-dom";
import shopping1 from '../assets/shopping1.svg'
import shopping2 from '../assets/shopping2.svg'
import shopping3 from '../assets/shopping3.svg'
const About = () => {
  return (
    <div>
      <div style={{ backgroundImage: 'url(https://e0.pxfuel.com/wallpapers/996/973/desktop-wallpaper-online-shopping-monochrome-online-business-concepts-e-commerce-tip.jpg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center left', backgroundSize: 'cover' }}>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="bg-white rounded shadow p-3 fs-5 lh-lg">
            <AboutComp />
          </div>
        </div>
      </div>;
      <div className="container">
        <div className="row">
          <div className="col d-flex align-items-center" data-aos="fade-right" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="">
              <img
                className=""
                src={shopping1} width={"600px"}
                alt="VEM platform"
              />
            </div>
          </div>
          <div className="col" data-aos="fade-left" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="d-flex flex-column gap-3 justify-content-center text-md-start text-center py-5">
              <h1 className="fs-1">Like Dropshipping?</h1>
              <p className="fs-5 fw-bolder">Dropshipping is a business like any other business</p>
              <p>VEM platform, is an Easy-to-use Online Store builder trusted by millions of stores. From first sale to full scale, and everything In between.
              </p>
              <div className="">

                <Link to="/Projects">
                  <button type="submit" className="btn btn-danger">
                    Explore more
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* ========================================================================================================= */}
      <div className="container">
        <div className="row">
          <div className="col" data-aos="fade-right" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="d-flex flex-column gap-3 justify-content-center text-md-start text-center py-5">
              <h1 className="fs-1">Highly effective money transfer</h1>
              <p className="fs-5 fw-bolder">It's easy to invest into our shops and projects</p>
              <p>VEM platform, understands the clients and their needs, so it increases the purshasing rate and your profits aswell.
              </p>
              <div className="">
                <Link to="/Store">
                  <button type="submit" className="btn btn-danger">
                    Explore more
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center" data-aos="fade-left" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="">
              <img
                className=""
                src={shopping2} width={"600px"}
                alt="VEM platform"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ========================================================================================================= */}
      <div className="container">
        <div className="row">
          <div className="col d-flex align-items-center" data-aos="fade-rigth" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="">
              <img
                className=""
                src={shopping3} width={"600px"}
                alt="VEM platform"
              />
            </div>
          </div>
          <div className="col" data-aos="fade-left" data-aos-offset="300" data-aos-duration="500" data-aos-easing="ease-in-sine">
            <div className="d-flex flex-column gap-3 justify-content-center text-md-start text-center py-5">
              <h1 className="fs-1">Manage Your Marketing Campagin</h1>
              <p className="fs-5 fw-bolder">Understand the market through out the customer perspective</p>
              <p>VEM platform, Helps you to make a strong marketing and PR campagin to make your shop top 1 in all local and global Markets</p>
              <div className="">
                <Link to="/Projects">
                  <button type="submit" className="btn btn-danger">
                    Explore more
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* ========================================================================================================= */}
      {/* ========================================================================================================= */}
    </div>
)};

export default About;