import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  const { currentUser } = props;
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
          <NavLink to={`/profile/${currentUser._id}`}>
            {currentUser.firstName}
            's Page
          </NavLink>
          <button onClick={() => this.logoutClick()}>Log Out</button>
        </span>
      )}
    </nav>
  );
}

export default Navigation;
