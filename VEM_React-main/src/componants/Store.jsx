import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";
import axios from "axios";

const Store = () => {
  const [storeItems, setstoreItems] = useState([]);

  const getProductData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const products = response.data;
      setstoreItems(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className=" container-fluid">
      <h1>Store</h1>
      <Row md={3} xs={1} sm={2} lg={4} className="g-3">
        {storeItems &&
          storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Store;
