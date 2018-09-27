import React from "react";
import api from "../api.js";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <section>
        <header>{currentUser && <p>Hi, {currentUser.firstName}</p>}</header>

        <div className="profile-main">
          <h2>Projects Created</h2>
          <h2>Projects Funded</h2>
          <h2>Recommended Projects</h2>
        </div>
      </section>
    );
  }
}

export default UserProfile;
