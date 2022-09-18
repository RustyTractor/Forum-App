import { useLocation, useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ForumContext from "../../contexts/ForumContext";

const Question = ({ post }) => {
  const { deleteQuestion } = useContext(ForumContext);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Card className={"questionCard"}>
      <div
        className="container"
        onClick={() => {
          navigate("/forum/answers", { state: { id: post.id } });
        }}
      >
        <div className="questionTitle">
          <p>{post.title}</p>
        </div>
        <div className="questionComments">
          <p>Comments: {post.comments}</p>
        </div>
        {location.pathname === "/forum/user" && (
          <div
            className="questionDelete"
            onClick={() => deleteQuestion(post.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Question;
