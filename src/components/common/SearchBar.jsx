import React, { useContext, useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForumContext from "../../contexts/ForumContext";

const SearchBar = () => {
  const [searchText, setSearchtext] = useState("");
  const { allPost, setFilteredPost } = useContext(ForumContext);
  const [isSearched, setIsSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validSerachText = searchText.toLocaleLowerCase();
    const posts = allPost.filter(
      (post) =>
        post.text.toLocaleLowerCase().match(validSerachText) ||
        post.title.toLocaleLowerCase().match(validSerachText)
    );
    setFilteredPost(posts);
  };

  const handleReset = () => {
    setFilteredPost(allPost);
    setSearchtext("");
    setIsSearched(false);
  };

  useEffect(() => {
    if (searchText !== "") {
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  }, [searchText]);

  return (
    <div className="searchbarHolder holder">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="searchInput"
          type="text"
          placeholder="Search Topic"
          value={searchText}
          onChange={(e) => setSearchtext(e.target.value)}
        />
        <button type="submit" className="btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {isSearched && (
        <button className="resetBtn" onClick={() => handleReset()}>
          CLEAR
        </button>
      )}
    </div>
  );
};

export default SearchBar;
