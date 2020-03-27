import React from "react";
import "./styles.css";
// import alice from "./static/alice.png";
// import bob from "./static/bob.png";
import newUser from "./static/new_user.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import { USER_BACKEND } from "../../config";

// const studentInfo = {
//     "1": {
//         username: "",
//         imageUrl: alice,
//         name: "Alice Alison",
//         university: "University of Toronto, St. George Campus",
//         yearOfStudy: 3,
//         majorOfStudy: "Computer Science",
//         coursesTaken: "CSC207, CSC209",
//         currentCourses: "CSC309, CSC363, CSC401",
//         currentTeams: "CSC309 Team 1",
//         review: "",
//         reviews: [
//             "Bob - I love working with Alice!",
//             "Carl - Alice is amazing"
//         ],
//         description: "If you love burger like I do, add me to your team.",
//         location: "On campus",
//         gpa: "3.5/4.0",
//         pastProject: "Todo list",
//         experience:
//             "Teaching Assistant @ UofT, Software Developer Intern @ IBM",
//         resume: ""
//     },
//     "2": {
//         username: "",
//         imageUrl: bob,
//         name: "Bob Bobson",
//         university: "University of Toronto, St. George Campus",
//         yearOfStudy: 4,
//         majorOfStudy: "Computer Science",
//         coursesTaken: "CSC108",
//         currentCourses: "CSC207, CSC309",
//         currentTeams: "CSC207 Team 1, CSC309 Team1",
//         review: "",
//         reviews: [],
//         description: "I heart CS & pranks",
//         location: "North York",
//         gpa: "3.0/4.0",
//         pastProject: "Secret",
//         experience: "UofT student",
//         resume: ""
//     }
// };

/** @param props: {
 *      editing: boolean,
 *      multiline: boolean,
 *      value: string,
 *      onChange: function,
 *      className: string,
 *      name: string,
 * }
 */

