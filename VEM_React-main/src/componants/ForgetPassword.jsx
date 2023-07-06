import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./CSS/Login.css";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgetPassword = () => {
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email: email,
      };
      const response = await axios.post(
        "http://localhost:8000/account/users/reset_password/",
        body,
        {
          headers: { "Content-Type": "application/json" },
          
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      if (success) {
        window.location.replace("/checkmail");
      }
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
          <h1>Reset Password link sent to your gmail</h1>
          <p>
            <Link to="/Signin">Login</Link>
            
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
          <h1>Forget Password</h1>
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

            <button disabled={!validEmail ? true : false}>Send</button>
          </form>
          <p>
            Or go to <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/Signin">Sign in</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default ForgetPassword;
