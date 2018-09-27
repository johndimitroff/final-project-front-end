import React from "react";
import api from "../api.js";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      originalPassword: ""
    };
  }

  updateFirstName(event) {
    const { value } = event.target;
    this.setState({ firstName: value });
  }

  updateLastName(event) {
    const { value } = event.target;
    this.setState({ lastName: value });
  }

  updateEmail(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }

  updatePassword(event) {
    const { value } = event.target;
    this.setState({ originalPassword: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { params } = this.props.match;

    api
      .post("/signup", this.state)
      .then(response => {
        console.log("Signup POST", response.data);
        const { onSignUp } = this.props;
        onSignUp(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { currentUser } = this.props;
    const { firstName, lastName, email, originalPassword } = this.state;
    if (currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <section>
        <h2>Sign Up</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            First name:
            <input
              type="text"
              value={firstName}
              onChange={event => this.updateFirstName(event)}
            />
          </label>

          <label>
            Last name:
            <input
              type="text"
              value={lastName}
              onChange={event => this.updateLastName(event)}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={event => this.updateEmail(event)}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={originalPassword}
              onChange={event => this.updatePassword(event)}
            />
          </label>

          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

export default Signup;
