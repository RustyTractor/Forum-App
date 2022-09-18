import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ForumContext from "../contexts/ForumContext";
import Card from "./common/Card";
import QuestionList from "./questions/QuestionList";

const Home = () => {
  const { stateUser } = useContext(ForumContext);
  return (
    <div className="home">
      <div className="askHolder">
        {!stateUser.isLogedIn ? (
          <Card className={"askCard"}>
            Wana ask something? You have to <Link to={"/login"}>Login</Link> or{" "}
            <Link to={"/register"}>create new account!</Link>
          </Card>
        ) : (
          <Card className={"askCard"}>
            Wana ask something? <Link to={"/forum/ask"}>CLICK HERE!</Link>
          </Card>
        )}
      </div>
      <div className="pageContainer">
        <QuestionList />
      </div>
    </div>
  );
};

export default Home;
