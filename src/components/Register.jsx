import React, { useEffect, useState } from "react";
import { registerUser } from "../fakeDatabase/handler";
import { useNavigate } from "react-router-dom";

import Card from "./common/Card";

const Register = () => {
  const { REACT_APP_API } = process.env;
  // eslint-disable-next-line
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  );
  const pwdRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  // Errors object, which contains all the possible errors
  const initialErrors = {
    uExist: "",
    uLength: "",
    eExist: "",
    eFormat: "",
    pwdFormat: "",
    pwdConfSame: "",
  };
  const [errors, setErrors] = useState(initialErrors);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const handleUnameChange = (value) => {
    setUsername(value);
    if (value.length < 4 && errors.uLength === "") {
      errors.uLength = "The username is too short!";
    } else if (value.length >= 4) {
      errors.uLength = "";
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);

    const copyErrors = { ...errors };

    if (!emailRegex.test(value) && copyErrors.eFormat === "") {
      copyErrors.eFormat = "The given email is not valid";
    } else if (emailRegex.test(value)) {
      copyErrors.eFormat = "";
    }
    if (value === "") {
      console.log(value);
      copyErrors.eFormat = "";
    }

    setErrors(copyErrors);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!pwdRegex.test(value) && errors.pwdFormat === "") {
      errors.pwdFormat =
        "Minimum 8 characters, at least one letter and one number.";
    } else if (pwdRegex.test(value)) {
      errors.pwdFormat = "";
    }
    if (value === "") {
      errors.pwdFormat = "";
    }
  };

  const handlePasswordAgainChange = (value) => {
    setPasswordAgain(value);
    if (value !== password && errors.pwdConfSame === "") {
      errors.pwdConfSame = "The passwords are not matche.";
    } else if (value === password) {
      errors.pwdConfSame = "";
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const copyErrors = { ...errors };

    const res1 = fetch(`http://${REACT_APP_API}/users?username=${username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length !== 0) {
          copyErrors.uExist = `${username}is alredy exist`;
        } else {
          copyErrors.uExist = "";
        }
        return res;
      });
    const res2 = fetch(`http://${REACT_APP_API}/users?email=${email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length !== 0) {
          copyErrors.eExist = `${email} is alredy registered!`;
        } else {
          copyErrors.eExist = "";
        }
        return res;
      });

    res1.then((value1) =>
      res2.then((value2) => {
        if (value1.length === 0 && value2.length === 0) {
          registerUser([username, email, password]);
          clearAll();
          setErrors(initialErrors);
          navigate("/login");
        } else {
          setErrors(copyErrors);
        }
      })
    );
  };

  const handleEnabeling = () => {
    Object.entries(errors).forEach((e) => {
      if (e[1] === "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });
  };

  const clearAll = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordAgain("");
  };

  useEffect(() => {
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      passwordAgain !== ""
    ) {
      handleEnabeling();
    }
  });

  return (
    <Card className="register">
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className="inputRow">
          <label htmlFor="username">Username: </label>
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleUnameChange(e.target.value)}
          />
          <div className="errors">
            {errors.uExist !== "" && <p>{errors.uExist}</p>}
            {errors.uLength !== "" && <p>{errors.uLength}</p>}
          </div>
        </div>
        <div className="inputRow">
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <div className="errors">
            {errors.eExist !== "" && <p>{errors.eExist}</p>}
            {errors.eFormat !== "" && <p>{errors.eFormat}</p>}
          </div>
        </div>
        <div className="inputRow">
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <div className="errors">
            {errors.pwdFormat !== "" && <p>{errors.pwdFormat}</p>}
          </div>
        </div>
        <div className="inputRow">
          <label htmlFor="passwordAgain">Password Confirm: </label>
          <br />
          <input
            type="password"
            name="passwordAgain"
            value={passwordAgain}
            onChange={(e) => handlePasswordAgainChange(e.target.value)}
          />
          <div className="errors">
            {errors.pwdConfSame !== "" && <p>{errors.pwdConfSame}</p>}
          </div>
        </div>
        <div className="inputRow">
          <button type="submit" disabled={isDisabled}>
            Register
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
