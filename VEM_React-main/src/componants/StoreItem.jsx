import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/shopingCartContext";
import "./CSS/StoreItem.css";
import {Navigate } from "react-router-dom"
import { useNavigate } from "react-router";
import axios from 'axios';




const StoreItem = ({ id, price, title, image ,price_id }) => {
  const navigate = useNavigate();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const displayProduct=()=>{
    localStorage.setItem('display-product',id)
    console.log(id)
    
    
  }


  const handleDeleteProductSubmit =  () => {
    const accessToken = localStorage.getItem("access");
        // console.log(`Shop with ID ${id} deleted successfully`);
  
    axios.delete(`http://127.0.0.1:8000/shop/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        console.log(`Shop with ID ${id} deleted successfully`);
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
  
      });
  }




  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100 " key={id}>
      <Card.Img
        src={`${image}` }
        alt="cardImage"
        variant="top"
        style={{ height: "250px", objectFit: "contain" ,padding:"0 1%"}}
      ></Card.Img>
      <Card.Body>
        <div>
          <button className="btn btn-primary" style={{backgroundColor:"black" ,color:"white",fontWeight:"bolder",borderRadius:"5px", border:"0" ,fontSize:"22px"}}  variant="warning"
              onClick={() => {
                navigate(`/shop/products/displayproduct/${id}/`);
              }}>Display</button>

        </div>
        <Card.Title
          className="d-flex justify-content-between align-items-baseline p-0 "
          style={{height:"17%"}}
          id="cardTitle"
        >
          <h3>{title}</h3> 
          <h5 className="text-muted me-2">  {price} $</h5>
        </Card.Title>
        {localStorage.getItem('userID')!==localStorage.getItem('ownerID')?(
        <div className="mt-auto">
          
          {quantity === 0 ? (
            <button style={{backgroundColor:"black" ,color:"white",fontWeight:"bolder",marginTop:"20px",borderRadius:"10px"}} className="w-100" onClick={() => increaseCartQuantity(id,price_id)}>
              Add To Cart
            </button>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center justify-content-center">
                <button className="px-2"  style={{backgroundColor:"red" ,color:"white",fontWeight:"bolder",borderRadius:"5px", border:"0" ,fontSize:"22px"}} size="sm" onClick={() => decreaseCartQuantity(id)}>
                  -
                </button>
                <span className="fs-3 mx-2">{quantity}</span>
                <button className="px-2" size="sm" style={{backgroundColor:"green" ,color:"white",fontWeight:"bolder",borderRadius:"5px", border:"0" ,fontSize:"22px"}} onClick={() => increaseCartQuantity(id)}>
                  +
                </button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                className="mt-2"
                variant="danger"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        ):(
        <>
        <Button className="btn btn-primary my-4"  variant="warning"
                    onClick={() => {
                    navigate(`/shop/updateproduct/${id}/`);
                    }}>Edit</Button>
                    <button className=" btn bg-danger text-white " style={{marginLeft:"26%"}} onClick={handleDeleteProductSubmit} > Delete</button >
                    </>
                    )}

      </Card.Body>
    </Card>
  );
};

export default StoreItem;
