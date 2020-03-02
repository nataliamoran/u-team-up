import React from "react";
import "./styles.css";
import alice from "./static/alice.png"
import {Link} from "react-router-dom";

class StudentProfile extends React.Component {
    state = {
        username: "",
        imageUrl: alice,
        name: "Alice Alison",
        university: "University of Toronto, St. George Campus",
        yearOfStudy: 3,
        majorOfStudy: "Computer Science",
        coursesTaken: "CSC207, CSC209",
        currentCourses: "CSC309, CSC363, CSC401",
        currentTeams: "CSC309 Team 1",
        reviews: "None",
        description: "If you love burger like I do, add me to your team.",
        location: "On campus",
        gpa: "3.5/4.0",
        pastProject: "Todo list",
        experience: "Teaching Assistant @ UofT, Software Developer Intern @ IBM",
        resume: "",
        students: [ // TODO: FETCH

        ],
        isInEditMode: false,
    }


    updateInfo = () => {
        this.setState({
            isInEditMode: false,
            name: this.refs.inputName.value,
            university: this.refs.inputUniversity.value,
            yearOfStudy: this.refs.inputyearOfStudy.value,
            majorOfStudy: this.refs.inputmajorOfStudy.value,
            coursesTaken: this.refs.inputcoursesTaken.value,
            currentCourses: this.refs.inputCurrentCourses.value,
            currentTeams: this.refs.inputCurrentTeams.value,
            description: this.refs.inputDescription.value,
            location: this.refs.inputLocation.value,
            gpa: this.refs.inputGpa.value,
            pastProject: this.refs.inputPastProject.value,
            experience: this.refs.inputExperience.value
        })
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    renderEditView = () => {
        return (
            <div>
                <div>
                    <div className="left-box">
                    <img className="profile-pic" src={this.state.imageUrl} alt="alice photo" />

                    <div className="info inner">
                        <h2>
                            <input
                                className="student_profile__input"
                                type="text"
                                defaultValue={this.state.name}
                                ref="inputName"
                                >
                            </input>
                        </h2>

                        <h4>University:</h4>
                            <p>
                                <input
                                    className="student_profile__input"
                                    type="text"
                                    defaultValue={this.state.university}
                                    ref="inputUniversity"
                                    >
                                </input>
                            </p>

                        <h4>Year of Study:</h4>
                            <p>
                                <input
                                    className="student_profile__input"
                                    type="text"
                                    defaultValue={this.state.yearOfStudy}
                                    ref="inputyearOfStudy"
                                    >
                                </input>
                            </p>

                        <h4>Major of Study:</h4>
                        <p>
                            <input
                                className="student_profile__input"
                                type="text"
                                defaultValue={this.state.majorOfStudy}
                                ref="inputmajorOfStudy"
                                >
                            </input>
                        </p>

                    </div>

                    <div className="course">
                        <div className="taken inner">
                          <h4>Courses Taken:</h4>
                              <textarea
                                  className="student_profile__input"
                                  type="text"
                                  defaultValue={this.state.coursesTaken}
                                  ref="inputcoursesTaken"
                                  >
                              </textarea>
                        </div>

                    <div className="taking inner">
                         <h4>Currently Taking:</h4>
                             <textarea
                                 className="student_profile__input"
                                 type="text"
                                 defaultValue={this.state.currentCourses}
                                 ref="inputCurrentCourses"
                                 >
                             </textarea>
                    </div>
                    </div>

                  <div className="current-teams inner">
                    <h4>Current Teams:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.currentTeams}
                            ref="inputCurrentTeams"
                            >
                        </textarea>
                  </div>

                 <div className="reviews inner">
                    <h4>Reviews:</h4>
                    <p><a href="bob.html">Bob Bobson</a>: I love working with Alice!💙</p>
                  </div>
                </div>

                <div className="right-box">
                    <div>
                      <p><Link className="student__application" to={"./../student-app-inv"}>My application</Link></p>
                    </div>

                  <div className="description inner">
                    <h4>Description:</h4>
                    <p>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.description}
                            ref="inputDescription"
                            >
                        </textarea>

                    </p>
                  </div>

                  <div className="more-info inner">
                    <h4>Location:</h4>
                        <input
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.location}
                            ref="inputLocation"
                            >
                        </input>

