import { createContext, useEffect, useReducer, useState } from "react";
import { deletePost, getPosts } from "../fakeDatabase/handler";

import userReducer from "../reducers/UserReducer";

const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const initalUserState = {
    isLogedIn:
      sessionStorage.getItem("isLogedIn") !== undefined
        ? JSON.parse(sessionStorage.getItem("isLogedIn"))
        : false,
    userData:
      sessionStorage.getItem("userData") !== undefined
        ? JSON.parse(sessionStorage.getItem("userData"))
        : {},
  };

  const [stateUser, dispatchUser] = useReducer(userReducer, initalUserState);
  const [allPost, setAllPost] = useState([]);
  // Saving here the Posts , which filtered by the SearchBar
  const [filteredPost, setFilteredPost] = useState([]);

  const getQuestions = () => {
    getPosts().then((res) => {
      setAllPost(res);
      setFilteredPost(res);
    });
  };

  const deleteQuestion = async (questionID) => {
    await deletePost(questionID)
      .then((res) => {
        let posts = allPost.filter((post) => post.id !== questionID);
        setAllPost(posts);
        setFilteredPost(posts);

        let user = stateUser.userData;
        user.posts--;
        dispatchUser({ type: "UPDATE", payload: user });
      })
      .catch((err) => console.err(`deletPost went worng! ${err}`));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <ForumContext.Provider
      value={{
        stateUser,
        dispatchUser,
        filteredPost,
        setFilteredPost,
        allPost,
        setAllPost,
        getQuestions,
        deleteQuestion,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export default ForumContext;
