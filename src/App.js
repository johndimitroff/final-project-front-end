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
import ProjectFundingPage from "./components/ProjectFundingPage";
import AllProjects from "./components/AllProjects";
import HomePage from "./components/HomePage";
import ProjectWatchPage from "./components/ProjectWatchPage";

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
          <h1>Project Title</h1>

          <span>
            <Navigation
              currentUser={currentUser}
              onClick={() => this.logoutClick()}
            />
            {/* <button onClick={() => this.logoutClick()}>Log Out</button> */}
          </span>
        </header>

        <Switch>
          {!currentUser && (
            <Route exact path="/" render={() => <LandingPage />} />
          )}
          {currentUser && (
            <Route
              exact
              path="/"
              render={() => <HomePage currentUser={currentUser} />}
            />
          )}
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
            path="/profile/:userId"
            render={match => (
              <UserProfile currentUser={currentUser} match={match} />
            )}
          />
          <Route path="/startproject" component={StartProject} />
          <Route exact path="/projects" component={AllProjects} />
          <Route
            path="/projects/:projectId/watch"
            component={ProjectWatchPage}
          />
          <Route path="/projects/:projectId" component={ProjectFundingPage} />
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
