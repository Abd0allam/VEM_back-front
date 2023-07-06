import React, { useEffect, useState } from "react";
import "./CSS/DisplayShop.css";
import { Col, Row ,Container } from "react-bootstrap";
import axios from 'axios';
import { Link ,Navigate} from "react-router-dom";
import StoreItem from "./StoreItem";
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router";
import StarRatings from 'react-star-ratings';


const ShopDisplayUser  = () => {
// ================================================================================================
const { id } = useParams();
const [userInfo, setUserInfo] = useState(null);
const [shopInfo, setShopInfo] = useState(null);
const [storeItems, setstoreItems] = useState([]);
const [shopComments, setShopComments] = useState([]);
const [gotDataProduct, setGotDataProduct] = useState(false);
const [commentBody, setCommentBody] = useState('');
const [userId, setUserId] = useState(null);
const [rating, setRating] = useState(0);
const [ratingSuccess, setRatingSuccess] = useState('');

const [reportingSuccess, setReportingSuccess] = useState('');
const [reporting, setReporting] = useState('');
// const [accessToken,setAccessToken]=useState(null)
useEffect(() => {
 const accessToken =localStorage.getItem("access");
  if (accessToken) {
    const decodedToken = jwt_decode(accessToken);
    setUserId(decodedToken.user_id);
  }
  const getShopDetails= async ()=>{
    axios.get(`http://localhost:8000/shop/displayshop/${id}`)
      .then(response => setShopInfo(response.data), 
      )
      
      .catch(error => console.log(error));
  }
  getShopDetails()
  
  if(shopInfo){
    
       localStorage.setItem('currentShop',shopInfo.id)
       
  }
 

  // getProductData();
}, []);
if(shopInfo){
    if (userId==shopInfo.owner.id) {
        // window.location.href='http://127.0.0.1:3000/shop/myshop'
        return <Navigate to='/shop/myshop' />
      }}
const my_shop_id=localStorage.getItem('currentShop')


const getProductData = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/shop/myshop/products/?shop_id=${my_shop_id}`);
    const products = response.data;
    setstoreItems(products);

  } catch (error) {
    console.log(error);
  }
};
const getCommentsData = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/shop/myshop/comments/?shop_id=${my_shop_id}`);
    const comments = response.data;
    setShopComments(comments);
    console.log("coments"+response.data);
  } catch (error) {
    console.log(error);
  }

};
// getProductData();

