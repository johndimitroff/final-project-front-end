import React from "react";
import api from "../api.js";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      projectsCreatedArray: [],
      projectsFundedArray: []
    };
  }

  componentDidMount() {
    const { params } = this.props.match.match;

    // console.log("user profile props", this.props);
    api
      .get(`/profile/${params.userId}`)
      .then(response => {
        console.log("RESPONSE DATA", response.data.projectsCreated);
        this.setState({
          projectsCreatedArray: response.data.projectsCreated,
          projectsFundedArray: response.data.projectsContributed
        });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { currentUser } = this.props;
    // console.log("HELLO!!!!!!", this.props);
    let projectsFundedArray = this.state.projectsFundedArray;
    let projectsCreatedArray = this.state.projectsCreatedArray;
    console.log(projectsFundedArray);

    // if (currentUser) {
    //   projectsContributedArray = currentUser.projectsContributed;
    // }
    // console.log("LOOK HEREEEEEE", currentUser);
    // const { projectsContributedArray } = currentUser.projectsContributed;
    // const { projectArray } = this.state;
    return (
      <section>
        <header>{currentUser && <p>Hi, {currentUser.firstName}</p>}</header>

        <div className="profile-main">
          <h2>Projects You've Created</h2>
          <ul>
            {projectsCreatedArray.map(oneProject => (
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
          <h2>Projects You've Backed</h2>

          {/* Had problems with asynchronicity below which meant that 
              I had to put "currentUser &&" and "projectsFundedArray[0] &&" 
             to get anything to show up. But this isn't a problem when doing it in a loop.*/}
          {/* <p>
            {currentUser &&
              projectsFundedArray[0] &&
              projectsFundedArray[0].project.projectName}
          </p> */}

          <ul>
            {projectsFundedArray.map(oneFundedProject => (
              <li key={oneFundedProject.project._id}>
                <h3>
                  <Link to={`/projects/${oneFundedProject.project._id}`}>
                    {oneFundedProject.project.projectName}
                  </Link>
                </h3>
                <img
                  src={oneFundedProject.project.pictureUrl}
                  width="200px"
                  height="100px"
                />
              </li>
            ))}
          </ul>

          {/* <h2>{currentUser.projectsContributed[0].project.}</h2> */}
          {/* <ul>
            {projectsContributedArray &&
              projectsContributedArray.map(oneContribution => (
                <li key={oneContribution.project._id}>
                  <h3>{oneContribution.project.projectName}</h3>
                </li>
              ))}
          </ul> */}
          <h2>Recommended Projects</h2>
        </div>
      </section>
    );
  }
}

export default UserProfile;
