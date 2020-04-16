import React from "react";
import ReactDOM from "react-dom";
import API from "../utils/user.api";
import { useForm } from "react-hook-form";
import history from "../history";
import pink from "../img/bloom_pink.gif";
import blue from "../img/blue.gif";
import orange from "../img/bloom_orange.gif";

export default function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm();
  const submitForm = (data) => {
    console.log(data);
    API.findUserByEmail(data.email)
      .then((res) => {
        if (
          (data.email === res.data.email) &
          (Date.parse(res.data.dateofBirth) === Date.parse(data.dateofBirth))
        ) {
          console.log(res);
          console.log("match");
          localStorage.setItem("id", res.data._id);
          history.push("/newpassword");
        } else noMatch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = (data) => {
    submitForm(data);
  };

  const noMatch = (props) => {
    ReactDOM.render(
      <h4>The email and date of birth entered does not match our records.</h4>,
      document.getElementById("msg")
    );
  };
  return (
    <div>
      <div
        style={{
          width: "60%",
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <img style={{ width: "20vw" }} src={pink} alt="Bloom" />
        <img style={{ width: "20vw" }} src={blue} alt="Bloom" />
        <img style={{ width: "20vw" }} src={orange} alt="Bloom" />
      </div>
      <div
        style={{
          width: "70VW",
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className="error">Invalid email</p>}
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateofBirth"
            ref={register({ required: true })}
          />
          {errors.dateofBirth && <p className="error">Invalid date</p>}
          <button>Next</button>
        </form>
      </div>
    </div>
  );
}
