import React from "react";
import api from "../api";
import { Link } from "react-router-dom";

class AllProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectArray: []
    };
  }

  componentDidMount() {
    api
      .get("/projects")
      .then(response => {
        console.log("List of projects", response.data);
        this.setState({ projectArray: response.data });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Somthing went wrong!");
      });
  }

  render() {
    const { projectArray } = this.state;
    return (
      <section>
        <h2>All projects</h2>

        <ul>
          {projectArray.map(oneProject => (
            <li key={oneProject._id}>
              <h3>
                <Link to={`/projects/${oneProject._id}`}>
                  {oneProject.projectName}
                </Link>
              </h3>
              <img src={oneProject.pictureUrl} width="200px" height="100px" />
              <p>{oneProject.shortDescription}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default AllProjects;
