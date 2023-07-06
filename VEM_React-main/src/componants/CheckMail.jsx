import React from "react";
import { Link } from "react-router-dom";

const CheckMail = () => {
  setTimeout(() => {
    window.location.replace("/signin");
  }, 5000);

  return (
    <main
      id="errorPage"
      className="d-flex h-100 justify-content-center align-items-center py-5 mt-5"
    >
      <div className=" text-center">
        <h1 className="mt-4  fw-bolder ">Check your email</h1>
        <p className="mt-6  text-gray-600 px-2">
          We sent a password reset link to you
        </p>
        <div className="mt-10 d-flex  justify-content-center ">
          <Link to="/signin" className="rounded px-4 py-2  text-white shadow ">
            Go to sign in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckMail;
