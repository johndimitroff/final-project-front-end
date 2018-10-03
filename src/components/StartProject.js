import React from "react";
import api from "../api";
import { Redirect } from "react-router-dom";

class StartProject extends React.Component {
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
      fundingTarget: "",
      isSubmitSuccess: false,
      newProject: {}
    };
  }

  updateProjectName(event) {
    const { value } = event.target;
    this.setState({ projectName: value });
  }

  updateShortDescription(event) {
    const { value } = event.target;
    this.setState({ shortDescription: value });
  }

  updateLongDescription(event) {
    const { value } = event.target;
    this.setState({ longDescription: value });
  }

  updatePictureUrl(event) {
    const { value } = event.target;
    this.setState({ pictureUrl: value });
  }

  updateImageFile(event) {
    const { files } = event.target;
    console.log("File Selected", files[0]);

    // if (!files[0]) {
    //   //reset back to the old image if you unselect your uploaded file
    //   this.setState({ image: this.originalImage });
    // }

    //we need the "formData" class to uplaod files to the API
    const uploadData = new FormData();
    //this name "imageFile" has to be the same as the name in the fileUPloader.single("imageFile" in the backend)
    uploadData.append("imageFile", files[0]);

    api
      .post("/upload-image", uploadData)
      .then(response => {
        console.log("FILE UPLOADED", response.data);
        const { imageUrl } = response.data;
        this.setState({ pictureUrl: imageUrl });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was an error.");
      });
  }

  updateVideoFile(event) {
    const { files } = event.target;
    console.log("File Selected", files[0]);

    // if (!files[0]) {
    //   //reset back to the old image if you unselect your uploaded file
    //   this.setState({ image: this.originalImage });
    // }

    //we need the "formData" class to uplaod files to the API
    const uploadData = new FormData();
    //this name "imageFile" has to be the same as the name in the fileUPloader.single("imageFile" in the backend)
    uploadData.append("videoFile", files[0]);

    api
      .post("/upload-video", uploadData)
      .then(response => {
        console.log("FILE UPLOADED", response.data);
        const { videoUrl } = response.data;
        this.setState({ videoFile: videoUrl });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was an error.");
      });
  }

  updateFormat(event) {
    const { value } = event.target;
    this.setState({ format: value });
  }

  updateGenre(event) {
    const { value } = event.target;
    this.setState({ genre: value });
  }

  updateEndDate(event) {
    const { value } = event.target;
    this.setState({ endDate: value });
  }

  updateFundingTarget(event) {
    const { value } = event.target;
    this.setState({ fundingTarget: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    api
      .post("/startproject", this.state)
      .then(response => {
        console.log("start a project", this.state);
        this.setState({
          isSubmitSuccess: true,
          newProject: response.data.projectDoc
        });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong.");
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
      fundingTarget,
      isSubmitSuccess,
      newProject
    } = this.state;

    if (isSubmitSuccess) {
      return <Redirect to={`/projects/${newProject._id}`} />;
    }
    return (
      <section>
        <h2>Start a Project</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Project Title:
            <input
              type="text"
              value={projectName}
              onChange={event => this.updateProjectName(event)}
            />
          </label>
          <label>
            Short Description:
            <input
              type="text"
              value={shortDescription}
              onChange={event => this.updateShortDescription(event)}
            />
          </label>
          <label>
            Long Description:
            <input
              type="text"
              value={longDescription}
              onChange={event => this.updateLongDescription(event)}
            />
          </label>
          <label>
            Image file/URL:
            <input
              type="url"
              value={pictureUrl}
              onChange={event => this.updatePictureUrl(event)}
            />
            <input
              type="file"
              onChange={event => this.updateImageFile(event)}
            />
          </label>
          <img src={pictureUrl} />

          <label>
            Video file:
            <input
              type="file"
              onChange={event => this.updateVideoFile(event)}
            />
          </label>
          <video src={videoFile} />

          <label>
            Format:
            <input
              type="text"
              value={format}
              onChange={event => this.updateFormat(event)}
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              value={genre}
              onChange={event => this.updateGenre(event)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={event => this.updateEndDate(event)}
            />
          </label>
          <label>
            Funding Target:
            <input
              type="number"
              value={fundingTarget}
              onChange={event => this.updateFundingTarget(event)}
            />
          </label>
          <button>Next</button>
        </form>
      </section>
    );
  }
}

export default StartProject;
