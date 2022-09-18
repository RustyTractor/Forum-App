import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ForumContext from "../../contexts/ForumContext";
import Loading from "../common/Loading";
import Question from "./Question";

const QuestionList = () => {
  const { stateUser, filteredPost, allPost } = useContext(ForumContext);
  const location = useLocation();

  return (
    <div className="questionList">
      {filteredPost.length === 0 && allPost.length === 0 ? (
        <Loading />
      ) : location.pathname === "/forum/user" ? (
        filteredPost.map(
          (post) =>
            post.userId === stateUser.userData.id && (
              <Question post={post} key={post.id} />
            )
        )
      ) : (
        filteredPost.map(
          (post, index) => index < 10 && <Question post={post} key={post.id} />
        )
      )}
    </div>
  );
};

export default QuestionList;
