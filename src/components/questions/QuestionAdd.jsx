import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import ForumContext from "../../contexts/ForumContext";

import { addPost, updateUser } from "../../fakeDatabase/handler";

const QuestionAdd = () => {
  const { stateUser, dispatchUser, getQuestions } = useContext(ForumContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleChange = (type, value) => {
    switch (type) {
      case "TITLE":
        setTitle(value);
        break;
      case "TEXT":
        setText(value);
        break;
      default:
        throw new Error("Incorrect input type");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = {
      userId: stateUser.userData.id,
      title: title,
      text: text,
      comments: 0,
      date: new Date(),
    };

    const userCopy = stateUser.userData;
    userCopy.posts += 1;
    dispatchUser({ type: "UPDATE", payload: userCopy });
    await updateUser(userCopy);
    await addPost(question);
    await getQuestions();
    navigate("/forum/home");
  };

  useEffect(() => {
    !stateUser.isLogedIn && navigate("/forum/home");
  }, [stateUser.isLogedIn, navigate]);

  return (
    <div className="home">
      <div className="pageContainer">
        <Card className="addQuestionCard">
          <h2>Ask something...</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputRow">
              <input
                type="text"
                name="titel"
                value={title}
                placeholder={"Title "}
                onChange={(e) => handleChange("TITLE", e.target.value)}
              />
            </div>
            <br />
            <div className="inputRow">
              <label htmlFor="text">Write here your question: </label>
              <br />
              <textarea
                type="textbox"
                name="text"
                value={text}
                onChange={(e) => handleChange("TEXT", e.target.value)}
                rows={10}
                cols={50}
              />
            </div>
            <div className="inputRow">
              <button
                type="submit"
                disabled={title.length < 1 || text.length < 10}
              >
                Send
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default QuestionAdd;
