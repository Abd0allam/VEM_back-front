import "./CSS/Profile.css";
// import { Card,Button, Col ,Row } from "react-bootstrap";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
// ================================================================
import { useNavigate } from "react-router-dom";
// -------------------------------------------------------------------
const Profile  = () => {
  const [user, setUser] = useState(); // initial user state
  const [last_name, setlast_name] = useState('');
  const [first_name,setfirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth_date, setbirth_date] = useState('');
  const [location, setLocation] = useState('');
  const [ProfilePicture, setProfilePicture] = useState(null);
//  ======================================================================
 
  // const accessToken = localStorage.getItem('access');
  // const jwt = require('jsonwebtoken');
  // const { userId } = jwt.verify(accessToken, 'my-secret-key');
  // console.log(userId);
  // const inputRef = useRef(null);
// ===================================================================================
 
// =================================================================================================================
  useEffect(() => { 
    const accessToken = localStorage.getItem("access");
    axios.get(`http://127.0.0.1:8000/profile/`,{
      headers: {
      Authorization: `Bearer ${accessToken}`,},})
      .then(response => {
      
        setUser(response.data);
        setfirst_name(response.data.first_name);
        setlast_name(response.data.last_name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setbirth_date(response.data.birth_date);
        setLocation(response.data.location);
        setProfilePicture(response.data.profile_picture);

      })
      .catch(error => console.error(error));
  }, []);
// ============================================================================================================
// ============================================================================================================
// ============================================================================================================
const navigate=useNavigate()
const handleSubmit = async (event) => {
  event.preventDefault();
  const updatedUser = {
    first_name:first_name,
    last_name:last_name
    ,email:email
    ,phone:phone
    ,birth_date:birth_date
    ,location:location,
    
  };  try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.put('http://127.0.0.1:8000/profile/1/',JSON.stringify(updatedUser),{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
         } });
          setUser(response.data);
          console.log(JSON.stringify(updatedUser));
          navigate("/profile")
        } catch (error) {
          console.error(error);
          console.log(error)
          console.log(JSON.stringify(updatedUser));
        }
      };
// =================================================================
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles(file);
    console.log(file);
  }; 

  useEffect(() => {
    const uploadFile = async () => {
      if (selectedFiles) {
        const uploadImages = new FormData();
        uploadImages.append('images', selectedFiles);
        const accessToken = localStorage.getItem("access");
        try {
          const imageRes = await axios.put(
            `http://localhost:8000/profile/1/`,
            uploadImages,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(imageRes.data);
          console.log();
        } catch (err) {
          console.error(err);
        }
      }
    };
    uploadFile();
  }, [selectedFiles]);
// ==================================================================================================================
  return (
  <>
  <div className="container mt-2  ">
    
    <div className="row d-flex justify-content-center full">
    
        <div className="col">
            <div className="card p-3 ">
                <div className="text-center">
                    <img
                  src={ProfilePicture ? `http://localhost:8000/${ProfilePicture}` : require("../assets/user.jpg")}
                       width="150"
                        alt="UserPhoto"
                        className="rounded-circle"/>
                </div>
                <div className="text-center mt-3 p-3">
                    {/* <span className="bg-pramary p-1  rounded text-white">{}</span> */}
                    <h5 className=" mb-0">{ first_name || last_name  ? `${first_name} ${last_name} ` : "NO NAME" 
                       }</h5>
                    {/* <span>UI/UX Designer</span> */}
               {/* ============================================================================= */}
                    {user ? (
                    // <> 
                    <form  onSubmit={handleSubmit} enctype='multipart/form-data'>
               {/* ============================================================================== */}
                      <div className="d-flex justify-content-between ">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="formControlLg">first Name</label>
                          <input type="text"
                            value={first_name} 
                            onChange={(e) => setfirst_name(e.target.value)} 
                            id="formControlLg" 
                            className="form-control form-control-lg" />
                        </div>
               {/* ============================================================================== */}

                        <div className="form-outline">
                        <label className="form-label" htmlFor="formControlLg">Last Name</label>
                          <input type="text"
                             value={last_name} 
                             onChange={(e) => setlast_name(e.target.value)}                     
                             id="formControlLg" 
                            className="form-control form-control-lg" />
                        </div>
                      </div>
               {/* ============================================================================== */}

                      <div className="form-outline">
                      <label className="form-label" htmlFor="formControlLg">Email</label>
                          <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}                          
                          id="formControlLg" 
                          className="form-control form-control-lg" disabled />
                        </div>
               {/* ============================================================================== */}

                        <div className="form-outline">
                        <label className="form-label" htmlFor="formControlLg">Phone Number</label>
                          <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}  
                          id="formControlLg" 
                          className="form-control form-control-lg" />
                        </div>
               {/* ============================================================================== */}
               {/* ============================================================================= */}
               <div className="form-outline">
               <label className="form-label" htmlFor="formControlLg">Birth Date</label>
                          <input 
                          type="text" 
                          value={birth_date}
                          onChange={(e) => setbirth_date(e.target.value)}                          
                          id="formControlLg" 
                          className="form-control form-control-lg" />
                        </div>
               {/* ============================================================================= */}
                        <div className="form-outline">
                        <label className="form-label" htmlFor="formControlLg">Location</label>
                          <input 
                          type="text" 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}                        
                          id="formControlLg" 
                          className="form-control form-control-lg" />
                        </div>
               {/* ============================================================================= */}
                        <div>
                              <div className="edit">
                                  <div className="btn  btn-rounded">
                                      <label className="form-label text-white m-1" htmlFor="customFile1"  >
                                      <img src={require("../assets/photo edit.png")} width={"24px"} alt="edit profile"/>
                                      </label>
                                      <input
                                      type="file"
                                      className="form-control d-none"
                                      id="customFile1"
                                      onChange={handleFileChange}
                                      accept="image/*"
                                    />
                                  </div>
                              </div>
                          </div> 
               {/* ============================================================================= */}
                    <div className="container">
                    <div className="row mt-4">
                    <div className="col"><input className="btn-success" type="submit" value="Save"  /></div>
                    <div className="col"><input className=" bts bg-dark" type="reset" value="reset" /></div>
                    </div>
                    </div>
                    </form>
                    ) : (   
                      <div className="text-center p-4">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>   
                             
                    </div>
          )}        
                </div>                
            </div>
        </div>
    </div>
</div>
  </>
  );
};
export default Profile;
