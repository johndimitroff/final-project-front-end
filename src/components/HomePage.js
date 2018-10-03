import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LandingPage from "./LandingPage";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <section>
        <p>THIS IS THE HOME PAGE</p>
      </section>
    );
  }
}

export default HomePage;
