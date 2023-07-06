import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryString from "query-string";
import { API_URL } from "../config/index";

import "./CSS/payment.css";

const Payment = () => {
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price_id: "price_1NP6lGKIlhL0Db7DvMMcWeWV",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price_id: "price_1NPAO9KIlhL0Db7DRqt3Qp9e",
      quantity: 1,
    },
    {
      id: 3,
      name: "Product 3",
      price_id: "price_1NPARxKIlhL0Db7DHHb8dzdN",
      quantity: 5,
    },
  ];
  const location = useLocation();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    const values = QueryString.parse(location.search);

    if (values.success) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (values.canceled) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action={`${API_URL}/shop/create-checkout-session`} method="POST">
        <input
          type="hidden"
          name="cart_items"
          value={JSON.stringify(cartItems)}
        />
       
        <button className="button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
};

export default Payment;

