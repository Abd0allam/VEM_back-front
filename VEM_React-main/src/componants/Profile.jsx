import React from "react";
import "./CSS/Profile.css";
import { Container,Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate,Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


const Profile = () => {
  // ================================================================================================
  const [userInfo, setUserInfo] = useState(null);
  const [shopInfo, setShopInfo] = useState([]);
  const [ID, setID] = useState(null);
  // const [rent,setRent] = useState("");
  const navigate=useNavigate()
  
  useEffect(() => {
  if(!localStorage.getItem('access')){window.location.replace("/Signin");}
  const accessToken = localStorage.getItem("access");
  const decodedToken = jwt_decode(accessToken);
  console.log(decodedToken.user_id);
  setID(decodedToken.user_id)
  axios.get('http://127.0.0.1:8000/profile/',{
    
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
      .then(response => setShopInfo(response.data),
         
      )
      
      
      .catch(error =>
        {
         console.log(error)
         setShopInfo("")
        }
      );
}, []);
  
// =====================================================================================

  const handleDeleteSubmit =  () => {
    const accessToken = localStorage.getItem("access");

    axios.delete(`http://127.0.0.1:8000/shop/shopdetails/${shopInfo.id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        console.log(`Shop with ID ${ID} deleted successfully`);
        window.location.reload()
      })
      .catch(error => {
        console.log(error)

      });
  }
console.log(shopInfo)

const GetMyShop=()=>{
  if(shopInfo){
    console.log(shopInfo.template)
    if(shopInfo.template==1){
        window.location.href='http://127.0.0.1:3000/shop/myshoptemp2'
        console.log("hello"+shopInfo.template)
    }else if(shopInfo.template==2){
      console.log("bye"+shopInfo.template)
      window.location.href='http://127.0.0.1:3000/shop/myshop'
    }
  }
}
// -------------------------------------------------------------------------------------------------------------  
  return (
   <Container className="height_contener my-5">
    <div className="row">
  <div className="col-6 col-md-4 full">
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
                    <form >
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
        
<div className="col-12 col-lg-8 full">
  <div className="card">
    <div className="card-header">My Shops</div>
            { shopInfo ?
            <>
            {
              // shopInfo ?
      <div className="card-body" key={shopInfo.id}>
        <blockquote className="blockquote mb-0">
                    <div className="PhotoShop">
                      <img src={shopInfo.image ?`http://127.0.0.1:8000/${shopInfo.profile_image}` :require("../assets/LogoShopClothes.png") } width={"100PX"} alt="shopPhoto " className="rounded-circle border-white" />
                    </div>          
                    <div className="bg" style={{ height: '220px' }}>
          <img src={ shopInfo.image ? `http://127.0.0.1:8000/${shopInfo.image}`:require("../assets/car2.jpg") } alt="bacground" width={"100%"} style={{ objectFit: 'cover', height: '100%' }} className="card-img-top" srcset="" />          
                    </div>
          <Card.Title className="mt-5 font-weight-bold "><h2>{shopInfo.title}</h2></Card.Title>
          <p>{shopInfo.details}</p>
                    <p className="blockquote-footer">date start<cite title="Source Title">{shopInfo.created_at}</cite></p>
                    <div className="row d-flex flex-row">
                      <div className="col d-flex flex-row-reverse">
                        <Link className="btn btn-success" onClick={GetMyShop} >View</Link >
                </div>
                      <div className="col">
                        <button className=" btn bg-danger text-white" onClick={handleDeleteSubmit} > Delete</button >
                </div>
            </div>
        </blockquote>
      </div>
              
              
              // :
    // <div className="text-center p-5">
    //   <div className="spinner-border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>
    }
  </>
            
      :


<>
              {/* { !Array.isArray(shopInfo) || !shopInfo.length ? */}
              <Link className="card-body text-center" to={"/shop/add"}>
                <blockquote className="blockquote mb-0 p-4  btn btn-light w-100 h-100">
                  <img src={require("../assets/e-commerce.png")} alt="" width={"370px"} srcSet="" />
                  <Card.Title>Add shop</Card.Title>
                  <p className="blockquote-footer"></p>
                </blockquote>
              </Link>
            </>



              
    }
  </div>
</div>




{/* 
  <div className="col-12 col-lg-8 full">
  <div className="card">
            <div className="card-header">My Shops</div>
            if (!userInfo) {
               <Link className="card-body text-center"  to={"/profile/edit"}  >
                    <blockquote className="blockquote mb-0 p-4  btn btn-light w-100 h-100" >
                  <img src={require("../assets/e-commerce.png")} alt="" width={"370px"} srcSet="" />
                                        <Card.Title>Add shop</Card.Title>

                <p className="blockquote-footer"></p>
              </blockquote>
            </Link> 
            }
            else {
              
                <>
                {shopInfo ? shopInfo.map(shop => (
                 <div className="card-body"  key={shop.id} >
                    <blockquote className="blockquote mb-0">
                      <Card.Title>{shop.title}</Card.Title>
                <p>{shop.details}</p>
                <p className="blockquote-footer">date start<cite title="Source Title">{shop.created_at}</cite></p>
              </blockquote>
              </div> 
                )) : 
                   <div className="text-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                } 
          </>  }      
            </div>
        </div>//  */}
        </div> 
                
</Container>
                            
               


  );
};

export default Profile;
