import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./CSS/Login.css";
import { Link, Navigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignIn = () => {
  const errRef = useRef();
  
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd]);

  const accessToken = localStorage.getItem("access");
  console.log(accessToken)
  if (accessToken) {
    return <Navigate to='/' />
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email: email,
        password: pwd,
      };
      const response = await axios.post(
        "http://localhost:8000/account/jwt/create/",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('email', email);
      localStorage.setItem('refresh', response.data.refresh);
      
      console.log(JSON.stringify(response));
      console.log(response.data.data.email);
      // kinddark412@gmail.com
      // axios.post("http://localhost:8000/auth/jwt/create/", body)
      // .then(response => {
      //   console.log(response.data);
      //   localStorage.setItem('access', response.data.access);
      // })
      // .catch(error => {
      //   console.error(error);
      // });
      ////////////////////
      // console.log(response?.data.auth_token);
      // console.log(response?.accessToken);
      setSuccess(true);
      if (success) {
        window.location.replace("/");
      }
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setPwd("");
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

  return (
    <div id="registForm">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/">Home</Link>
          </p>
        </section>
      ) : (
        <section className="shadow rounded">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            {/* Email Field  */}
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Enter a valid email address
            </p>
            {/* Email Ends  */}
            <label htmlFor="password">
              Password:
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

            <button disabled={!validPwd ? true : false}>Sign Up</button>
            <Link to="/forgetpassword">Forget password</Link>
          </form>
          <p>
            If you are not a member. Please
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/Signup">Sign up</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default SignIn;
