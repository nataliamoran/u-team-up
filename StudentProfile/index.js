import React from "react";
import "./styles.css";
import alice from "./static/alice.png"
import bob from "./static/bob.png"
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";

const studentInfo = {
    '1': {
        username: "",
        imageUrl: alice,
        name: "Alice Alison",
        university: "University of Toronto, St. George Campus",
        yearOfStudy: 3,
        majorOfStudy: "Computer Science",
        coursesTaken: "CSC207, CSC209",
        currentCourses: "CSC309, CSC363, CSC401",
        currentTeams: "CSC309 Team 1",
        reviews: "",
        description: "If you love burger like I do, add me to your team.",
        location: "On campus",
        gpa: "3.5/4.0",
        pastProject: "Todo list",
        experience: "Teaching Assistant @ UofT, Software Developer Intern @ IBM",
        resume: "",
    },
    '2': {
        username: "",
        imageUrl: bob,
        name: "Bob Bobson",
        university: "University of Toronto, St. George Campus",
        yearOfStudy: 3,
        majorOfStudy: "Computer Science",
        coursesTaken: "CSC207, CSC209",
        currentCourses: "CSC309, CSC363, CSC401",
        currentTeams: "CSC309 Team 1",
        reviews: "",
        description: "If you love burger like I do, add me to your team.",
        location: "On campus",
        gpa: "3.5/4.0",
        pastProject: "Todo list",
        experience: "Teaching Assistant @ UofT, Software Developer Intern @ IBM",
        resume: "",
    },
};

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...studentInfo[this.props.id
                || this.props.globalState.identity.uid], // TODO: FETCH
            isInEditMode: false,
        };
    }

    updateInfo = () => {
        this.setState({
            isInEditMode: false,
        })
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    handleEditInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        event.preventDefault();
    };


    renderSelfEditView = () => {
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
                                value={this.state.name}
                                onChange={this.handleEditInput}
                                name='name'
                                />
                        </h2>

                        <h4>University:</h4>
                            <p>
                                <input
                                    className="student_profile__input"
                                    type="text"
                                    value={this.state.university}
                                    onChange={this.handleEditInput}
                                    name='university'
                                    >
                                </input>
                            </p>

                        <h4>Year of Study:</h4>
                            <p>
                                <input
                                    className="student_profile__input"
                                    type="text"
                                    value={this.state.yearOfStudy}
                                    onChange={this.handleEditInput}
                                    name='yearOfStudy'
                                    >
                                </input>
                            </p>

                        <h4>Major of Study:</h4>
                        <p>
                            <input
                                className="student_profile__input"
                                type="text"
                                value={this.state.majorOfStudy}
                                onChange={this.handleEditInput}
                                name='majorOfStudy'

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
                                  value={this.state.coursesTaken}
                                    onChange={this.handleEditInput}
                                    name='coursesTaken'

                                  >
                              </textarea>
                        </div>

                    <div className="taking inner">
                         <h4>Currently Taking:</h4>
                             <textarea
                                 className="student_profile__input"
                                 type="text"
                                 value={this.state.currentCourses}
                                onChange={this.handleEditInput}
                                name='currentCourses'

                                 >
                             </textarea>
                    </div>
                    </div>

                  <div className="current-teams inner">
                    <h4>Current Teams:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            value={this.state.currentTeams}
                            onChange={this.handleEditInput}
                            name='currentTeams'

                            >
                        </textarea>
                  </div>

                 <div className="reviews inner">
                    <h4>Reviews:</h4>
                    {this.state.reviews}
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
                            value={this.state.description}
                            onChange={this.handleEditInput}
                            name='description'

                            >
                        </textarea>

                    </p>
                  </div>

                  <div className="more-info inner">
                    <h4>Location:</h4>
                        <input
                            className="student_profile__input"
                            type="text"
                            value={this.state.location}
                            onChange={this.handleEditInput}
                            name='location'

                            >
                        </input>

                    <h4>GPA:</h4>
                        <input
                            className="student_profile__input"
                            type="text"
                            value={this.state.gpa}
                            onChange={this.handleEditInput}
                            name='gpa'

                            >
                        </input>

                    <h4>Past Project:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            value={this.state.pastProject}
                            onChange={this.handleEditInput}
                            name='pastProject'

                            >
                        </textarea>

                  </div>

                  <div className="experience inner">
                    <h4>Experience:</h4>
                        <textarea
                            className="student_profile__input"
                            type="text"
                            value={this.state.experience}
                            onChange={this.handleEditInput}
                            name='experience'

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
                {this.state.reviews}
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
                <p>{this.state.reviews}</p>
                <p>Write your teammate a review!</p>
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

    renderOthersEditView = () => {
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
                <p>{this.state.reviews}</p>
                <p>Write your teammate a review!</p>

                    <textarea

                        className="student_profile__input"
                        type="text"
                        value={this.state.reviews}
                         onChange={this.handleEditInput}
                         name='reviews'
                        >
                    </textarea>
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
        if ((this.props.id
            || this.props.globalState.identity.uid) ===
            this.props.globalState.identity.uid) {
                if (this.state.isInEditMode) {
                    return this.renderSelfEditView()
                } else {
                    return this.renderSelfView()
                }
            } else {
                return this.renderOthersEditView()
            }


        {/*if (this.state.isInEditMode) {
            return this.renderOthersEditView();
        } else if ((this.props.id
            || this.props.globalState.identity.uid) === this.props.globalState.identity.uid) {
            return this.renderSelfView()
        } else {
            return this.renderOthersView()
        }*/}

    }
}

export default StudentProfile;
