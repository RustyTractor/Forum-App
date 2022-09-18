import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumContext from "../../contexts/ForumContext";
import Card from "../common/Card";

const Login = () => {
  const { REACT_APP_API } = process.env;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { stateUser, dispatchUser } = useContext(ForumContext);
  const navigate = useNavigate();

  useEffect(() => {
    stateUser.isLogedIn && navigate("/forum/home");
  }, [stateUser.isLogedIn, navigate]);

  const onInputChange = (type, value) => {
    switch (type) {
      case "USERNAME":
        setUsername(value);
        break;
      case "PASSWORD":
        setPassword(value);
        break;
      default:
        throw new Error("Something goes Wrong!");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const response = fetch(
      `http://${REACT_APP_API}/users?username=${username}&password=${password}`
    );
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0 && error === "") {
          setError("Wrong Username or Password!");
        } else if (data.length !== 0) {
          dispatchUser({ type: "LOGIN", payload: data[0] });
          setUsername("");
          setPassword("");
          setError("");
          navigate("/forum/user");
        }
      });
  };
  return (
    <Card className="login">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="inputRow">
          <label htmlFor="username">Username: </label>
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => onInputChange("USERNAME", e.target.value)}
          />
        </div>
        <div className="errors"></div>
        <div className="inputRow">
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onInputChange("PASSWORD", e.target.value)}
          />
        </div>
        <div className="errors">{error !== "" && <p>{error}</p>}</div>
        <div className="inputRow">
          <button type="submit" disabled={username === "" && password === ""}>
            Login
          </button>
        </div>
        <br />
        <div className="inputRow">
          Don't have account? Try to create one{" "}
          <Link to={"/register"}>HERE</Link>!
        </div>
        <div className="inputRow">
          Try to use the page as <Link to={"/forum/home"}>GUEST</Link>.
        </div>
      </form>
    </Card>
  );
};

export default Login;
