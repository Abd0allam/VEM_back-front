import "./CSS/PricingPage.css";
import axios from 'axios'; 
import React from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
const accessToken = localStorage.getItem("access");
const decodedToken = jwtDecode(accessToken);
console.log(decodedToken.user_id);
const ID=decodedToken.user_id;
const PricingPage = () => {
  const navigate = useNavigate()
// ---------------------------------------------------------------------------
    const handleonemonth = () => {    
        const accessToken = localStorage.getItem("access");
        // the current date
        const currentDate = new Date();
        // Add 30 days to the current date
        const futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        // Format the dates as YYYY-MM-DD strings
        const futureDateFormatted = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;

        const requestData = {
          end_date:futureDateFormatted,
            type: "Monthly",
            user:ID,
            shop:"1",
        };

        axios.post('http://127.0.0.1:8000/shop/subscribe/', JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, } })
            .then(response => {
                console.log(JSON.stringify(requestData));
                navigate("/profile")
                console.log(response);
            })
            .catch(error => {
                console.log(JSON.stringify(requestData));
                // console.log(error);
            });
    }
// ============================================================================================================
     const handleoneyear = () => {    
        // the current date
        const currentDate = new Date();
        // Add 365 days to the current date
        const futureDate = new Date(currentDate.getTime() + (365 * 24 * 60 * 60 * 1000));
        // Format the dates as YYYY-MM-DD strings
        const futureDateFormatted = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;

        const requestData = {
            end_date: futureDateFormatted,
            type: "Yearly",
            user: ID,
            shop:"1",
        };

        axios.post('http://127.0.0.1:8000/shop/subscribe/', JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, } })
            .then(response => {
                console.log(JSON.stringify(requestData));
                navigate("/profile")
                console.log(response);
            })
            .catch(error => {
                console.log(JSON.stringify(requestData));
                console.log(error);
            });
    }
// ============================================================================================================
   const handleoneweek = () => {    
        const accessToken = localStorage.getItem("access");
        // the current date
        const currentDate = new Date();
        // Add 30 days to the current date
        const futureDate = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        // Format the dates as YYYY-MM-DD strings
        const futureDateFormatted = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;

        const requestData = {
          end_date:futureDateFormatted,
            type: "Monthly",
            user:ID,
            shop:"1",
        };

        axios.post('http://127.0.0.1:8000/shop/subscribe/', JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, } })
            .then(response => {
                console.log(JSON.stringify(requestData));
                navigate("/profile")
                console.log(response);
            })
            .catch(error => {
                console.log(JSON.stringify(requestData));
                // console.log(error);
            });
    }
// ============================================================================================================
   
// =================================================================
     return (
         <div className="BodyPricingPage">
{/* ============================================================================================================== */}
<div className="pricing-table">
  <div className="pricing-card">
    <h3 className="pricing-card-header">FREE</h3>
    <div className="price"><sup>$</sup>00<span>/WEEK</span></div>
    <ul>
      <li><strong style={{marginRight:"10PX"}}>1</strong>Website</li>
      <li><strong style={{marginRight:"10PX"}}>1</strong>shop</li>
      <li><strong style={{marginRight:"10PX"}}>20</strong>Products</li>
      <li><strong style={{marginRight:"10PX"}}>1</strong>Domain Name</li>
      <li><strong style={{marginRight:"10PX"}}>10</strong>upload Photo Banners</li>
    </ul>
    <a href="#1" className="order-btn" onClick={handleoneweek} >Try Now</a>
  </div>
{/* ================================================================================================================ */}

  <div className="pricing-card">
    <h3 className="pricing-card-header">Professional</h3>
    <div className="price"><sup>$</sup>30<span>/MONTH</span></div>
    <ul>
      <li><strong></strong>seller and </li>
      <li><strong style={{marginRight:"10PX"}}>3</strong>shop</li>
      <li><strong style={{fontSize:"25px",marginRight:"10PX"}} >∞</strong>Products</li>
      {/* <li><strong>2</strong>Domain Name</li> */}
      <li><strong style={{fontSize:"25px",marginRight:"10PX"}}>∞</strong>upload Photo Banners</li>
    </ul>
    <a href="#1" className="order-btn" onClick={handleonemonth}>BUY Now</a>
  </div>
{/* ================================================================================================================ */}

  <div className="pricing-card">
    <h3 className="pricing-card-header">Premium</h3>
    <div className="price"><sup>$</sup>50<span>/YRAR</span></div>
    <ul><li><strong></strong>seller and </li>
      <li><strong style={{marginRight:"10PX"}}>3</strong>shop</li>
      <li><strong style={{fontSize:"25px",marginRight:"10PX"}} >∞</strong>Products</li>
      {/* <li><strong>2</strong>Domain Name</li> */}
      <li><strong style={{fontSize:"25px",marginRight:"10PX"}}>∞</strong>upload Photo Banners</li>
    </ul>
    <a href="#1" className="order-btn" onClick={handleoneyear}>BUY Now</a>
                 </div>
{/* ================================================================================================================ */}
                 
             </div> 
             </div>
  );
};
 export default PricingPage;
