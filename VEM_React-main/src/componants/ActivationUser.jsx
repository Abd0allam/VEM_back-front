import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import { Link, Navigate,Redirect } from "react-router-dom";


// const Activation = ({ match }) => {

const Activation = () => {
  const [activated, setActivated] = useState(false);
  const { uid, token } = useParams();
  const [error, setError] = useState("");
  // const body={
  //   uid:uid
  //   ,token:token
  // }
 
  useEffect(() => {
    // const { uid, token } = match.params;
    
    
  }, []);

  const verify_account=()=>{
    console.log("hello1 "+uid)
    
    console.log("hello2 "+token)

    axios
      .post('http://localhost:8000/account/users/activation/',{uid,token},{
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setActivated(true);
        console.log(activated)
      })
      .catch(error => {
        setError(error.response.data.toString());
        console.log(activated)
        
      });
  }
  if (activated) {
      

      window.location.href='http://localhost:3000/Signin'
  
    // return <Navigate to='/' />
}
  return (
    <div>
        <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
      {/* {activated ? (
        <h1>Account activated successfully (^_^)</h1>
      ) : (
        <h1>Activation failed (X_X)</h1>
      )} */}
    </div>
  );
};

export default Activation;
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

// const Activation = () => {
//   const history = useHistory();
//   const { uid, token } = useParams();

//   useEffect(() => {
//     axios
//       .post("/auth/users/activation/", { uid, token })
//       .then(() => {
//         history.push("/activation-success");
//       })
//       .catch(error => {
//         history.push("/activation-failure");
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Activating your account...</h1>
//     </div>
//   );
// };

// export default Activation;



