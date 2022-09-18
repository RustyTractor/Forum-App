import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import ForumContext from "../contexts/ForumContext";
import Card from "./common/Card";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "./questions/QuestionList";

const User = () => {
  const { stateUser } = useContext(ForumContext);
  const navigate = useNavigate();

  useEffect(() => {
    !stateUser.isLogedIn && navigate("/forum/home");
  });

  if (stateUser.isLogedIn) {
    return (
      <div className="pageContainer">
        <Card className={"userCard"}>
          <div className="container">
            <div className="imageHolder">
              {stateUser.userData.img !== "" ? (
                <img src={stateUser.userData.img} alt="UserProfile" />
              ) : (
                <FontAwesomeIcon icon={faUserAlt} className="image" />
              )}
            </div>
            <div className="otherDataHolder">
              <h2>{stateUser.userData.username}</h2>
              <p>Email: {stateUser.userData.email}</p>
              <p>Number of Posts: {stateUser.userData.posts}</p>
            </div>
          </div>
        </Card>
        <h2 style={{ padding: "2.5%" }}>Your questions:</h2>
        <QuestionList />
      </div>
    );
  } else {
    return (
      <div className="pageContainer">
        <h2>
          Must to <Link to={"/login"}>Login</Link>!
        </h2>
      </div>
    );
  }
};

export default User;
