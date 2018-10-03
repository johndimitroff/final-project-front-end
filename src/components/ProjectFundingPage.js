import React from "react";
import api from "../api";
import empty from "../empty-movie-theater.mp4";
import countdownVideo from "../countdown.mp4";

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
      fundingTarget: "",
      moneyReceived: "",
      isPicked: false
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    //console.log("PROJECT FUNDING PAGE PARAMS", params);
    console.log(this.props);
    api
      .get(`projects/${params.projectId}`)
      .then(response => {
        console.log("Project data", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;
    api.post(`/process-selection/${params.projectId}`, {}).then(response => {
      console.log("pick this project", this.state);
      this.setState({
        isPicked: true
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
      fundingTarget,
      moneyReceived,
      isPicked
    } = this.state;

    const { params } = this.props.match;
    const countDownDate = new Date(expectedReleaseDate).getTime();
    const newCount = countDownDate / 1000;
    const now = new Date().getTime();
    const newNow = now / 1000;
    const timeLeft = Math.floor(newCount - newNow);
    console.log("timeleft", timeLeft);
    console.log("new count", newCount);
    console.log("countdown date", countDownDate);
    console.log("params.expectedReleaseDate", params.expectedReleaseDate);
    console.log("params", params);
    console.log("expectedReleaseDate", expectedReleaseDate);

    return (
      <section>
        {moneyReceived < fundingTarget && (
          <div className="other-video-container">
            <p>
              This production is currently <strong>in funding</strong>
            </p>
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
        )}
        {moneyReceived >= fundingTarget && (
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
              <video
                className="countdown-video"
                src={countdownVideo}
                // width="500px"
                // height="250px"
                loop
                autoPlay
              />
              {/* <video
                className="user-video"
                src={videoFile}
                // width="300px"
                // // height="140px"
                loop
                autoPlay
              /> */}
              <img
                className="flickering"
                src="https://raw.githubusercontent.com/johndimitroff/final-project-front-end/master/src/static.gif"
              />
            </div>
            <h2>Expected time until release: {timeLeft} </h2>
          </div>
        )}
        <h2>{projectName}</h2>
        <p>{shortDescription}</p>
        <p>{longDescription}</p>
        <img src={pictureUrl} width="500px" height="280px" />
        <p>{format}</p>
        <p>{genre}</p>
        <p>{endDate}</p>
        <p>Viewer Quota: {fundingTarget}</p>
        <p>Viewers: {moneyReceived}</p>

        {/* <img
          // className="flickering"
          // src="https://giphy.com/gifs/d2jjHeKDynBohPtm/html5"
          src=""
        /> */}

        <form onSubmit={event => this.handleSubmit(event)}>
          <button>Pick this Project</button>
        </form>
      </section>
    );
  }
}

export default ProjectFundingPage;
