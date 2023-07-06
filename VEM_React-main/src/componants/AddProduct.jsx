import React, { useEffect, useState } from "react";
import "./CSS/AddProduct.css";
import { Container } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";

const AddProduct = () => {
  const ownerEmail = localStorage.getItem("email");
  const [product_id, setProduct_id] = useState("")
  const [productData, setProductData] = useState({
    title: "",
    details: "",
    price: "",
    quantity: "",
  });
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const handleFileSelect = (event) => {
  //   setSelectedFiles([...selectedFiles, ...event.target.files]);
  //   console.log(selectedFiles)
  //   console.log(event.target.files)
  // };
  const [image , setImage ] = useState(null)

  const handleSubmit = async (e) => {

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('details', productData.details);
    formData.append('price', parseFloat(productData.price));
    formData.append('quantity', parseInt(productData.quantity));
    formData.append('ownerEmail', ownerEmail);
    if (image) {
        formData.append('image', image)
    } 
    e.preventDefault();
  

    const accessToken = localStorage.getItem("access");

    try {
      const response = await axios.post(
        "http://localhost:8000/shop/addproducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      

      

      window.location.replace("/shop/myshop");
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(() => {
  //   const uploadImages = async () => {
  //     if (product_id !== "") {
  //       const formData = new FormData();
  //       for (let i = 0; i < selectedFiles.length; i++) {
  //         formData.append("images", selectedFiles[i]);
  //       }
  
  //       const accessToken = localStorage.getItem("access");
  
  //       try {
  //         const imageRes = await axios.post(
  //           `http://localhost:8000/shop/${product_id}/images/`,
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           }
  //         );
  
  //         console.log(imageRes.data);
  //         window.location.replace("/");
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   };
  
  //   uploadImages();
  // }, [product_id]);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <div className="row">
        <div className="col-12 col-md-8 my-2 mx-auto">
          <div className="card">
          {localStorage.getItem("access")? (
            <>
            <div className="card-header text-center text-info fs-3">
              Enter the following information about your product
            </div>
            <div className="card-body">
              <form className="myform" onSubmit={handleSubmit} enctype='multipart/form-data'>
                <div className="txt_field">
                  <label>Title</label>
                  <br />
                  <input
                  required
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="txt_field">
                  <label>Details</label>
                  <br />
                  <textarea
                  required
                    type="text"
                    name="details"
                    value={productData.details}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="txt_field">
                  <label>Price</label>
                  <br />
                  <input
                  required
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="txt_field">
                  <label>Quantity</label>
                  <br />
                  <input
                  required
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="card mt-3 ">
                  <div className="card-header text-info fs-5">
                    Add some images to the Product
                  </div>
                  <div className="card-body">
                   
                    <label htmlFor="file-upload">Choose Images:</label>
                    <input
                      id="file-upload"
                      type="file"
                      required
                      onChange={e => setImage(e.target.files[0])} 
                      accept="image/*"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 my-2 mx-auto">Add Product</button>
              </form>
            </div>
            </>)
            :(
              <div style={{textAlign:"center"}} className="vh-100">
                  <h2>You Need To Login To See this Part (^_^)</h2>
              </div>
              )}  
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddProduct;
