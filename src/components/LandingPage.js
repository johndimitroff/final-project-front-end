import React from "react";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <p>THIS IS THE LANDING PAGE</p>;
        <img className="landing-background" src="../FOWLER-SUNSET.jpg" />
      </section>
    );
  }
}

export default LandingPage;
