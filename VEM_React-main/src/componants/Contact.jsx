import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_vgusnql", "011848", form.current, "bJ8B1Ytf9cz7mbFyl")
      .then(
        (result) => {
          console.log(result.text);
          navigate("/");

        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>
      <form className="mt-5 container" ref={form} onSubmit={sendEmail}>
        <FloatingLabel
          controlId="floatingInput"
          label="Your Name"
          className="mb-3"
        >
          <Form.Control type="text" name="user_name" placeholder="Your name" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            name="user_email"
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Messege">
          <Form.Control
            name="message"
            as="textarea"
            placeholder="Leave a messege here"
            style={{ height: "200px" }}
          />
        </FloatingLabel>
        <input type="submit" value="Send" className="my-3 btn btn-primary" />
      </form>
    </div>
  );
};

export default Contact;