if(shopInfo){
  localStorage.setItem('currentShop',shopInfo.id)
  localStorage.setItem('userID',userId)
  localStorage.setItem('ownerID',shopInfo.owner.id)
  if(!gotDataProduct){
    setGotDataProduct(true)
    getProductData(); 
    getCommentsData()
  }

}
function handleSubmitComment(event) {
  event.preventDefault();
  const accessToken =localStorage.getItem("access");

  axios.post('http://localhost:8000/shop/myshop/comments/create/', {
    shop: my_shop_id,
    user:userId,
    comment_body: commentBody
  },{
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => {

      getCommentsData()
      setCommentBody("")
      // do something with the response, e.g. update the comment list
    })
    .catch(error => {
      console.error(error);
    });
}
function handleRatingChange(event) {
    setRating(parseInt(event.target.value));
}
const getShopDetails= async ()=>{
    const accessToken =localStorage.getItem("access");

    axios.get(`http://localhost:8000/shop/displayshop/${id}`,{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        setShopInfo(response.data)
      }
      )
      
      .catch(error => console.log(error));
  }

function handleSubmitRate(event) {
    event.preventDefault();
    const accessToken =localStorage.getItem("access");
  
    axios.post('http://localhost:8000/shop/add-rate/', {
      user:userId,
      shop: my_shop_id,
      rate: rating
    },{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
  
        getShopDetails()
        setCommentBody("")
        setRatingSuccess("Rating is done (^_^)")

        // do something with the response, e.g. update the comment list
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleReportChange = (event) => {
    const { value } = event.target;
    setReporting( value );
  };


  const handleReportSubmit = (event) => {
    event.preventDefault();
    const accessToken =localStorage.getItem("access");
  
    axios.post('http://localhost:8000/shop/set-report/', {
      user:userId,
      shop: my_shop_id,
      report_type: reporting
    },{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
  
        getShopDetails()
        setReporting("")
        setReportingSuccess("Your Report is Set (x_x)")

      })
      .catch(error => {
        console.error(error);
      });

  };



  
// -------------------------------------------------------------------------------------------------------------  
  return (
    <>
    {/* {shopInfo ? getProductData():console.log('hello')} */}
    <div className="shop-banner">
    {shopInfo ?(
      <img className="shop-banner-img" src={shopInfo.image ? `http://localhost:8000/${shopInfo.image}` : require("../assets/user.jpg")} alt="UserPhoto" />
      ): (   
        <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}
       {/* {shopInfo ?( */}
       <div className="text-center">
                    <img src={shopInfo &&shopInfo.profile_image ? `http://localhost:8000/${shopInfo.profile_image}` : require("../assets/user.jpg")} width="150" alt="UserPhoto" className=" Photo_Shop "/>
                </div>
      {/* ): (    */}
        {/* <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
    {/* )} */}
 
      </div>
      
    <div className=" d-flex flex-column flex-wrap align-items-stretch">
      {shopInfo ?(
        <>
        <h2 className=" mt-5 " style={{textAlign:"center"}}><span className="border-bottom">{shopInfo.title}</span>  </h2>
        <div className="text-center p-4 ">
                <p className=" element"><h4><span className="">Owner</span>: <span style={{marginLeft:"1%"}}>{shopInfo.owner.first_name} {shopInfo.owner.last_name}</span> </h4></p>
                <p className=" element"><p><span className="">details</span>:  <span style={{marginLeft:"1%"}}>{shopInfo.details}</span></p></p>  
                <p className=" element"><span className="">Category</span>:  <span style={{marginLeft:"1%"}}>{shopInfo.category.name}</span></p>
                <p className=" element">
               <StarRatings
                rating={Math.floor(shopInfo.total_rate)}
                starRatedColor="gold"
                starHoverColor="blue"
                // changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="10px"
                starEmptySymbol={<i className="far fa-star"></i>}
                starFullSymbol={<i className="fas fa-star"></i>}
              /> 
              <p>You rated this {Math.floor(shopInfo.total_rate)} stars.</p></p>
              <p className="bg-danger p-2 text-light">
                     <span   >Report Count</span>:  <span style={{marginLeft:"1%"}}>{shopInfo.report_count}</span></p>
                              
        </div  > 
        {localStorage.getItem("access")?(<div style={{display:"flex"}} className="div-shop-rate">
        
        <div  className="shop-rate">

                  
                    <h3>Add Rate</h3>
                    <form onSubmit={handleSubmitRate}>
                      <label>

                            <div>
                                <label htmlFor="rating-select">Rate this Shop:</label>
                                <select id="rating-select" value={rating} onChange={handleRatingChange}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    {/* <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option> */}
                                </select>
                                <br />
                                {ratingSuccess?(
                                      <span style={{backgroundColor:"lightgreen",padding:"5px",borderRadius:"10px",width:"fit-content"}}>{ratingSuccess}</span>
                            ):("")

                              }                            </div>                    
                       </label>
                      <br />
                      <button className="btn btn-primary" type="submit">Rate</button>
                    </form> 
                    
          </div> 

          <div className="shop-report">

                  
                    <h3>Report This Shop</h3>
                    <form onSubmit={handleReportSubmit}>
                      <label>

                            <div>
                            <label htmlFor="report_type">Report Type:</label>
                            <select name="report_type" onChange={handleReportChange}>
                              <option value="" disabled selected>Choose a report type...</option>
                              <option value="Inappropriate Content">Inappropriate Content</option>
                              <option value="Fake Shop">Fake Shop</option>
                              <option value="Other">Other</option>
                            </select>
                            <br />
                            {reportingSuccess?(
                                      <span style={{backgroundColor:"red",padding:"5px",borderRadius:"10px",width:"fit-content"}}>{reportingSuccess}</span>
                            ):("")

                              }
                            </div>                    
                       </label>
                      <br />
                      <button className="btn btn-primary" type="submit">Report</button>
                    </form> 
                    
          </div>
        </div>
                    ):(
                    <div style={{textAlign:"center"}}>
                        <h2>You Need To Login To See this Part (^_^)</h2>
                    </div>
                    )}      
        </> 
        ): (   
          <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      
      )}
    
        
    </div>
    
    
    <div className="shop-store">
      {shopInfo ?(
          <div className=" p-4">
                  <h1 className="text-center bg-dark text-light" >Store</h1>
                <div className=" container-fluid shop-store-container">
                  <br />
                  <Row md={3} xs={1} sm={2} lg={4} className="g-3">
                    {storeItems &&
                      storeItems.map((item) => (
                        <Col key={item.id} style={{ padding: "1%" }}>
                          <StoreItem {...item}></StoreItem>
                        </Col>
                      ))}
                  </Row>
                </div>                
          </div  >        
                      ): (   
            <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
    </div>
    <div className="shop-comments">
      {shopInfo ?(
          <div className=" p-4">
                  <h1>Comments</h1>
                <div className=" container-fluid shop-store-container">
                  <br />
                  <div  className="">
                    {shopComments &&
                      shopComments.map((item) => (
                        <Col key={item.id} style={{ padding: "" }}>
                          <div className="comment-label">
                            <span className="user-comment">{item.user.first_name} {item.user.last_name}</span>
                            {shopInfo.owner.id==item.user.id?(<span className="user-comment bg-info"  style={{}}>Owner </span>):("")}
                            {/* <span>{item.report_count} </span> */}
                            <p className="body-comment">{item.comment_body} </p>
                          </div>
                        </Col>
                        
                      ))}
                  </div>
                </div>  
                {localStorage.getItem("access")?(<>
                <h3>Add Comment</h3>
                <form onSubmit={handleSubmitComment}>
                  <label>
                   
                    <input type="text" placeholder="Comment..." className=" add-comment" value={commentBody} onChange={event => setCommentBody(event.target.value)} />
                  </label>
                  <br />
                  <button className="btn btn-primary" type="submit">Comment</button>
                </form> 
                </>
                ):(
                <div>
                    <h2>You Need Login To add Comment</h2>
                </div>
                )}
                             
          </div  >        
                      ): (   
            <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
    </div>
  

 </>
  );
};

export default ShopDisplayUser;

