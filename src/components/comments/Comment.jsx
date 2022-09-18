import React from "react";
import Card from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
const Comment = () => {
  return (
    <Card className={"commentCard"}>
      <div className="commentHolder">
        <div className="commentWriter">Comenter name</div>
        <div className="dateHolder">2022.09.17</div>
        <div className="commentText">
          <p>
            Comment text random ioandgfjasdlfjlkasjdfkasdfjasddfasdfasdfasff
          </p>
        </div>
        <div className="commentLikes">
          <div className="likes">
            <FontAwesomeIcon icon={faThumbsUp} /> 1
          </div>
          <div className="dislikes">
            <FontAwesomeIcon icon={faThumbsDown} /> 1
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Comment;
