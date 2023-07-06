import React from "react";
import { Link } from "react-router-dom";
import "./CSS/ErrorPage.css";
const ErrorPage = () => {
  return (
    <main
      id="errorPage"
      className="d-flex h-100 justify-content-center align-items-center py-5 mt-5"
    >
      <div className=" text-center">
        <p className=" fw-bold ">404</p>
        <h1 className="mt-4  fw-bolder ">Page not found</h1>
        <p className="mt-6  text-gray-600 px-2">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 d-flex  justify-content-center ">
          <Link to="/" className="rounded px-4 py-2  text-white shadow ">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};
export default ErrorPage;
