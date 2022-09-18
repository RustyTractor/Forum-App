import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForumContext from "../contexts/ForumContext";
import SearchBar from "./common/SearchBar";
import Dropdown from "./common/Dropdown";

const Header = () => {
  const { stateUser, dispatchUser } = useContext(ForumContext);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="container">
        <div className="titleHolder holder">
          <Link
            to="/forum/home"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h1>Forum</h1>
          </Link>
        </div>
        {location.pathname === "/forum/home" ? (
          <SearchBar />
        ) : (
          <div className="linkHolder holder">
            <Link className="animatedLink" to="/forum/home">
              Back to the forum
            </Link>
          </div>
        )}
        <div className="userHolder holder">
          <div className="userIcon">
            {!stateUser.isLogedIn ? (
              <Link className="userico" to="/login" style={{ color: "white" }}>
                <FontAwesomeIcon icon={faRightToBracket} />
              </Link>
            ) : (
              <Link to="/forum/user" style={{ color: "white" }}>
                <FontAwesomeIcon icon={faUserAlt} />
              </Link>
            )}
            {stateUser.isLogedIn && (
              <div className="userDropdownHoverArea">
                <Dropdown>
                  <div
                    className="option"
                    onClick={() => {
                      console.log("Meghívódik a logout!");
                      dispatchUser({ type: "LOGOUT" });
                    }}
                  >
                    <span>Logout</span>
                    <span>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                  </div>
                  {location.pathname !== "/forum/user" && <hr />}
                  {location.pathname !== "/forum/user" && (
                    <div
                      className="option"
                      onClick={() => navigate("/forum/user")}
                    >
                      <span>Profile</span>
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                  )}
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
