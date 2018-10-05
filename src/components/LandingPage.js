import React from "react";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <img
          className="landing-background"
          src="https://raw.githubusercontent.com/johndimitroff/final-project-front-end/master/src/landing-background.jpg"
        />
      </section>
    );
  }
}

export default LandingPage;
