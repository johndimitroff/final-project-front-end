import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  const { currentUser } = props;
  console.log("currentUser", currentUser);
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {!currentUser && (
        <span>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </span>
      )}
      {currentUser && (
        <span>
          <NavLink to="/projects">Listings</NavLink>
          <NavLink to={`/profile/${currentUser._id}`}>
            <NavLink to="/startproject">Start a Project </NavLink>
            {currentUser.firstName}
            's Page
          </NavLink>
          <button onClick={() => props.onClick()}>Log Out</button>
        </span>
      )}
    </nav>
  );
}

export default Navigation;
