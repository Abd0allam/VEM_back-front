import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [getTemp, setGetTemp] = useState([]);

  const getShops = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/shop/allshops/");
      const products = response.data;
      setShops(products);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  // search shop name
  const [shopsName, setShopsName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/shop/allshops/").then((response) => {
      setShopsName(response.data);
      setGetTemp(response.data)
      console.log(response.data)
    });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = shopsName.filter((shop) =>
      shop.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results.slice(0, 3));
  };

  return (
    <div className="container mt-4">
      <FloatingLabel
        controlId="floatingInput"
        label="Search Shops"
        className="mb-3"
        onChange={handleChange}
      >
        <Form.Control type="text" placeholder="Shop name" />
      </FloatingLabel>
      {searchTerm && (
        <ListGroup>
          {searchResults.map((shop) => (
            <ListGroup.Item key={shop.id}>
              <Link
                to={`/shops/${shop.id}`}
                className=" text-decoration-none text-primary"
              >
                {shop.title}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {shops &&
        shops.map((item) => (
          <div key={item.id} className="mt-3">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <Link to={`/shop/displayshop/${item.id}`}>
                    <img
                      src={item.image}
                      class="img-fluid rounded-start fit"
                      alt="Shop"
                      style={{ height: "200px" }}
                    />
                  </Link>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h4 class="card-title fw-bold">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </h4>
                    <p class="card-text">
                      <span className=" fw-bold">Description : </span>
                      {item.details.split(" ").slice(0, 20).join(" ")}
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">
                        Owner : {item.owner.first_name}{" "}{item.owner.last_name}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shops;
