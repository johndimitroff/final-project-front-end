import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import Navigation from "./components/Navigation";
import api from "./api.js";
import StartProject from "./components/StartProject";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    api
      .get("/checklogin")
      .then(response => {
        console.log("Check to see if already logged in", response.data);
        this.updateUser(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was a problem.");
      });
  }

  updateUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  logoutClick() {
    api
      .delete("/logout")
      .then(() => {
        this.updateUser(null);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <main>
        <header>
          <h1>FINAL PROJECT</h1>

          {currentUser && (
            <span>
              <Navigation currentUser={currentUser} />
              {/* <button onClick={() => this.logoutClick()}>Log Out</button> */}
            </span>
          )}
        </header>

        <Switch>
          <Route
            exact
            path="/"
            render={() => <LandingPage currentUser={currentUser} />}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                currentUser={currentUser}
                onLogin={userDoc => this.updateUser(userDoc)}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Signup
                currentUser={currentUser}
                onSignUp={userDoc => this.updateUser(userDoc)}
              />
            )}
          />
          <Route
            exact
            path="/profile/:userId"
            render={() => <UserProfile currentUser={currentUser} />}
          />
          <Route
            path="/startproject"
            render={() => <StartProject currentUser={currentUser} />}
          />
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p> Made by John </p>
        </footer>
      </main>
    );
  }
}

export default App;
