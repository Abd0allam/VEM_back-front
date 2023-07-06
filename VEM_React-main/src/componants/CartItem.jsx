import React, { useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/shopingCartContext";
import axios from "axios";

const CartItem = ({ id, quantity }) => {
  const [storeItems, setstoreItems] = useState([]);
  const shop_id=localStorage.getItem('shopID')

  const getProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/shop/mycart/products/`);
      const products = response.data;
      setstoreItems(products);
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        alt="cart-img"
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {item.title.split(" ").slice(0, 2).join(" ")}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {item.price} $
        </div>
      </div>
      <div>{item.price * quantity} $</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
