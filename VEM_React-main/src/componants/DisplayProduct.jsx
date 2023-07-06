import React, { useEffect, useState } from "react";
import "./CSS/DisplayProduct.css";
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
// import StoreItem from "./StoreItem";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router";
const ProductDisplayUser = () => {
  // ================================================================================================
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);
  const [storeItems, setstoreItems] = useState([]);
  const [shopComments, setShopComments] = useState([]);
  const [gotDataProduct, setGotDataProduct] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingSuccess, setRatingSuccess] = useState("");
  // new
  const [productComments, setProductComments] = useState([]);
  const [productInfo, setProductInfo] = useState(null);

  // const [reportingSuccess, setReportingSuccess] = useState('');
  // const [reporting, setReporting] = useState('');
  // const [accessToken,setAccessToken]=useState(null)
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      setUserId(decodedToken.user_id);
    }
    const getProductDetails = async () => {
      const productID = localStorage.getItem("display-product");
      axios
        .get(`http://localhost:8000/shop/products/display/${id}/`, {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        })
        .then((response) => {
          setProductInfo(response.data);
          localStorage.setItem("myProductId", response.data.id);
        })

        .catch((error) => console.log(error));
    };
    getProductDetails();

    //   if(productInfo){
    // console.log(productInfo)

    //   }

    // getProductData();
  }, []);
  if (productInfo) {
    if (userId == productInfo.owner.id) {
      // window.location.href='http://127.0.0.1:3000/shop/myshop'
      // return <Navigate to='/shop/myshop' />
    }
  }
  const my_product_id = localStorage.getItem("myProductId");

  // const getProductData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/shop/myshop/products/?shop_id=${my_shop_id}`);
  //     const products = response.data;
  //     setstoreItems(products);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const accessToken = localStorage.getItem("access");

  const getCommentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/shop/products/comments/${productInfo.id}/`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );
      const comments = response.data;
      setProductComments(comments);
      console.log("coments" + response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // getProductData();

  if (productInfo) {
    //   localStorage.setItem('myShopID',shopInfo.id)
    localStorage.setItem("userID", userId);
    //   localStorage.setItem('ownerID',shopInfo.owner.id)
    if (!gotDataProduct) {
      setGotDataProduct(true);
      // getProductData();
      getCommentsData();
    }
  }
  function handleSubmitComment(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("access");

    axios
      .post(
        "http://localhost:8000/shop/products/comments/create/",
        {
          product: productInfo.id,
          user: userId,
          comment_body: commentBody,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        getCommentsData();
        setCommentBody("");
        // do something with the response, e.g. update the comment list
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleRatingChange(event) {
    setRating(parseInt(event.target.value));
  }
  const getProductDetails = async () => {
    const productID = localStorage.getItem("display-product");
    axios
      .get(`http://localhost:8000/shop/products/display/${id}/`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      })
      .then((response) => {
        setProductInfo(response.data);
        localStorage.setItem("myProductId", response.data.id);
      })

      .catch((error) => console.log(error));
  };

  function handleSubmitRate(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("access");

    axios
      .post(
        "http://localhost:8000/shop/products/add-rate/",
        {
          user: userId,
          product: localStorage.getItem("myProductId"),
          rate: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        getProductDetails();
        setCommentBody("");
        setRatingSuccess("Rating is done (^_^)");

        // do something with the response, e.g. update the comment list
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //   ------------------------------------------------------------------------------
  return (
    <>
      <div className="shop-banner">
        {productInfo ? (
          <img
            className="shop-banner-img"
            src={
              productInfo.image
                ? `http://localhost:8000/${productInfo.image}`
                : require("../assets/user.jpg")
            }
            alt="UserPhoto"
          />
        ) : (
          <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <div className="shop-details">
        {productInfo ? (
          <>
            <h2 className="mt-2 mt-5 " style={{ textAlign: "center" }}>
              <span className="shop-title">{productInfo.title}</span>{" "}
            </h2>
            <div className="text-center p-4 ">
              <p className=" element">
                <h4>
                  <span className="title-detail">Shop</span>:{" "}
                  <span style={{ marginLeft: "1%" }}>
                    {productInfo.shop.title}{" "}
                  </span>{" "}
                </h4>
              </p>
              <p className=" element">
                <h4>
                  <span className="title-detail">Owner</span>:{" "}
                  <span style={{ marginLeft: "1%" }}>
                    {productInfo.owner.first_name} {productInfo.owner.last_name}
                  </span>{" "}
                </h4>
              </p>

              <p className=" element">
                <p>
                  <span className="title-detail">details</span>:{" "}
                  <span style={{ marginLeft: "1%" }}>
                    {productInfo.details}
                  </span>
                </p>
              </p>
              <p className=" element">
                <p>
                  <span className="title-detail">quantity</span>:{" "}
                  <span style={{ marginLeft: "1%" }}>
                    {productInfo.quantity}
                  </span>
                </p>
              </p>

              <p className=" element">
                <span className="title-detail">Rate</span>:{" "}
                <span style={{ marginLeft: "1%" }}>
                  {productInfo.total_rate}
                </span>
              </p>
            </div>
            {localStorage.getItem("access") ? (
              productInfo.owner.id != userId ? (
                <div style={{ display: "flex" }} className="div-shop-rate">
                  <div className="shop-rate">
                    <h3>Add Rate</h3>
                    <form onSubmit={handleSubmitRate}>
                      <label>
                        <div>
                          <label htmlFor="rating-select">Rate this Shop:</label>
                          <select
                            id="rating-select"
                            value={rating}
                            onChange={handleRatingChange}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                          <br />
                          {ratingSuccess ? (
                            <span
                              style={{
                                backgroundColor: "lightgreen",
                                padding: "5px",
                                borderRadius: "10px",
                                width: "fit-content",
                              }}
                            >
                              {ratingSuccess}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </label>
                      <br />
                      <button className="btn btn-primary" type="submit">
                        Rate
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h2>We Wish You Good Luck (^_^)</h2>
                </div>
              )
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2>You Need To Login To See this Part (^_^)</h2>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <div className="shop-comments">
        {productInfo ? (
          <div className=" p-4">
            <h1>Comments</h1>
            <div className=" container-fluid shop-store-container">
              <br />
              <div className="">
                {productComments &&
                  productComments.map((item) => (
                    <Col key={item.id} style={{ padding: "" }}>
                      <div className="comment-label">
                        <span className="user-comment">
                          {item.user.first_name} {item.user.last_name}
                        </span>
                        {productInfo.owner.id == item.user.id ? (
                          <span
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              padding: "10px",
                              marginRight: "10px",
                              borderRadius: "10px",
                              fontWeight: "bolder",
                            }}
                          >
                            Owner{" "}
                          </span>
                        ) : (
                          ""
                        )}
                        {/* <span>{item.report_count} </span> */}
                        <p className="body-comment">{item.comment_body} </p>
                      </div>
                    </Col>
                  ))}
              </div>
            </div>
            {localStorage.getItem("access") ? (
              <>
                <h3>Add Comment</h3>
                <form onSubmit={handleSubmitComment}>
                  <label>
                    <input
                      type="text"
                      placeholder="Comment..."
                      className=" add-comment"
                      value={commentBody}
                      onChange={(event) => setCommentBody(event.target.value)}
                    />
                  </label>
                  <br />
                  <button className="btn btn-primary" type="submit">
                    Comment
                  </button>
                </form>
              </>
            ) : (
              <div>
                <h2>You Need Login To add Comment</h2>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // ------------------------
};

export default ProductDisplayUser;
