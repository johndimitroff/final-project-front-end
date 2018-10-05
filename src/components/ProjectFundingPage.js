import React from "react";
import api from "../api";
import empty from "../cinema5.mp4";
import countdownVideo from "../countdown.mp4";
import { NavLink } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import full from "../full-movie-theater-1.mp4";

class ProjectFundingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      shortDescription: "",
      longDescription: "",
      pictureUrl: "",
      videoFile: "",
      format: "",
      genre: "",
      endDate: "",
      expectedReleaseDate: "",
      budget: "",
      budgetItems: [],
      moneyReceived: "",
      cast: [],
      crew: [],
      locations: "",
      isPicked: false
    };

    this.timeInterval = null;
  }

  componentDidMount() {
    const { params } = this.props.match;
    const { expectedReleaseDate } = this.state;
    //console.log("PROJECT FUNDING PAGE PARAMS", params);
    console.log(this.props);
    api
      .get(`projects/${params.projectId}`)
      .then(response => {
        console.log("SERVER RESPONSE");
        console.log("Project data", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });

    this.timeInterval = setInterval(() => {
      this.setState({ expectedReleaseDate: this.state.expectedReleaseDate });
      if (new Date() > new Date(this.state.expectedReleaseDate)) {
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  // const {moneyReceived} = this.state.moneyReceived;
  // const {budget} = this.budget;
  // if (moneyReceived >= budget) {
  //   this.setState({inProduction: true, inFunding: false})
  // }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;
    api.post(`/process-selection/${params.projectId}`, {}).then(response => {
      console.log("pick this project", this.state);
      this.setState({
        isPicked: true,
        moneyReceived: response.data.moneyReceived
      });
    });
  }

  render() {
    const {
      projectName,
      shortDescription,
      longDescription,
      pictureUrl,
      videoFile,
      format,
      genre,
      endDate,
      expectedReleaseDate,
      budget,
      budgetItems,
      moneyReceived,
      cast,
      crew,
      locations,
      isPicked
    } = this.state;

    // console.log("VIDEOFILE", videoFile);

    const { params } = this.props.match;
    const countDownDate = new Date(expectedReleaseDate).getTime();
    const newCount = countDownDate / 1000;
    const now = new Date().getTime();
    const newNow = now / 1000;
    const timeLeft = Math.floor(newCount - newNow);

    let isComplete, inProduction, inFunding;
    console.log(expectedReleaseDate);

    // const { moneyReceived } = this.state.moneyReceived;
    // const { budget } = this.budget;

    if (moneyReceived < budget) {
      inFunding = true;
      isComplete = false;
      inProduction = false;
    }
    if (moneyReceived >= budget) {
      inProduction = true;
      inFunding = false;
    }

    if (timeLeft <= 0) {
      isComplete = true;
      inProduction = false;
    }

    return (
      <section className="funding-background">
        {inFunding && (
          <div className="other-video-container">
            <p>
              This production is currently <strong>IN FUNDING</strong>
            </p>
            <div className="video-wrapper">
              <video className="in-funding-video" src={empty} loop autoPlay />
              <video
                className="user-video"
                src={videoFile}
                // width="500px"
                // height="250px"
                loop
                autoPlay
              />
              <img
                className="flickering"
                src="https://raw.githubusercontent.com/johndimitroff/final-project-front-end/master/src/static.gif"
              />
            </div>
          </div>
        )}
        {inProduction && (
          <div>
            <p>
              This production is currently <strong>IN PRODUCTION</strong>
            </p>
            <div className="video-container">
              <video
                className="in-production-video"
                src={full}
                // width="500px"
                // height="250px"
                loop
                autoPlay
              />
              <div className="countdown-container">
                <video
                  className="countdown-video"
                  src={countdownVideo}
                  // width="500px"
                  // height="250px"
                  loop
                  autoPlay
                />
                {timeLeft >= 0 && (
                  <p className="countdown-numbers">{timeLeft}</p>
                )}
              </div>
              {/* <video
                className="user-video"
                src={videoFile}
                // width="300px"
                // // height="140px"
                loop
                autoPlay
              /> */}
              {/* <img
                className="flickering"
                src="https://raw.githubusercontent.com/johndimitroff/final-project-front-end/master/src/static.gif"
              /> */}
              {/* <p className="countdown-numbers">{timeLeft}</p> */}
            </div>
          </div>
        )}

        {isComplete && (
          <div>
            <p>
              This production is{" "}
              <NavLink to={`/projects/${params.projectId}/watch`}>
                <strong> NOW SHOWING </strong>
              </NavLink>
            </p>
          </div>
        )}

        <h2>{projectName}</h2>
        <p>{shortDescription}</p>
        <p>{endDate}</p>
        <p>Viewer Quota: {budget}</p>
        <p>Viewers: {moneyReceived}</p>
        <span>
          <NavLink to={`/projects/${params.projectId}/premise`}>
            Premise
          </NavLink>
          <NavLink to={`/projects/${params.projectId}/castandcrew`}>
            Cast & Crew
          </NavLink>
          <NavLink to={`/projects/${params.projectId}/productiondetails`}>
            Production Details
          </NavLink>
          <NavLink to={`/projects/${params.projectId}/budgetbreakdown`}>
            Budget Breakdown
          </NavLink>
        </span>

        {/* <img
          // className="flickering"
          // src="https://giphy.com/gifs/d2jjHeKDynBohPtm/html5"
          src=""
        /> */}
        <Switch>
          <Route path="/projects/:projectId/watch" />
          <Route
            path="/projects/:projectId/premise"
            render={() => (
              <div>
                <h2>Premise</h2>
                <p>{longDescription}</p>
              </div>
            )}
          />
          <Route
            path="/projects/:projectId/castandcrew"
            render={() => (
              <span>
                <div>
                  <h4>Cast</h4>
                  <ul>
                    {cast.map((oneCast, index) => (
                      <li key={index}>
                        {oneCast.role}:{oneCast.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Crew</h4>
                  <ul>
                    {crew.map((oneCrew, index) => (
                      <li key={index}>
                        {oneCrew.role}:{oneCrew.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </span>
            )}
          />
          <Route
            path="/projects/:projectId/productiondetails"
            render={() => (
              <div>
                <p>Principal filming location(s): {locations}</p>
              </div>
            )}
          />
          <Route
            path="/projects/:projectId/budgetbreakdown"
            render={() => (
              <div>
                <ul>
                  {budgetItems.map((oneBudget, index) => (
                    <li key={index}>
                      {oneBudget.itemName}:{oneBudget.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </Switch>

        <form onSubmit={event => this.handleSubmit(event)}>
          <button>Pick this Project</button>
        </form>
      </section>
    );
  }
}

export default ProjectFundingPage;
