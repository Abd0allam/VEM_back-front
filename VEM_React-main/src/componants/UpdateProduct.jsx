import { useState ,useEffect} from "react";
import axios from "axios";
import "./CSS/AddProduct.css";
import { useParams } from "react-router";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  //   const { product } = product;
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {

    const accessToken = localStorage.getItem("access");

      axios
        .get(`http://localhost:8000/shop/products/display/${id}/`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setProductInfo(response.data);
          setTitle(response.data.title);
          setDetails(response.data.details);
          setPrice(response.data.price);
          setQuantity(response.data.quantity);
          setOldImage(response.data.image);
          localStorage.setItem("myProductId", response.data.id);
        })

        .catch((error) => console.log(error));
      }, []);

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if(image!==null){

      formData.append("image", image);
    }
    

    e.preventDefault();
    const accessToken = localStorage.getItem("access");

    await axios
      .put(`http://localhost:8000/shop/products/${id}/`, formData, {
        headers: {
          //   "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.replace("/shop/myshop");
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  return (
    <div className="row">
      <div className="col-12 col-md-8 my-2 mx-auto">
        <div className="card">
          {localStorage.getItem("access") ? (
            <>
              <div className="card-header text-center text-info fs-3">
                Enter the information you want to update
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                  <label>Title:</label>
                  <br />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />
                  <label>Details:</label>
                  <br />
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                  <br />
                  <label>Price:</label>
                  <br />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <br />
                  <label>Quantity:</label>
                  <br />
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <div className="card mt-3 ">
                    <div className="card-header text-info fs-5">
                      Add or Change image of the Product
                    </div>
                    {oldImage ? (
                      <img
                        className=""
                        src={
                          oldImage
                            ? `http://localhost:8000/${oldImage}`
                            : require("../assets/user.jpg")
                        }
                        alt="Productimage"
                      />
                    ) : (
                      <div className="text-center p-5">
                        <div className="" role="status">
                          <span className="">No image for this product</span>
                        </div>
                      </div>
                    )}
                    <div className="card-body">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-success w-100 mx-auto my-2"
                  >
                    Update Product
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }} className="vh-100">
              <h2>You Need To Login To See this Part (^_^)</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateProduct;
