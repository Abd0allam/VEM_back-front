import React from "react";
import "./CSS/Profile.css";
import { Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const Profile  = () => {
// ================================================================================================
const [userInfo, setUserInfo] = useState(null);
const [shopInfo, setShopInfo] = useState(null);
const [shopData, setShopData] = useState(null);
const [checkShop,setCheckShop]=useState(false)
const body={}

useEffect(() => {
  const accessToken = localStorage.getItem("access");
  axios.get('http://localhost:8000/profile/',{
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => setUserInfo(response.data), 
    )
    
    .catch(error => console.log(error));

    axios.get('http://localhost:8000/shop/myshop',{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => setShopData(response.data),
         
      )
      
      
      .catch(error => console.log(error));
}, []);
// console.log(userInfo.data)
// useEffect(() => {
//   axios.get('http://127.0.0.1:8000/shop/rated')
//     .then(response => setShopInfo(response.data))

//     .catch(error => console.log(error));
// }, []);

const getMyShop= async ()=>{
  const accessToken = localStorage.getItem("access");
 
  axios.get('http://localhost:8000/shop/myshop',{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {setShopData(response.data)
      console.log("happy")
      
    }
       
    )
    
    
    .catch(error => console.log(error));
    console.log(shopData)
    const getTemplate=async ()=>{
              if(shopData){
                console.log(shopData.template)
                if(shopData.template==1){
                    window.location.href='http://127.0.0.1:3000/shop/myshop'
                }else if(shopData.template==2){
                  window.location.href='http://127.0.0.1:3000/shop/myshop'
                }
              }
            }
    getTemplate()
    
    
}
// -------------------------------------------------------------------------------------------------------------  
  return (
   <Container className="height_contener my-5">
    <div className="row">
  <div className="col-6 col-md-4">
            <div className="card p-1  ">
            {userInfo ? (
              <>
                <div className="text-center">
                    <img src={userInfo.profile_picture ? `http://localhost:8000/${userInfo.profile_picture}` : require("../assets/user.jpg")} width="150" alt="UserPhoto" className="rounded-circle"/>
                </div>
                    <div className="text-center p-1">
                    <h5 className="mt-2 mt-1"> {userInfo.first_name} {userInfo.last_name}</h5>
                    <span className=".text-primary p-1 px-4 rounded " style={{display: userInfo.is_seller ? "inline" : "none"}}>Seller</span>
                    <img src={require("../assets/quality.png")} width="30" alt="quality" style={{display: userInfo.is_active? "inline" : "none"}}/>
                    {/* <span>UI/UX Designer</span> */}                    
                    </div  >
                    <form  method="GET">
                      <div className="txt_field1">
                        <input type="email"  value={userInfo.email || "No email"}  readOnly />
                        <span></span>
                        <label>Email</label>
                      </div>
                      <div className="txt_field1">
                        <input type="tel"  value={userInfo.phone|| "no name"}  readOnly />
                        <span></span>
                        <label>Phone</label>
                      </div>
                      <div className="txt_field1">
                        <input type="text"   value={userInfo.birth_date|| "no name"}  readOnly />
                        <span></span>
                        <label>Birth Date</label>
                      </div>
                      <div className="txt_field1">
                        <input type="text"  value={userInfo.location|| "no name"}  readOnly />
                        <span></span>
                        <label>Location</label>
                      </div>
                      
                    </form>
                    <button className="btn btn-primary" onClick={getMyShop}>My Shop</button>
                    <Link to="/profile/edit">
                    <img  src={ require("../assets/edit-button.png")} width={"70px"} alt="edit profile" className="btn btn-light  edit1" />  
                    </Link> 
                </>   
                ) : (   
                  <div className="text-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
      )}        
            </div>
            </div>
{/* ----------------------------------------------------------------------------------------- */}

  <div class="col-12 col-md-8 mt-2">
  <div class="card">
  <div class="card-header">My Shops</div>
  {shopInfo? (
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <p class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></p>
    </blockquote>
    </div>
                ) : (   
                  <div className="text-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
      )} 
       </div>
  </div>
</div>
 </Container>
  );
};

export default Profile;

