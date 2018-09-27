import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import api from "../api";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: ""
    };
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
    api
      .post("/login", this.state)
      .then(response => {
        console.log("log in", this.state);
        const { onLogin } = this.props;
        onLogin(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { currentUser } = this.props;
    const { email, originalPassword } = this.state;
    //const { params } = this.props.match;
    if (currentUser) {
      return <Redirect to={`/profile/${currentUser._id}`} />;
    }
    return (
      <section>
        <h2>Login</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
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

          <button>Login</button>
        </form>
      </section>
    );
  }
}

export default Login;
