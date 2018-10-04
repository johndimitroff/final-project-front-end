import React from "react";
import api from "../api";

class ProjectWatchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      videoFile: ""
    };
  }

  componentDidMount() {
    const { params } = this.props.match;

    api
      .get(`/projects/${params.projectId}`)
      .then(response => {
        console.log("Project data", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { projectName, videoFile } = this.state;
    const { params } = this.props.match;
    return (
      <div>
        <h1>{projectName}</h1>
        <video
          className="finished-user-video"
          src={videoFile}
          // width="500px"
          // height="250px"
          loop
          autoPlay
        />
      </div>
    );
  }
}

export default ProjectWatchPage;