                    <h4>GPA:</h4>
                        <input
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.gpa}
                            ref="inputGpa"
                            >
                        </input>

                    <h4>Past Project:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.pastProject}
                            ref="inputPastProject"
                            >
                        </textarea>

                  </div>

                  <div className="experience inner">
                    <h4>Experience:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            defaultValue={this.state.experience}
                            ref="inputExperience"
                            >
                        </textarea>
                    <h4>Resume: Link</h4>
                  </div>


                </div>

                <button
                    className="student_profile__button"
                    onClick={this.updateInfo}>Save
                </button>

                {/* Click the cancle button to go back to default mode*/}
                <button
                    className="student_profile__button"
                    onClick={this.changeEditMode}>Cancel</button>
                </div>
            </div>

        )
    }

    renderSelfView = () => {
        return (
            <div>
                <div className="left-box">
                <img className="profile-pic" src={this.state.imageUrl} alt="student photo" />

                <div className="info inner">
                    <h2>{this.state.name}</h2>
                    <h4 className="inline_h4">University:</h4> <p>{this.state.university}</p>
                    <h4>Year of Study:</h4> <p>{this.state.yearOfStudy}</p>
                    <h4>Major of Study:</h4> <p>{this.state.majorOfStudy}</p>

                </div>

                <div className="course">
                    <div className="taken inner">
                      <h4>Courses Taken:</h4>
                          {this.state.coursesTaken}
                    </div>
                    <div className="taking inner">
                      <h4>Currently Taking:</h4>
                      {this.state.currentCourses}
                    </div>
                </div>

              <div className="current-teams inner">
                <h4>Current Teams:</h4>
                {this.state.currentTeams}
              </div>

              <div className="reviews inner">
                <h4>Reviews:</h4>
                <p><a href="bob.html">Bob Bobson</a>: I love working with Alice!💙</p>
              </div>
            </div>
            <div className="right-box">
              <div>
                <p><Link className="student__application" to={"./../student-app-inv"}>My application</Link></p>
              </div>

              <div className="description inner">
                <h4>Description:</h4>
                <p>{this.state.description}</p>
              </div>

              <div className="more-info inner">
                <h4>Location:</h4> {this.state.location}
                <h4>GPA:</h4> {this.state.gpa}
                <h4>Past Project:</h4> {this.state.pastProject}
              </div>

              <div className="experience inner">
                <h4>Experience:</h4>
                {this.state.experience}

                <h4>Resume: Link</h4>
              </div>

              <div className="edit inner" onClick={this.changeEditMode}>
                <p>Click
                    <button
                        className="student_profile__button"
                        type="button"
                        name="edit"> here
                    </button>
                        to edit your profile</p>
              </div>
            </div>
          </div>
        )
    }

    renderOthersView = () => {
        return(
            <div>
                <div className="left-box">
                <img className="profile-pic" src={this.state.imageUrl} alt="alice photo" />

                <div className="info inner">
                    <h2>{this.state.name}</h2>
                    <h4 className="inline_h4">University:</h4> <p>{this.state.university}</p>
                    <h4>Year of Study:</h4> <p>{this.state.yearOfStudy}</p>
                    <h4>Major of Study:</h4> <p>{this.state.majorOfStudy}</p>

                </div>

                <div className="course">
                    <div className="taken inner">
                      <h4>Courses Taken:</h4>
                          {this.state.coursesTaken}
                    </div>
                    <div className="taking inner">
                      <h4>Currently Taking:</h4>
                      {this.state.currentCourses}
                    </div>
                </div>

              <div className="current-teams inner">
                <h4>Current Teams:</h4>
                {this.state.currentTeams}
              </div>

              <div className="reviews inner">
                <h4>Reviews:</h4>
                <p><a href="bob.html">Bob Bobson</a>: I love working with Alice!💙</p>
              </div>
            </div>
            <div className="right-box">


              <div className="description inner">
                <h4>Description:</h4>
                <p>{this.state.description}</p>
              </div>

              <div className="more-info inner">
                <h4>Location:</h4> {this.state.location}
                <h4>GPA:</h4> {this.state.gpa}
                <h4>Past Project:</h4> {this.state.pastProject}
              </div>

              <div className="experience inner">
                <h4>Experience:</h4>
                {this.state.experience}

                <h4>Resume: Link</h4>
              </div>
            </div>
          </div>
        )
    }

    render() {
        return (
            this.state.isInEditMode ?
            this.renderEditView()
             : this.renderSelfView()
        )
    }
}

export default StudentProfile;
