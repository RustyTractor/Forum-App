import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ForumContext from "../contexts/ForumContext";
import { getUser } from "../fakeDatabase/handler";
import Card from "./common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Comments from "./comments/Comments";

const Answers = () => {
  const location = useLocation();
  const { filteredPost } = useContext(ForumContext);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (filteredPost.length > 0) {
      const currentPost = filteredPost.filter(
        (p) => p.id === location.state.id
      );
      setPost(currentPost[0]);
      getUser(currentPost[0].userId).then((res) => setUser(res));
    }
  }, [filteredPost, location]);

  return (
    <div>
      <div className="pageContainer">
        <Card className={"individualQuestionCard"}>
          <div className="container">
            <div className="userNameHolder">{user.username} ask...</div>
            <div className="titleHolder">
              <h3>{post.title}</h3>
            </div>
            <div className="contentHolder">{post.text}</div>
            <div className="commentHolder">
              <div className="counter">
                <FontAwesomeIcon icon={faComments} />
                {"  " + post.comments}
              </div>
            </div>
          </div>
        </Card>
        <Comments comments={"valami"} />
      </div>
    </div>
  );
};

export default Answers;
