import "./CSS/Profile.css";
// import { Card,Button, Col ,Row } from "react-bootstrap";
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

const Profile  = () => {
  const [user, setUser] = useState(); // initial user state
  const [last_name, setlast_name] = useState('');
  const [first_name,setfirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth_date, setbirth_date] = useState('');
  const [location, setLocation] = useState('');
  const [ProfilePicture,setProfilePicture] = useState(null);
  const [displayedimage,setDisplayedimage]= useState(null);
  const inputRef = useRef(null);
  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  }; 
  const handlePhotoClick = () => {
    inputRef.current.click();
  };
// =================================================================================================================
  useEffect(() => {
    if(!localStorage.getItem('access')){window.location.replace("/Signin");}

    // fetch user data from backend when component mounts
    const accessToken = localStorage.getItem("access");

    axios.get(`http://localhost:8000/profile/`,{
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        
        setUser(response.data);
    

        setfirst_name(response.data.first_name);
        setlast_name(response.data.last_name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setbirth_date(response.data.birth_date);
        setLocation(response.data.location);
        setDisplayedimage(response.data.profile_picture);
      })
      .catch(error => console.error(error));
  }, []);
// ============================================================================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    if (phone !== null) {
      formData.append('phone', phone);
    }
    if (birth_date !== null) {
      formData.append('birth_date', birth_date);
    }
    formData.append('location', location);
    if (ProfilePicture !== null) {
      formData.append('profile_picture', ProfilePicture);
    }
    // const updatedUser = {
    //   first_name:first_name,
    //   last_name:last_name
    //   ,email:email
    //   ,phone:phone
    //   ,birth_date:birth_date
    //   ,location:location,
      
    // };
    try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.put('http://localhost:8000/profile/edit',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
         } });
         console.log(response)
         window.location.replace("/profile");

         
        } catch (error) {
          console.error(error);
          console.log(formData);
        }
      };
      
// ==================================================================================================================
  return (
  <>
  <div className="container mt-2 w-50">
    
    <div className="row d-flex justify-content-center">
        <div className="col">
            <div className="card ">
                <div className="text-center">
                    <img style={{marginTop:"3%"}} onChange={(e) => setProfilePicture(e.target.value)} src={displayedimage ? `http://localhost:8000/${displayedimage}` : require("../assets/user.jpg")} width="150" alt="UserPhoto" className="rounded-circle"/>

                </div>
                              <div className="text-center mt-3 p-3">
                    {/* <span className="bg-pramary p-1  rounded text-white">{}</span> */}
                    <h5 className=" mb-0">{first_name} {last_name} </h5>
                    {/* <span>UI/UX Designer</span> */}
                    {user ? (
                    // <>
                    <form onSubmit={handleSubmit} enctype='multipart/form-data'>
                      <div className="d-flex justify-content-between ">
                      <div className="txt_fieldedit  " >
                        <input type="text"   value={first_name} onChange={(e) => setfirst_name(e.target.value)}   />
                        <span></span>
                        <label>first Name</label>
                      </div>
                      <div className="txt_fieldedit ">
                        <input type="text"   value={last_name} onChange={(e) => setlast_name(e.target.value)}/>
                        <span></span>
                        <label>Last Name</label>
                      </div>
                      </div>
                      <div className="txt_fieldedit">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span></span>
                        <label>Email</label>
                      </div>
                      <div className="txt_fieldedit">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <span></span>
                        <label>Phone Number</label>
                      </div>
                      <div className="txt_fieldedit">
                        <input type="date"  value={birth_date} onChange={(e) => setbirth_date(e.target.value)} />
                        <span></span>
                        <label>Birth Date</label>
                      </div>
                      <div className="txt_fieldedit">
                        <input type="text"  value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <span></span>
                        <label>Location</label>
                      </div>
                      {/* <input type="file" name="photo" onChange={handleFileChange} style={{ display: "none" }} /> */}
                      <input
                      id="file-upload"
                      type="file"
                      
                      onChange={e => setProfilePicture(e.target.files[0])} 
                      accept="image/*"
                    />
                     
                    <div className="container">
                    <div className="row">
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