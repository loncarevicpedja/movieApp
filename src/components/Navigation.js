import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IdentityContext } from "../contexts/identityContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(IdentityContext);

  const logoutUserHandler = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navigation-container">
      <div className="navigation-logo">MovieApp</div>
      <div className="navigation">
        <Link to={"/"} className="navigation-link">
          Home
        </Link>
        <Link to={"/movies"} className="navigation-link">
          Movies
        </Link>
        {user && user.role !== "Admin" ? (
          <Link to={"/watchlist"} className="navigation-link">
            Watchlist
          </Link>
        ) : (
          ""
        )}
        {user && user.role === "Admin" ? (
          <Link to={"/admin"} className="navigation-link">
            Administration
          </Link>
        ) : (
          ""
        )}
        {user ? (
          <button onClick={logoutUserHandler} className="navigation-link-button">
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="navigation-link">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
