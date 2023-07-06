import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import "./CSS/SignIn.css";
import { Link } from "react-router-dom";
import axios from "axios";

// const onSubmit = async (values, actions) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm();
// };

const SignUp = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: (values) => {
      axios
        .post("/api/submit-form", values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  console.log(errors);

  return (
    <div className=" px-3 py-3 my-5 shadow mx-auto bg-light" id="formHolder">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="regstrationForm"
      >
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Enter your email"
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}

        <button disabled={isSubmitting} type="submit">
          Sign in
        </button>
        <p className=" text-center">
          Or if your are not a member <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
