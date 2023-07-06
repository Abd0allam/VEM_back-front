import React, { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shopingCartContext";
import CartItem from "./CartItem";
import axios from "axios";
import { API_URL } from "../config/index";


const ShoppingCart = ({ isOpen },{ id, quantity }) => {
  const [storeItems, setstoreItems] = useState([]);
  const [gotDataProduct, setGotDataProduct] = useState(false);

  
  

  useEffect(() => {
    
   
    const getProductData = async () => {
    
      try {
        const response = await axios.get(`http://localhost:8000/shop/mycart/products/`);
        const products = response.data;
        setstoreItems(products);
    
      } catch (error) {
        console.log(error);
      }
    };
    
    getProductData(); 
  }, []);



    // if(!gotDataProduct){
    //   setGotDataProduct(true)
    //   console.log(gotDataProduct)
    //   getProductData();
    // }
  
  
  const { closeCart, cartItems } = useShoppingCart();
  const get_id=localStorage.getItem('shopping-cart')
  
  const ids=cartItems.map((item) => (item.id))
  const items = storeItems.filter((i) =>ids.includes(i.id));

  // console.log(items)
  console.log(cartItems)
  const { DeleteAll } = useShoppingCart();

  
  
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <form action={`${API_URL}/shop/create-checkout-session`} onSubmit={()=>DeleteAll()} method="POST">
        <input
          type="hidden"
          name="cart_items"
          value={JSON.stringify(cartItems)}
        />
       
       
          <button className="btn btn-info " type="submit" >
            Total :{"  "}
            {cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              return Math.ceil(total + (item?.price || 0) * cartItem.quantity);
            }, 0)}
            {" "}$
          </button>
      </form>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
