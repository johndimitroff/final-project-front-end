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
      expectedReleaseDate: "",
      budget: "",
      budgetItems: [],
      isSubmitSuccess: false,
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      newProject: {},
      locations: "",
      cast: [],
      crew: []
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

  updateExpectedReleaseDate(event) {
    const { value } = event.target;
    this.setState({ expectedReleaseDate: value });
  }

  updateBudget(event) {
    const { value } = event.target;
    this.setState({ budget: value });
  }

  updateLocation(event) {
    const { value } = event.target;
    this.setState({ locations: value });
  }

  updateCastName(event, index) {
    const { cast } = this.state;
    const { value } = event.target;
    //set the spec value at the correct index
    cast[index].name = value;
    //set the state with the updated specs array
    this.setState({ cast });
  }

  updateCastRole(event, index) {
    const { cast } = this.state;
    const { value } = event.target;
    //set the spec value at the correct index
    cast[index].role = value;
    //set the state with the updated specs array
    this.setState({ cast });
  }

  addCast(event) {
    //stop the " + spec " button from accidentally submitting the form
    event.preventDefault();
    const { cast } = this.state;
    //push a new empty spec into the specs array
    cast.push({ role: "", name: "" });
    //set the state with the updated specs array
    this.setState({ cast });
  }

  updateCrewRole(event, index) {
    const { crew } = this.state;
    const { value } = event.target;
    //set the spec value at the correct index
    crew[index].role = value;
    //set the state with the updated specs array
    this.setState({ crew });
  }

  updateCrewName(event, index) {
    const { crew } = this.state;
    const { value } = event.target;
    //set the spec value at the correct index
    crew[index].name = value;
    //set the state with the updated specs array
    this.setState({ crew });
  }

  addCrew(event) {
    //stop the " + spec " button from accidentally submitting the form
    event.preventDefault();
    const { crew } = this.state;
    //push a new empty spec into the specs array
    crew.push({ role: "", name: "" });
    //set the state with the updated specs array
    this.setState({ crew });
  }

  updateBudgetItemName(event, index) {
    const { budgetItems } = this.state;
    const { value } = event.target;
    budgetItems[index].itemName = value;
    this.setState({ budgetItems });
  }

  updateBudgetAmount(event, index) {
    const { budgetItems } = this.state;
    const { value } = event.target;
    budgetItems[index].amount = value;
    this.setState({ budgetItems });
  }

  addBudget(event) {
    //stop the " + spec " button from accidentally submitting the form
    event.preventDefault();
    const { budgetItems } = this.state;
    //push a new empty spec into the specs array
    budgetItems.push({ itemName: "", amount: "" });
    //set the state with the updated specs array
    this.setState({ budgetItems });
  }

  goStep2(event) {
    event.preventDefault();
    this.setState({ step1: false, step2: true });
  }

  goStep3(event) {
    event.preventDefault();
    this.setState({ step2: false, step3: true });
  }

  goStep4(event) {
    event.preventDefault();
    this.setState({ step3: false, step4: true });
  }

  goStep5(event) {
    event.preventDefault();
    this.setState({ step4: false, step5: true });
  }

  goStep6(event) {
    event.preventDefault();
    this.setState({ step5: false, step6: true });
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
      expectedReleaseDate,
      budget,
      budgetItems,
      isSubmitSuccess,
      newProject,
      locations,
      cast,
      crew,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6
    } = this.state;

    if (isSubmitSuccess) {
      return <Redirect to={`/projects/${newProject._id}`} />;
    }

    return (
      <section>
        {/* STEP 1 STEP 1STEP 1 STEP 1 STEP 1 STEP 1 BASIC INFO */}
        {step1 && (
          <div>
            <h2>Start a Project</h2>
            <label>
              Project Title:
              <input
                type="text"
                value={projectName}
                onChange={event => this.updateProjectName(event)}
              />
            </label>
            <label>
              Logline:
              <input
                type="text"
                value={shortDescription}
                onChange={event => this.updateShortDescription(event)}
              />
            </label>

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
              Expected release date:
              <input
                type="date"
                value={expectedReleaseDate}
                onChange={event => this.updateExpectedReleaseDate(event)}
              />
            </label>

            <button onClick={event => this.goStep2(event)}>Next</button>
          </div>
        )}
        {/* STEP 2 STEP 2STEP 2 STEP 2 STEP 2 STEP 2  PITCH/SYNOPSIS */}
        {step2 && (
          <div>
            <label>
              Long Description:
              <input
                type="text"
                value={longDescription}
                onChange={event => this.updateLongDescription(event)}
              />
            </label>
            <button onClick={event => this.goStep3(event)}>Next</button>
          </div>
        )}
        {/* STEP 3 STEP 3STEP 3 STEP 3 STEP 3 STEP 3  MEDIA UPLOAD */}
        {step3 && (
          <div>
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
            <button onClick={event => this.goStep4(event)}>Next</button>
          </div>
        )}
        {/* STEP 4 STEP 4STEP 4 STEP 4 STEP 4 STEP 4  CAST & CREW */}
        {step4 && (
          <div>
            <h3>Cast:</h3>
            {cast.map((oneCast, index) => (
              <fieldset>
                <input
                  key={index}
                  type="text"
                  value={oneCast.name}
                  onChange={event => this.updateCastName(event, index)}
                />
                <input
                  type="text"
                  value={oneCast.role}
                  onChange={event => this.updateCastRole(event, index)}
                />
              </fieldset>
            ))}
            <button onClick={event => this.addCast(event)}> + </button>

            <h3>Crew:</h3>
            {crew.map((oneCrew, index) => (
              <fieldset key={index}>
                <input
                  type="text"
                  value={oneCrew.role}
                  onChange={event => this.updateCrewRole(event, index)}
                />

                <input
                  type="text"
                  value={oneCrew.name}
                  onChange={event => this.updateCrewName(event, index)}
                />
              </fieldset>
            ))}
            <button onClick={event => this.addCrew(event)}> + </button>

            <button onClick={event => this.goStep5(event)}>Next</button>
          </div>
        )}

        {step5 && (
          <div>
            <label>
              Principal filming locations:
              <input
                type="text"
                value={locations}
                onChange={event => this.updateLocation(event)}
              />
            </label>
            <button onClick={event => this.goStep6(event)}>Next</button>
          </div>
        )}

        {/* STEP 6 STEP 6 STEP 6 STEP 6 STEP 6 STEP 6  BUDGET */}
        {step6 && (
          <div>
            <form onSubmit={event => this.handleSubmit(event)}>
              <h3>Budget Breakdown:</h3>
              {budgetItems.map((oneBudget, index) => (
                <fieldset>
                  <input
                    key={index}
                    type="text"
                    value={oneBudget.itemName}
                    onChange={event => this.updateBudgetItemName(event, index)}
                  />
                  <input
                    type="number"
                    value={oneBudget.amount}
                    onChange={event => this.updateBudgetAmount(event, index)}
                  />
                </fieldset>
              ))}
              <button onClick={event => this.addBudget(event)}> + </button>
              <input
                type="number"
                value={budget}
                onChange={event => this.updateBudget(event)}
              />
              {/* <label>
                Funding Target:
                <input
                  type="number"
                  value={fundingTarget}
                  onChange={event => this.updateFundingTarget(event)}
                />
              </label> */}
              <button>Create</button>
            </form>
          </div>
        )}
      </section>
    );
  }
}
export default StartProject;