function ViewOrEdit(props) {
    const { editing, multiline, value, onChange, className, name } = props;

    const classToAdd = className ? " " + className : "";

    return editing ? (
        React.createElement(multiline ? "textarea" : "input", {
            className: "student_profile__input" + classToAdd,
            type: "text",
            value,
            onChange,
            name
        })
    ) : (
        <p>{value}</p>
    );
}

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            global: props.globalState,
            imageUrl: "",
            name: "",
            university: "",
            yearOfStudy: "",
            majorOfStudy: "",
            coursesTaken: "",
            currentCourses: "",
            currentTeams: "",
            reviews: [],
            description: "",
            location: "",
            gpa: "",
            pastProject: "",
            experience: "",
            // ...(studentInfo[
            //     this.props.id || this.props.globalState.identity.uid
            // ] || { reviews: [] }), // TODO: FETCH
            isInEditMode: false,
            profile: null
        };
    }

    componentDidMount() {
        const url = USER_BACKEND + this.props.globalState.identity.username;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("Profile JSON");
                console.log(json);
                this.setState({
                    profile: json
                });
                console.log(this.state);
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateInfo = () => {
        this.setState({
            isInEditMode: false
        });
    };

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        });
    };

    handleEditInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        event.preventDefault();
    };

    handleReviewInput = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            newReview: value
        });
    };

    addReview = () => {
        this.state.reviews.push(this.state.newReview);
        this.setState({
            reviews: this.state.reviews
        });
    };

    render() {
        const loggedIn = this.props.globalState.identity.type !== "guest";
        const isMe =
            loggedIn &&
            (this.props.id || this.props.globalState.identity.uid) ===
                this.props.globalState.identity.uid;

        const editingInfo = isMe && this.state.isInEditMode;
        const canAddReview = loggedIn && !isMe;

        const addReview = canAddReview
            ? [
                  <p>Write your teammate a review!</p>,
                  <TextField
                      className="reviewInput"
                      label={"Format: your name - your review"}
                      onChange={this.handleReviewInput}
                      multiline
                      variant="filled"
                  />,
                  <div>
                      <Button
                          variant="outlined"
                          color="primary"
                          className="team_page__button"
                          onClick={this.addReview.bind(this)}
                      >
                          Add
                      </Button>
                  </div>
              ]
            : [];

        return (
            <div>
                <div>
                    <div className="left-box">
                        <img
                            className="profile-pic"
                            src={newUser}
                            alt="profile picture"
                        />

                        <div className="info inner">
                            <h4 className="student_profile_h4">Name:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleEditInput}
                                name="name"
                            />

                            <h4 className="student_profile_h4">University:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.university}
                                onChange={this.handleEditInput}
                                name="university"
                            />

                            <h4 className="student_profile_h4">
                                Year of Study:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.yearOfStudy}
                                onChange={this.handleEditInput}
                                name="yearOfStudy"
                            />

                            <h4 className="student_profile_h4">
                                Major of Study:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.majorOfStudy}
                                onChange={this.handleEditInput}
                                name="majorOfStudy"
                            />
                        </div>

                        <div className="taken inner">
                            <h4 className="student_profile_h4">
                                Courses Taken:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.coursesTaken}
                                onChange={this.handleEditInput}
                                name="coursesTaken"
                            />
                        </div>

                        <div className="taking inner">
                            <h4 className="student_profile_h4">
                                Currently Taking:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.currentCourses}
                                onChange={this.handleEditInput}
                                name="currentCourses"
                            />
                        </div>

                        <div className="current-teams inner">
                            <h4 className="student_profile_h4">
                                Current Teams:
                            </h4>
                            <p>{this.state.currentTeams}</p>
                        </div>

                        <div className="reviews inner">
                            <h4 className="student_profile_h4">Reviews:</h4>
                            <p>
                                {this.state.reviews.map(review => (
                                    <div key={review}>{review}</div>
                                ))}
                            </p>
                            {addReview}
                        </div>
                    </div>

                    <div className="right-box">
                        <div>
                            <p>
                                <Link
                                    className="student__application"
                                    to={"./../student-app-inv"}
                                >
                                    My application
                                </Link>
                            </p>
                        </div>

                        <div className="description inner">
                            <h4 className="student_profile_h4">Description:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.description}
                                onChange={this.handleEditInput}
                                name="description"
                            />
                        </div>

                        <div className="more-info inner">
                            <h4 className="student_profile_h4">Email:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleEditInput}
                                name="email"
                            />

                            <h4 className="student_profile_h4">Location:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.location}
                                onChange={this.handleEditInput}
                                name="location"
                            />

                            <h4 className="student_profile_h4">GPA:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.gpa}
                                onChange={this.handleEditInput}
                                name="gpa"
                            />

                            <h4 className="student_profile_h4">
                                Past Project:
                            </h4>
                            <ViewOrEdit
                                multiline={true}
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.pastProject}
                                onChange={this.handleEditInput}
                                name="pastProject"
                            />
                        </div>

                        <div className="experience inner">
                            <h4 className="student_profile_h4">Experience:</h4>
                            <ViewOrEdit
                                multiline={true}
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.experience}
                                onChange={this.handleEditInput}
                                name="experience"
                            />
                        </div>

                        {isMe && (
                            <div className="edit inner">
                                {editingInfo ? (
                                    [
                                        <button
                                            className="student_profile__button"
                                            onClick={this.updateInfo}
                                        >
                                            Save
                                        </button>,
                                        /* Click the cancle button to go back
                                           to default mode */
                                        <button
                                            className="student_profile__button"
                                            onClick={this.changeEditMode}
                                        >
                                            Cancel
                                        </button>
                                    ]
                                ) : (
                                    <button
                                        className="student_profile__button"
                                        type="button"
                                        name="edit"
                                        onClick={this.changeEditMode}
                                    >
                                        Edit your profile
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentProfile;
