import {  useParams } from "react-router-dom";
import axios from "axios";
import { Link, Navigate,Redirect } from "react-router-dom";
import React,{ useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/Login.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// const Activation = ({ match }) => {

const ConfirmResetPassword = () => {
  const errRef = useRef();

  const [activated, setActivated] = useState(false);
  const { uid, token } = useParams();
  const [error, setError] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  // const body={
  //   uid:uid
  //   ,token:token
  // }



  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [ pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    
    const v2 = PWD_REGEX.test(pwd);
    if ( !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const body = {
        uid:uid,
        token:token,
        new_password: pwd,
        re_new_password: pwd,
      };
      axios.post(
        "http://localhost:8000/account/users/reset_password_confirm/",
        body,
        {
          headers: { "Content-Type": "application/json" },
          
        }
      )
      .then(() => {
        setSuccess(true);
        console.log(success)
      })
      .catch(error => {
        console.log("error")
        
      });
      console.log(success);
      
      
      if (success) {
          window.location.href='http://localhost:3000/Signin'
          console.log(success+"hello from if success");
        }
        console.log(success+"heeloo after");
      //clear state and controlled inputs
      //need value attrib on inputs for this
      
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };




 
  useEffect(() => {
    // const { uid, token } = match.params;
    
    
  }, []);

  
  if (success) {
      

      window.location.href='http://localhost:3000/Signin'
  
    // return <Navigate to='/' />
}
  return (
    
    <>
    
    <div id="registForm" className="shadow rounded confirm-reset-password-d" >
        
    
    {/* <div>
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
      
    </div> */}
  
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>

            <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="password">
                    New Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={validPwd || !pwd ? "hide" : "invalid"}
                    />
                    </label>
                    <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    />
                    <p
                    id="pwdnote"
                    className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                    Confirm New Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validMatch && matchPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                    />
                    </label>
                    <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    />
                    <p
                    id="confirmnote"
                    className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                    </p>

                    <button
                    disabled={ !validPwd || !validMatch ? true : false}
                    >
                    Change Password
                    </button>
                </form>
    </div>
                </>
          );
};

export default ConfirmResetPassword;